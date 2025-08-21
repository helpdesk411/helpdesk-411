// src/components/QuoteModal.tsx
import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Star, CheckCircle2, AlertCircle, Info } from "lucide-react";

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
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => void;
      reset: (el?: HTMLElement) => void;
    };
  }
}

type ViewState = "form" | "success" | "error";

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
    // Render Turnstile when opening
    const el = widgetRef.current;
    if (el && window.turnstile) {
      window.turnstile.render(el, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY as string,
        appearance: "interaction-only",
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
      });
    }
  }, [isOpen]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
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
      case 'name':
        if (!value.trim()) {
          errors.name = "Name is required";
        } else if (value.trim().length < 2) {
          errors.name = "Name must be at least 2 characters";
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          errors.email = "Please enter a valid email address";
        }
        break;
      case 'address':
        if (!value.trim()) {
          errors.address = "Address is required";
        } else if (value.trim().length < 10) {
          errors.address = "Please enter a complete address";
        }
        break;
    }
    
    setFormErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validate each field
    if (!validateField('name', formData.name)) isValid = false;
    if (!validateField('email', formData.email)) isValid = false;
    if (!validateField('address', formData.address)) isValid = false;

    // Check captcha
    if (!token) {
      errors.captcha = "Please complete the security verification";
      isValid = false;
    }

    setFormErrors(errors);
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
    if (widgetRef.current && window.turnstile?.reset) window.turnstile.reset(widgetRef.current);
  };

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrorMsg("");
    setFormErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }

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

      const json = await r.json().catch(() => ({}));
      
      if (!r.ok) {
        // Handle specific error responses
        if (r.status === 429) {
          throw new Error("Too many requests. Please wait a moment before trying again.");
        } else if (r.status === 400) {
          throw new Error(json.error || "Please check your information and try again.");
        } else if (r.status === 502 || r.status === 503) {
          throw new Error("Service temporarily unavailable. Please try again in a few moments.");
        } else {
          throw new Error(json.error || "Something went wrong. Please try again.");
        }
      }

      setView("success");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(errorMessage);
      setView("error");
    } finally {
      setLoading(false);
      if (widgetRef.current && window.turnstile?.reset) window.turnstile.reset(widgetRef.current);
    }
  };

  const getFieldError = (field: keyof typeof formData) => {
    return touched[field] && formErrors[field];
  };

  const getFieldClassName = (field: keyof typeof formData) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const hasError = getFieldError(field);
    
    if (hasError) {
      return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                  <input
                    type="text"
                    placeholder="Name *"
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
                  <input
                    type="email"
                    placeholder="Email *"
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
                  <input
                    type="text"
                    placeholder="Address *"
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

                {/* Honeypot: should stay empty */}
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

                {/* Turnstile widget mounts here */}
                <div>
                  <div ref={widgetRef} />
                  {formErrors.captcha && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.captcha}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!token || loading}
                >
                  {loading ? "Sending…" : "Request a Quote"}
                </button>

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

              <div className="flex gap-3">
                <button
                  onClick={closeAndReset}
                  className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 border border-gray-300 text-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  New request
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
              
              {/* Additional help for common errors */}
              {errorMsg.includes("network") && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
                  <p className="text-sm text-blue-800">
                    <strong>Network Issue:</strong> Please check your internet connection and try again.
                  </p>
                </div>
              )}
              
              {errorMsg.includes("Too many requests") && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-left">
                  <p className="text-sm text-yellow-800">
                    <strong>Rate Limited:</strong> Please wait a few moments before trying again.
                  </p>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setView("form")}
                  className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Try again
                </button>
                <button
                  onClick={closeAndReset}
                  className="flex-1 border border-gray-300 text-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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
