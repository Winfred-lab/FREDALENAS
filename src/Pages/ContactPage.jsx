// ─────────────────────────────────────────────────────────────
// src/Pages/ContactPage.jsx
//
// Full Fredalenas Contact page — JSX + Tailwind.
// Matches the brand: maroon #8B1A1A, gold #C9893A,
// Playfair Display serif headlines, Lato body text.


// FORM: wire handleSubmit() to your backend / EmailJS / Formspree.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { PhoneCall } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPinCheck } from 'lucide-react';
import AnimatedSection from '../Components/AnimatedSection'; 

// ── TICKER ───────────────────────────────────────────────────
// Uses animate-scroll-left from your existing index.css
const TICKER_ITEMS = [
  "Event Snack Catering", "Crispy Chin Chin", "Celebration Cakes",
  "Premium Baked Peanut", "Wholesale Orders",  "Baked Meatpie",
];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-[#EDC483] py-2.5 overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="inline-block animate-scroll-left">
        {doubled.map((item, i) => (
          <span key={i} className="inline-block text-[#6B1A2A] text-[11px] tracking-[0.22em] uppercase px-5">
            <span className="text-[#6B1A2A] mr-2">✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── FAQ DATA ──────────────────────────────────────────────────
const FAQS = [
  {
    q: "How far in advance should I place a custom cake order?",
    a: "Custom cakes require at least 48–72 hours advance notice for standard sizes. For large, tiered, or highly detailed cakes, we recommend 5–7 days to ensure the best quality.",
  },
  {
    q: "Do you deliver across Nigeria?",
    a: "Yes! We offer same-day or next-day delivery within Lagos, and nationwide delivery via trusted courier partners. Delivery timelines and costs vary by location — contact us for a quote.",
  },
  {
    q: "Can I place a bulk or wholesale order?",
    a: "Absolutely. We offer wholesale pricing for businesses, schools, events, and resellers. Send us a message with your requirements and we'll get you a tailored quote within 24 hours.",
  },
  {
    q: "How do I pay for my order?",
    a: "We accept bank transfers, Paystack, Flutterwave, and cash on delivery for Lagos orders. A 50% deposit is required for custom cakes and event catering, with the balance due before or upon delivery.",
  },
  {
    q: "Do you cater for events and corporate functions?",
    a: "Yes — weddings, birthdays, corporate events, product launches, and more. We create custom snack packages and branded snack platters. Contact us at least 7 days in advance for event catering.",
  },
];

// ── CONTACT DETAILS ───────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    icon: <MapPinCheck />,
    label: "Location",
    value: "Lagos, Nigeria",
    sub: "Serving Lagos & nationwide delivery",
  },
  {
    icon: <PhoneCall />,
    label: "Phone / WhatsApp",
    value: "+234 800 000 0000",
    sub: "Mon–Sat, 8am – 7pm",
  },
  {
    icon: <Mail />,
    label: "Email",
    value: "hello@fredalenas.com",
    sub: "We reply within 24 hours",
  },
];

// ── BUSINESS HOURS ────────────────────────────────────────────
const HOURS = [
  { day: "Monday – Friday", time: "8:00am – 7:00pm", badge: null },
  { day: "Saturday",        time: "9:00am – 5:00pm", badge: null },
  { day: "Sunday",          time: null,               badge: "Orders only" },
];

// ── SOCIALS ───────────────────────────────────────────────────
const SOCIALS = [
  { icon: <PhoneCall />, label: "Instagram", handle: "@fredalenas",      href: "#" },
  { icon: "👍", label: "Facebook",  handle: "Fredalenas Foods", href: "#" },
  { icon: "🎵", label: "TikTok",    handle: "@fredalenas",      href: "#" },
  { icon: "💬", label: "WhatsApp",  handle: "Chat with us",     href: "#" },
];

// ── SUBJECT OPTIONS ───────────────────────────────────────────
const SUBJECTS = [
  "Custom Cake Order",
  "Bulk / Wholesale Inquiry",
  "Event Snack Catering",
  "Delivery & Logistics",
  "Pricing Information",
  "General Enquiry",
  "Feedback & Complaints",
];

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ContactPage() {

  // ── FORM STATE ─────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "", phone: "", email: "", subject: "", message: "",
  });
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── FAQ STATE ───────────────────────────────────────────────
  const [openFaq, setOpenFaq] = useState(null);

  // ── FORM HANDLERS ───────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = "Please enter a valid email address.";
    if (!form.subject)        e.subject = "Please select a topic.";
    if (!form.message.trim()) e.message = "Please enter your message.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    // ── Wire this to your backend / EmailJS / Formspree ──────
    // Example with EmailJS:
    //   emailjs.send("service_id", "template_id", form, "public_key")
    //     .then(() => { setSubmitted(true); setLoading(false); })
    //     .catch(() => { setLoading(false); });
    //
    // For now, simulating a 1.8s network call:
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    }, 1800);
  }

  // ── FAQ TOGGLE ──────────────────────────────────────────────
  function toggleFaq(index) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  // ── SCROLL TO FORM ──────────────────────────────────────────
  function scrollToForm() {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    /*
      pt-20 → pushes content below the fixed navbar height.
      font-display5 (Lato) → matches the rest of your site.
    */
    <div className="min-h-screen bg-white text-[#1A1A1A] font-display5 pt-20">

      {/* ════════════════════════════════════════════════════════
          TICKER STRIP
      ════════════════════════════════════════════════════════ */}
      <Ticker />

      {/* ════════════════════════════════════════════════════════
          PAGE HERO
      ════════════════════════════════════════════════════════ */}
      <section className="px-5 text-center py-14 md:py-16">
        {/* Gold pill tag */}
        <span className="inline-block bg-[#F5E9D0] text-[#8B1A1A] text-[10px]
                         font-bold tracking-[0.2em] uppercase px-4 py-1.5
                         rounded-full mb-4">
          Get in touch
        </span>

        {/* Main headline */}
        <h1 className="font-display3 text-3xl md:text-4xl font-bold
                       text-[#8B1A1A] leading-snug mb-4">
          We'd Love to Hear From You
        </h1>

        {/* Subtext */}
        <p className="text-sm text-[#7A7A7A] max-w-md mx-auto leading-relaxed">
          Whether you're planning an event, placing a bulk order, or just saying
          hello — our team responds within 24 hours.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════
          TWO-COLUMN MAIN SECTION
          Left  → contact form
          Right → info cards
          Stacks to single column on mobile
      ════════════════════════════════════════════════════════ */}
      <section className="px-5 pb-16 md:px-10">
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-2">

          {/* ── LEFT: CONTACT FORM ───────────────────────────── */}
          <div
            id="contact-form"
            className="bg-white border border-[#E8DDD0] rounded-2xl p-7 md:p-8"
          >
            {/* Form section eyebrow + heading */}
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase
                          text-[#C9893A] mb-1">
              Send a message
            </p>
            <h2 className="font-display3 text-xl font-bold text-[#1A1A1A] mb-6">
              How can we help?
            </h2>

            {/* ── SUCCESS BANNER ────────────────────────────── */}
            {submitted && (
              <div className="flex items-center gap-3 px-4 py-3 mb-5 border border-green-300 rounded-lg bg-green-50">
                <span className="text-lg text-green-700">✓</span>
                <p className="text-sm font-semibold text-green-800">
                  Message sent! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

              {/* Name + Phone row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label htmlFor="name"
                         className="block text-xs font-bold tracking-wide uppercase
                                    text-[#4A4A4A] mb-1.5">
                    Full Name <span className="text-[#8B1A1A]">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    aria-required="true"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm
                                outline-none transition-colors bg-[#FEFCF9]
                                placeholder:text-[#B0A090]
                                focus:border-[#C9893A] focus:ring-2
                                focus:ring-[#C9893A]/20
                                ${errors.name
                                  ? "border-red-400 bg-red-50"
                                  : "border-[#E8DDD0]"}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone"
                         className="block text-xs font-bold tracking-wide uppercase
                                    text-[#4A4A4A] mb-1.5">
                    Phone / WhatsApp
                    <span className="ml-1 font-normal normal-case text-[#7A7A7A]">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full border border-[#E8DDD0] rounded-lg px-4 py-2.5
                               text-sm outline-none transition-colors bg-[#FEFCF9]
                               placeholder:text-[#B0A090] focus:border-[#C9893A]
                               focus:ring-2 focus:ring-[#C9893A]/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email"
                       className="block text-xs font-bold tracking-wide uppercase
                                  text-[#4A4A4A] mb-1.5">
                  Email Address <span className="text-[#8B1A1A]">*</span>
                </label>
                <input
                  id="email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  aria-required="true"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none
                              transition-colors bg-[#FEFCF9] placeholder:text-[#B0A090]
                              focus:border-[#C9893A] focus:ring-2 focus:ring-[#C9893A]/20
                              ${errors.email
                                ? "border-red-400 bg-red-50"
                                : "border-[#E8DDD0]"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                    <span aria-hidden="true">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject"
                       className="block text-xs font-bold tracking-wide uppercase
                                  text-[#4A4A4A] mb-1.5">
                  Subject <span className="text-[#8B1A1A]">*</span>
                </label>
                <select
                  id="subject" name="subject"
                  value={form.subject} onChange={handleChange}
                  aria-required="true"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none
                              transition-colors bg-[#FEFCF9] cursor-pointer
                              focus:border-[#C9893A] focus:ring-2 focus:ring-[#C9893A]/20
                              ${errors.subject
                                ? "border-red-400 bg-red-50"
                                : "border-[#E8DDD0]"}`}
                >
                  <option value="">Select a topic...</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                    <span aria-hidden="true">⚠</span> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message"
                       className="block text-xs font-bold tracking-wide uppercase
                                  text-[#4A4A4A] mb-1.5">
                  Message <span className="text-[#8B1A1A]">*</span>
                </label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us more — event date, quantity, special requirements..."
                  rows={5}
                  maxLength={600}
                  aria-required="true"
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none
                              transition-colors bg-[#FEFCF9] placeholder:text-[#B0A090]
                              resize-none focus:border-[#C9893A] focus:ring-2
                              focus:ring-[#C9893A]/20
                              ${errors.message
                                ? "border-red-400 bg-red-50"
                                : "border-[#E8DDD0]"}`}
                />
                {/* Live character count */}
                <p className="text-right text-[10px] text-[#7A7A7A] mt-1">
                  {form.message.length} / 600
                </p>
                {errors.message && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1">
                    <span aria-hidden="true">⚠</span> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-lg text-white text-sm font-bold
                            tracking-widest uppercase transition-colors
                            flex items-center justify-center gap-2
                            ${loading
                              ? "bg-[#8B1A1A]/60 cursor-not-allowed"
                              : "bg-[#8B1A1A] hover:bg-[#6B1212]"}`}
              >
                {loading ? (
                  /* Spinner while sending */
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"
                         aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>✉ Send Message</>
                )}
              </button>

              {/* Trust note */}
              <p className="text-center text-[11px] text-[#7A7A7A]">
                🔒 Your information is safe with us. We never share your details.
              </p>
            </form>
          </div>

          {/* ── RIGHT: INFO CARDS ────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* WhatsApp CTA card — maroon bg */}
            <div className="bg-[#8B1A1A] rounded-2xl p-7">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#E8C97A] mb-2">
                Fastest response
              </p>
              <h3 className="mb-3 text-xl font-bold leading-snug text-white font-display3">
                We reply within 24 hours
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-white/70">
                For urgent custom orders or event catering, reach us directly on
                WhatsApp for the fastest response.
              </p>
              <button
                className="flex items-center gap-2 border border-white/40 text-white
                           text-[11px] font-bold tracking-widest uppercase px-5 py-2.5
                           rounded-lg hover:bg-white/10 transition-colors"
              >
                💬 Chat on WhatsApp
              </button>
            </div>

            {/* Contact details card */}
            <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase
                            text-[#C9893A] mb-4">
                Contact details
              </p>
              <div className="flex flex-col gap-3">
                {CONTACT_DETAILS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 bg-[#FBF6EF] border
                               border-[#E8DDD0] rounded-xl p-4"
                  >
                    {/* Icon box */}
                    <div className="w-10 h-10 rounded-lg bg-[#F5E9D0] flex items-center
                                    justify-center flex-shrink-0 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase
                                    text-[#C9893A] mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-[#1A1A1A]">{item.value}</p>
                      <p className="text-[11px] text-[#7A7A7A] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours card */}
            <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase
                            text-[#C9893A] mb-4">
                Business hours
              </p>

              <div className="flex flex-col">
                {HOURS.map((h, i) => (
                  <div
                    key={h.day}
                    className={`flex items-center justify-between py-2.5
                                ${i < HOURS.length - 1
                                  ? "border-b border-[#E8DDD0]"
                                  : ""}`}
                  >
                    <span className="text-xs font-bold text-[#1A1A1A]">{h.day}</span>
                    {h.badge ? (
                      <span className="text-[10px] bg-green-100 text-green-800
                                       font-bold px-2.5 py-0.5 rounded-full">
                        {h.badge}
                      </span>
                    ) : (
                      <span className="text-xs text-[#7A7A7A]">{h.time}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Advance notice tip */}
              <div className="mt-4 bg-[#F5E9D0] border-l-4 border-[#C9893A]
                              rounded-r-lg px-4 py-3">
                <p className="text-[11px] text-[#8B1A1A] font-semibold leading-relaxed">
                  ★ Custom cakes need 48–72hrs notice.
                  Event catering needs at least 7 days.
                </p>
              </div>
            </div>

            {/* Social media card */}
            <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase
                            text-[#C9893A] mb-4">
                Follow us
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={`${s.label} — ${s.handle}`}
                    className="flex items-center gap-3 p-3 border border-[#E8DDD0]
                               rounded-xl hover:border-[#8B1A1A] hover:bg-[#FBF6EF]
                               transition-all no-underline"
                  >
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-[9px] text-[#7A7A7A] font-semibold uppercase
                                    tracking-wide">
                        {s.label}
                      </p>
                      <p className="text-xs font-bold text-[#1A1A1A]">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ ACCORDION
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#FBF6EF] border-t border-[#E8DDD0] px-5 md:px-10 py-16">
        <div className="max-w-2xl mx-auto">

          {/* Section header */}
          <div className="mb-10 text-center">
            <span className="inline-block bg-[#F5E9D0] text-[#8B1A1A] text-[10px]
                             font-bold tracking-[0.2em] uppercase px-4 py-1.5
                             rounded-full mb-3">
              FAQ
            </span>
            <h2 className="font-display3 text-2xl md:text-3xl font-bold
                           text-[#8B1A1A] mb-2">
              Frequently asked questions
            </h2>
            <p className="text-sm text-[#7A7A7A]">
              Quick answers to the things we hear the most
            </p>
          </div>

          {/* FAQ items */}
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white border border-[#E8DDD0] rounded-xl
                             overflow-hidden"
                >
                  {/* Question row — clickable */}
                  <button
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-5 py-4
                               text-left hover:bg-[#FBF6EF] transition-colors"
                  >
                    <span className="text-sm font-bold text-[#1A1A1A] pr-4 leading-snug">
                      {faq.q}
                    </span>
                    {/* Rotate + to × when open */}
                    <span
                      className={`text-[#8B1A1A] text-xl font-bold flex-shrink-0
                                  transition-transform duration-250
                                  ${isOpen ? "rotate-45" : "rotate-0"}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  {/* Answer — shown when open */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#E8DDD0]">
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CLOSING CTA BAND
      ════════════════════════════════════════════════════════ */}
      {/* <section className="bg-[#8B1A1A] px-5 py-16 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#E8C97A] mb-3">
          Still have questions?
        </p>
        <h2 className="mb-3 text-2xl font-bold text-white font-display3 md:text-3xl">
          Come hungry. Leave happy.
        </h2>
        <p className="max-w-sm mx-auto mb-8 text-sm leading-relaxed text-white/70">
          That's the Fredalenas promise. Reach out any time — we're always happy to help.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={scrollToForm}
            className="flex items-center gap-2 border border-white/40 text-white
                       text-[11px] font-bold tracking-widest uppercase px-6 py-3
                       rounded-lg hover:bg-white/10 transition-colors"
          >
            ✉ Send a message
          </button>
          <button
            className="flex items-center gap-2 bg-[#C9893A] text-white
                       text-[11px] font-bold tracking-widest uppercase px-6 py-3
                       rounded-lg hover:bg-[#a06e2a] transition-colors"
          >
            💬 WhatsApp Us
          </button>
        </div>
      </section> */}
      <div className="bg-[white] px-6 py-12 sm:py-16 md:py-20">
      <AnimatedSection variant="zoom-in" duration={0.9}>

        <div className="max-w-xs mx-auto text-center sm:max-w-md md:max-w-xl lg:max-w-2xl font-display5">

          {/* Heading — scales up smoothly across breakpoints */}
          <h1 className="font-bold tracking-tight text-[#770523]
                         text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px]
                         leading-snug sm:leading-snug md:leading-tight">
            Come hungry. Leave happy. <br className="hidden sm:block" />
            That's the Fredalenas promise.
          </h1>

          {/* Subtext */}
          <p className="text-[12px] sm:text-[13px] md:text-[14px]
                        text-gray-500 mt-3 mb-6 mx-auto
                        max-w-[260px] sm:max-w-sm md:max-w-md">
            Ready to taste the difference? Place your order today or explore our full menu.
          </p>

          {/* Buttons — stack on mobile, side by side on sm+ */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">

            <button className="
              shimmer-btn
              bg-[#DA9100] text-white
              px-8 py-2.5
              text-[13px] sm:text-[14px]
              w-full sm:w-auto
              transition-opacity hover:opacity-90
            ">
              Explore our Snacks
            </button>

            <button className="
              border border-[#DA9100] text-[#DA9100]
              px-8 py-2.5
              text-[13px] sm:text-[14px]
              w-full sm:w-auto
              transition-colors hover:bg-[#DA9100] hover:text-white
            ">
              Our Story
            </button>

          </div>
        </div>
      </AnimatedSection>
    </div>

    </div>
  );
}