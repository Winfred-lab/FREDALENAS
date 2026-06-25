// ─────────────────────────────────────────────────────────────
// src/Components/CustomOrderModal.jsx
//
// CHANGE FROM PREVIOUS VERSION:
//   The modal now calls addCustomOrder() from CartContext
//   directly on submit, so the custom order appears in the
//   CartDrawer under the ShoppingCart icon immediately.
//   The `onSubmit` prop is still supported for backward compat
//   but CartContext handles the cart update internally.
//
//   Everything else (validation, image upload, fields) is
//   unchanged from the professional version built earlier.
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/Cartcontext";

export default function CustomOrderModal({ product, onClose, onSubmit }) {
  const { addCustomOrder } = useCart();

  const [description,   setDescription]   = useState("");
  const [phone,         setPhone]         = useState("");
  const [email,         setEmail]         = useState("");
  const [sampleFile,    setSampleFile]    = useState(null);
  const [samplePreview, setSamplePreview] = useState(null);
  const [errors,        setErrors]        = useState({});
  const [submitted,     setSubmitted]     = useState(false);

  const fileInputRef = useRef(null);
  const modalRef     = useRef(null);

  // Close on Escape + lock scroll
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close on backdrop click
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  // Image upload handler
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, sample: "Please upload an image file." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, sample: "Image must be under 5MB." }));
      return;
    }
    setSampleFile(file);
    setErrors((p) => ({ ...p, sample: null }));
    const reader = new FileReader();
    reader.onload = (ev) => setSamplePreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  function removeSample() {
    setSampleFile(null);
    setSamplePreview(null);
    fileInputRef.current.value = "";
  }

  // Validation
  function validate() {
    const e = {};
    if (!description.trim()) e.description = "Please describe your custom order.";
    if (!phone.trim() && !email.trim())
      e.contact = "Please provide at least your phone number or email address.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address.";
    if (phone.trim() && !/^[\d\s\+\-\(\)]{7,}$/.test(phone))
      e.phone = "Please enter a valid phone number.";
    return e;
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const orderData = {
      product:     product.name,
      category:    product.category,
      description: description.trim(),
      phone:       phone.trim(),
      email:       email.trim(),
      sampleFile,
      timestamp:   new Date().toISOString(),
    };
    // Add to cart context first
    addCustomOrder(product, orderData);
    // Also call the prop callback for any additional handling
    if (onSubmit) onSubmit(orderData);
    setSubmitted(true);
  }

  // ── SUCCESS SCREEN ─────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center
                   bg-black/60 backdrop-blur-sm px-4"
        onClick={handleBackdropClick}
        role="dialog" aria-modal="true"
      >
        <div
          ref={modalRef} tabIndex={-1}
          className="flex flex-col items-center w-full max-w-md p-10 text-center bg-white shadow-2xl outline-none rounded-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-[#F5E9D0] flex items-center
                          justify-center mb-5 text-4xl">🎉</div>
          <h2 className="font-display3 text-2xl font-bold text-[#8B1A1A] mb-3">
            Order Received!
          </h2>
          <p className="text-sm text-[#4A4A4A] leading-relaxed mb-2">
            Thank you for your custom order. Our team will review your request
            and get back to you within <strong>24 hours</strong>.
          </p>
          <p className="text-xs text-[#7A7A7A] mb-8">
            We'll reach out via {phone ? "WhatsApp/Phone" : "email"} to confirm details and pricing.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#8B1A1A] text-white font-bold tracking-widest
                       uppercase text-sm py-3 rounded-lg hover:bg-[#6B1212]
                       transition-colors shimmer-btn"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN MODAL ─────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center
                 bg-black/60 backdrop-blur-sm px-0 sm:px-4"
      onClick={handleBackdropClick}
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
    >
      <div
        ref={modalRef} tabIndex={-1}
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl
                   shadow-2xl outline-none flex flex-col
                   max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4
                        border-b border-[#E8DDD0] flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="w-10 h-1 bg-[#E8DDD0] rounded-full mx-auto mb-4 sm:hidden" />
            <h1 id="modal-title"
                className="font-display3 text-xl sm:text-2xl font-bold text-[#1A1A1A]
                           leading-snug mb-1">
              {product.name}
            </h1>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">{product.desc}</p>
          </div>
          <button
            onClick={onClose} aria-label="Close modal"
            className="shrink-0 w-8 h-8 rounded-full bg-[#FBF6EF] flex items-center
                       justify-center text-[#8B1A1A] hover:bg-[#F5E9D0]
                       transition-colors text-lg font-bold"
          >✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 px-6 py-5">

          {/* Note banner */}
          <div className="bg-[#FBF6EF] border-l-4 border-[#C9893A] rounded-r-lg px-4 py-3">
            <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
              <span className="font-bold text-[#8B1A1A]">Note:</span>{" "}
              For custom orders, price will be given after reviewing your described
              order. Response in less than <strong>24 hours</strong>.
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="order-desc"
                   className="block text-xs font-bold text-[#1A1A1A] mb-1.5 tracking-wide uppercase">
              Description <span className="text-[#8B1A1A]">*</span>
            </label>
            <textarea
              id="order-desc" rows={4} value={description}
              onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: null })); }}
              placeholder="Describe exactly what you want — flavour, design, size, colours, theme, quantity, delivery date..."
              className={`w-full border rounded-lg px-4 py-3 text-sm text-[#1A1A1A]
                          placeholder:text-[#B0A090] resize-none outline-none
                          transition-colors focus:border-[#C9893A] focus:ring-2 focus:ring-[#C9893A]/20
                          ${errors.description ? "border-red-400 bg-red-50" : "border-[#E8DDD0] bg-[#FEFCF9]"}`}
              aria-required="true"
            />
            {errors.description && (
              <p className="mt-1 text-[11px] text-red-500">⚠ {errors.description}</p>
            )}
          </div>

          {/* Sample image upload */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5 tracking-wide uppercase">
              Sample / Reference Image
              <span className="ml-1 text-[#7A7A7A] font-normal normal-case">(optional)</span>
            </label>
            <input
              ref={fileInputRef} type="file" accept="image/*"
              onChange={handleFileChange} className="hidden" id="sample-upload"
            />
            {!samplePreview ? (
              <label
                htmlFor="sample-upload"
                className="flex flex-col items-center justify-center w-full h-28
                           border-2 border-dashed border-[#E8DDD0] rounded-xl
                           cursor-pointer bg-[#FEFCF9] hover:border-[#C9893A]
                           hover:bg-[#FBF6EF] transition-all group"
              >
                <span className="mb-1 text-2xl transition-transform group-hover:scale-110">📷</span>
                <span className="text-xs font-semibold text-[#8B1A1A]">Click to upload a sample image</span>
                <span className="text-[10px] text-[#7A7A7A] mt-0.5">JPG, PNG, WEBP — max 5MB</span>
              </label>
            ) : (
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#E8DDD0]">
                <img src={samplePreview} alt="Sample reference" className="object-cover w-full h-full" />
                <button
                  type="button" onClick={removeSample}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90
                             text-[#8B1A1A] font-bold text-sm flex items-center justify-center
                             hover:bg-white transition-colors shadow-md"
                >✕</button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-1.5">
                  <p className="text-[10px] text-white truncate">{sampleFile?.name}</p>
                </div>
              </div>
            )}
            {errors.sample && <p className="mt-1 text-[11px] text-red-500">⚠ {errors.sample}</p>}
          </div>

          {/* Contact fields */}
          <div>
            <p className="text-xs font-bold text-[#1A1A1A] mb-1.5 tracking-wide uppercase">
              Contact Details <span className="text-[#8B1A1A]">*</span>
              <span className="ml-1 text-[#7A7A7A] font-normal normal-case">(fill at least one)</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Phone */}
              <div className="flex-1">
                <label htmlFor="order-phone" className="block text-[11px] text-[#4A4A4A] mb-1">
                  📱 Phone / WhatsApp No.
                </label>
                <input
                  id="order-phone" type="tel" value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, contact: null, phone: null })); }}
                  placeholder="+234 800 000 0000"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm
                              placeholder:text-[#B0A090] outline-none transition-colors
                              focus:border-[#C9893A] focus:ring-2 focus:ring-[#C9893A]/20
                              ${errors.contact || errors.phone ? "border-red-400 bg-red-50" : "border-[#E8DDD0] bg-[#FEFCF9]"}`}
                />
                {errors.phone && <p className="mt-1 text-[10px] text-red-500">⚠ {errors.phone}</p>}
              </div>

              {/* OR divider */}
              <div className="flex items-center justify-center gap-1 sm:flex-col sm:pt-5">
                <div className="flex-1 sm:flex-none sm:h-8 w-full sm:w-px bg-[#E8DDD0]" />
                <span className="text-[10px] text-[#7A7A7A] font-semibold">OR</span>
                <div className="flex-1 sm:flex-none sm:h-8 w-full sm:w-px bg-[#E8DDD0]" />
              </div>

              {/* Email */}
              <div className="flex-1">
                <label htmlFor="order-email" className="block text-[11px] text-[#4A4A4A] mb-1">
                  ✉️ Email Address
                </label>
                <input
                  id="order-email" type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, contact: null, email: null })); }}
                  placeholder="you@example.com"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm
                              placeholder:text-[#B0A090] outline-none transition-colors
                              focus:border-[#C9893A] focus:ring-2 focus:ring-[#C9893A]/20
                              ${errors.contact || errors.email ? "border-red-400 bg-red-50" : "border-[#E8DDD0] bg-[#FEFCF9]"}`}
                />
                {errors.email && <p className="mt-1 text-[10px] text-red-500">⚠ {errors.email}</p>}
              </div>
            </div>
            {errors.contact && (
              <p className="mt-2 text-[11px] text-red-500 font-medium">⚠ {errors.contact}</p>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#E8DDD0]">
            <button
              type="button" onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-[#E8DDD0] text-sm
                         font-semibold text-[#4A4A4A] hover:border-[#8B1A1A]
                         hover:text-[#8B1A1A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-[#8B1A1A] text-white text-sm
                         font-bold tracking-widest uppercase shimmer-btn
                         hover:bg-[#6B1212] transition-colors flex items-center
                         justify-center gap-2"
            >
              🛒 Place Order
            </button>
          </div>
          <p className="text-center text-[10px] text-[#7A7A7A]">
            🔒 Your information is safe with us. We'll never share your details.
          </p>
        </form>
      </div>
    </div>
  );
}