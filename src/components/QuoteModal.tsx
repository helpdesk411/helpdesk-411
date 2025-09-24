// src/components/QuoteModal.tsx
import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Star, CheckCircle2, AlertCircle, Info, Shield, Loader2, RotateCcw } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: number;
  planDescription: string;
  isPopular?: boolean;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (t: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => void;
      reset: (el?: HTMLElement) => void;
    };
  }
}

type ViewState = "form" | "success" | "error" | "us-only";
type CaptchaStatus = "idle" | "loading" | "ready" | "verified" | "expired" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  captcha?: string;
  general?: string;
}

export function QuoteModal({
  isOpen,
  onClose,
  planName,
  planPrice,
  planDescription,
  isPopular = false,
}: QuoteModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [start] = useState(() => performance.now());
  const [view, setView] = useState<ViewState>("form");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false, address: false });
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>("idle");

  const widgetRef = useRef<HTMLDivElement | null>(null);

  const totalPrice = planPrice * quantity;

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) return;
    setView("form");
    setErrorMsg("");
    setToken("");
    setFormErrors({});
    setTouched({ name: false, email: false, address: false });
    setCaptchaStatus("loading");

    // Render Turnstile when opening
    const el = widgetRef.current;
    if (el && window.turnstile) {
      window.turnstile.render(el, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY as string,
        appearance: "always", // <-- visible widget so users know it's there
        callback: (t) => {
          setToken(t);
          setFormErrors((prev) => ({ ...prev, captcha: undefined }));
          setCaptchaStatus("verified");
        },
        "expired-callback": () => {
          setToken("");
          setCaptchaStatus("expired");
          setFormErrors((prev) => ({ ...prev, captcha: "Security check expired — please verify again." }));
        },
        "error-callback": () => {
          setToken("");
          setCaptchaStatus("error");
          setFormErrors((prev) => ({ ...prev, captcha: "Security check failed to load. Please refresh it below." }));
        },
      });

      // If it takes >2s to go verified/ready, show "running check…" hint
      const id = setTimeout(() => {
        if (captchaStatus === "loading") setCaptchaStatus("ready");
      }, 2000);
      return () => clearTimeout(id);
    } else {
      // Script not loaded yet
      setCaptchaStatus("error");
      setFormErrors((prev) => ({ ...prev, captcha: "Security check unavailable. Please reload the form." }));
    }
  }, [isOpen]);

  const refreshCaptcha = () => {
    if (widgetRef.current && window.turnstile?.reset) {
      setToken("");
      setCaptchaStatus("loading");
      window.turnstile.reset(widgetRef.current);
      // after reset, Turnstile will invoke callbacks again
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    const errors: FormErrors = {};
    switch (field) {
      case "name":
        if (!value.trim()) errors.name = "Name is required";
        else if (value.trim().length < 2) errors.name = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) errors.email = "Please enter a valid email address";
        break;
      case "address":
        if (!value.trim()) errors.address = "Address is required";
        else if (value.trim().length < 10) errors.address = "Please enter a complete address";
        break;
    }
    setFormErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    let isValid = true;
    if (!validateField("name", formData.name)) isValid = false;
    if (!validateField("email", formData.email)) isValid = false;
    if (!validateField("address", formData.address)) isValid = false;

    if (!token) {
      errors.captcha = "Please complete the security verification";
      isValid = false;
      // make sure users see the section
      widgetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setFormErrors((prev) => ({ ...prev, ...errors }));
    return isValid;
  };

  const resetForm = () => {
    setQuantity(1);
    setFormData({ name: "", email: "", address: "" });
    setToken("");
    setView("form");
    setErrorMsg("");
    setFormErrors({});
    setTouched({ name: false, email: false, address: false });
    setCaptchaStatus("idle");
    if (widgetRef.current && window.turnstile?.reset) window.turnstile.reset(widgetRef.current);
  };

  const closeAndReset = () => {
    // Don't close if form is being submitted
    if (loading) return;
    
    resetForm();
    onClose();
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeAndReset();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeAndReset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setFormErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      const honeypot =
        (document.querySelector('input[name="company_website"]') as HTMLInputElement)?.value || "";

      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          planPrice,
          quantity,
          totalPrice,
          formData,
          honeypot,
          ttf: Math.round(performance.now() - start),
          turnstileToken: token,
        }),
      });

      const json = await r.json().catch(() => ({} as Record<string, unknown>));

      if (!r.ok) {
        // Check for US-only restriction
        if (r.status === 403 && /US|United States/i.test(String(json?.error || ""))) {
          setView("us-only");
          return;
        }
        
        // Map CAPTCHA errors to inline captcha message so users know what happened
        const msg = String(json?.error || "");
        if (r.status === 400 && /captcha|security/i.test(msg)) {
          setFormErrors((prev) => ({ ...prev, captcha: msg || "Security check failed. Please try again." }));
          setView("form");
          widgetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        if (r.status === 429) throw new Error("Too many requests. Please wait a moment before trying again.");
        if (r.status === 502 || r.status === 503) throw new Error("Service temporarily unavailable. Please try again soon.");
        throw new Error(msg || "Something went wrong. Please try again.");
      }

      setView("success");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(errorMessage);
      setView("error");
    } finally {
      setLoading(false);
      // If token was consumed or expired, prompt re-check
      if (widgetRef.current && window.turnstile?.reset) {
        window.turnstile.reset(widgetRef.current);
        setToken("");
        setCaptchaStatus("ready");
      }
    }
  };

  const getFieldError = (field: keyof typeof formData) => touched[field] && formErrors[field];
  const getFieldClassName = (field: keyof typeof formData) => {
    const base = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors hover:border-gray-400";
    return getFieldError(field)
      ? `${base} border-red-300 focus:ring-red-500 focus:border-red-500 hover:border-red-400`
      : `${base} border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={closeAndReset}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-black">{planName}</h2>
            {isPopular && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 text-sm">
                <Star className="w-3 h-3" />
                <span>Most Popular</span>
              </div>
            )}
          </div>
          <button onClick={closeAndReset} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {view === "form" && (
            <>
              {/* Pricing */}
              <div>
                <div className="text-3xl font-bold text-black mb-2">${planPrice}/Computer</div>
                <p className="text-sm text-black">{planDescription}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    type="button"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    type="button"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total price:</div>
                  <div className="text-2xl font-bold text-black">${totalPrice}</div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleInputBlur("name")}
                    className={getFieldClassName("name")}
                    required
                  />
                  {getFieldError("name") && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleInputBlur("email")}
                    className={getFieldClassName("email")}
                    required
                  />
                  {getFieldError("email") && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    onBlur={() => handleInputBlur("address")}
                    className={getFieldClassName("address")}
                    required
                  />
                  {getFieldError("address") && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.address}
                    </p>
                  )}
                </div>

                {/* Security check (Turnstile) */}
                <div aria-live="polite" aria-atomic="true">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
                    <Shield className="w-4 h-4" />
                    Security check (required)
                  </label>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div ref={widgetRef} />
                    {/* Status helper text */}
                    <div className="mt-2 text-xs text-gray-600 flex items-center gap-2">
                      {captchaStatus === "loading" && (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Running a quick security check…
                        </>
                      )}
                      {captchaStatus === "ready" && <>Please complete the check above to proceed.</>}
                      {captchaStatus === "verified" && (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          Security check passed
                        </>
                      )}
                      {captchaStatus === "expired" && (
                        <>
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          Security check expired — refresh below.
                        </>
                      )}
                      {captchaStatus === "error" && (
                        <>
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          Security check failed to load — refresh below.
                        </>
                      )}
                    </div>

                    {formErrors.captcha && (
                      <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.captcha}
                      </p>
                    )}

                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Refresh security check
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2">
                      Protected by Cloudflare Turnstile.
                    </p>
                  </div>
                </div>

                {/* Honeypot: should stay empty */}
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-black text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!token || loading || captchaStatus === "expired" || captchaStatus === "error"}
                  >
                    {loading ? "Sending…" : "Request a Quote"}
                  </button>
                </div>

                {/* Help text */}
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" />
                  We'll send you a confirmation email and contact you within 24 hours
                </p>
              </form>
            </>
          )}

          {view === "success" && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">Request received</h3>
              <p className="text-gray-700">
                Thanks, <span className="font-medium">{formData.name.split(" ")[0]}</span>! We've emailed a receipt to{" "}
                <span className="font-medium">{formData.email}</span>. Our team will follow up shortly.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-black">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium text-black">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per device</span>
                  <span className="font-medium text-black">${planPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold text-black">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="font-medium text-black">{formData.address}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={resetForm}
                  className="border border-gray-300 text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  New request
                </button>
                <button
                  onClick={closeAndReset}
                  className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {view === "error" && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">Something went wrong</h3>
              <p className="text-gray-700">{errorMsg}</p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeAndReset}
                  className="border border-gray-300 text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setView("form")}
                  className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {view === "us-only" && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <AlertCircle className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">Service Not Available</h3>
              <p className="text-gray-700">
                Quote requests are currently only available for businesses located in the United States.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-left">
                <p className="text-sm text-orange-800">
                  <strong>Why is this restricted?</strong><br/>
                  We're currently focusing on serving US-based businesses to ensure the best support experience.
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeAndReset}
                  className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
