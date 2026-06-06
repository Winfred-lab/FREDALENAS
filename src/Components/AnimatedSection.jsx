// ============================================================
// AnimatedSection.jsx
// A reusable scroll-triggered animation wrapper using Framer Motion
// Usage: Wrap ANY element or section with <AnimatedSection>
// ============================================================

import { motion } from "framer-motion";

// -----------------------------------------------------------
// ANIMATION PRESETS
// Pass the `variant` prop to choose the animation style
// -----------------------------------------------------------
const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 1, scale: 1 },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 45 },
    visible: { opacity: 1, rotateX: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

// -----------------------------------------------------------
// AnimatedSection Component
// -----------------------------------------------------------
// Props:
//  - children     : the content to animate (required)
//  - variant      : animation type (default: "fade-up")
//  - duration     : how long the animation takes in seconds (default: 0.6)
//  - delay        : delay before animation starts in seconds (default: 0)
//  - once         : animate only once when scrolled into view (default: true)
//  - className    : extra Tailwind classes for the wrapper div
//  - threshold    : how much of the element must be visible (0 to 1, default: 0.15)
// -----------------------------------------------------------
const AnimatedSection = ({
  children,
  variant = "fade-up",
  duration = 0.6,
  delay = 0,
  once = true,
  className = "",
  threshold = 0.15,
}) => {
  // Pick the chosen variant, fall back to fade-up if invalid
  const selectedVariant = variants[variant] || variants["fade-up"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}

    </motion.div>
  );
};

export default AnimatedSection;


// ============================================================
// USAGE EXAMPLES — copy-paste into any page/component
// ============================================================

// 1. Basic fade up (default)
// <AnimatedSection>
//   <h2 className="text-3xl font-bold">Our Story</h2>
// </AnimatedSection>

// 2. Slide in from left
// <AnimatedSection variant="fade-left">
//   <img src="/about.jpg" className="rounded-2xl" />
// </AnimatedSection>

// 3. Slide in from right with delay
// <AnimatedSection variant="fade-right" delay={0.2}>
//   <p className="text-gray-600">We bake with love...</p>
// </AnimatedSection>

// 4. Zoom in effect
// <AnimatedSection variant="zoom-in" duration={0.8}>
//   <div className="bg-white rounded-xl p-6 shadow">Card</div>
// </AnimatedSection>

// 5. Staggered cards (use increasing delay)
// {products.map((product, index) => (
//   <AnimatedSection key={product.id} variant="fade-up" delay={index * 0.1}>
//     <ProductCard product={product} />
//   </AnimatedSection>
// ))}

// 6. With extra Tailwind classes
// <AnimatedSection variant="fade-up" className="col-span-2 mt-8">
//   <HeroContent />
// </AnimatedSection>