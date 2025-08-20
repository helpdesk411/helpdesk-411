import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Star } from "lucide-react";

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
      render: (el: HTMLElement, opts: { sitekey: string; callback: (t: string) => void; 'expired-callback'?: () => void }) => void;
      reset: (el?: HTMLElement) => void;
    };
  }
}

export function QuoteModal({ 
  isOpen, 
  onClose, 
  planName, 
  planPrice, 
  planDescription, 
  isPopular = false 
}: QuoteModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [start] = useState(() => performance.now()); // time-to-fill start
  const widgetRef = useRef<HTMLDivElement | null>(null);

  const totalPrice = planPrice * quantity;

  useEffect(() => {
    if (!isOpen) return;
    setToken("");
    // Render Turnstile widget when modal opens
    const el = widgetRef.current;
    if (el && window.turnstile) {
      window.turnstile.render(el, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY as string,
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
      });
    }
  }, [isOpen]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return; // require human check
    setLoading(true);

    try {
      const honeypot = (document.querySelector('input[name="company_website"]') as HTMLInputElement)?.value || '';
      const payload = {
        planName,
        quantity,
        totalPrice,
        formData,
        honeypot,                // hidden bot trap (should be blank)
        ttf: Math.round(performance.now() - start),
        turnstileToken: token,   // proof of humanity
      };

      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json.error || "Failed");
      
      // success UI
      alert("Thanks! We’ve received your request. Check your email for a receipt.");
      onClose();
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      // Optionally reset the widget to require a fresh token on retry
      if (widgetRef.current && window.turnstile?.reset) window.turnstile.reset(widgetRef.current);
    }
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
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Pricing */}
          <div>
            <div className="text-3xl font-bold text-black mb-2">
              ${planPrice}/Computer
            </div>
            <p className="text-sm text-black">{planDescription}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={() => handleQuantityChange(quantity - 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                min="1"
              />
              <button onClick={() => handleQuantityChange(quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Honeypot: should stay empty */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />

            {/* Turnstile widget renders here */}
            <div ref={widgetRef} />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled={!token || loading}
            >
              {loading ? 'Sending…' : 'Request a Quote'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
