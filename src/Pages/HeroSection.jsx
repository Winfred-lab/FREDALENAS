import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../Components/AnimatedSection';

// Assets
import chin from "../assets/chin.png";
import bread from "../assets/bread.png";
import platemeatpie from "../assets/platemeatpie.png";
import peanut from "../assets/peanut.png";

import bnd from "../assets/brd.png";
import stick from "../assets/stick.png";
import pie from "../assets/Ud-2.png";
import BackgroundImg from "../assets/BgImg.jpg";

const snacks = [
    { id: 1, image: chin },
    { id: 2, image: bread },
    { id: 3, image: platemeatpie },
    { id: 4, image: peanut },
];

// ─────────────────────────────────────────────────────────────
// Floating animation config — short, slow, smooth up-and-down
// y: moves between 0px and -10px (upward = negative in CSS)
// duration: 3 seconds per cycle (slow and gentle)
// repeat: Infinity = loops forever
// repeatType: "reverse" = goes up then back down smoothly
// ease: "easeInOut" = accelerates and decelerates naturally
// ─────────────────────────────────────────────────────────────
const floatAnimation = {
  animate: {
    y: [0, -13, 0],           // floats up 10px then back to start
  },
  transition: {
    duration: 3,              // 3 seconds for one full up-and-down cycle
    repeat: Infinity,         // loop forever
    ease: "easeInOut",        // smooth in and out
  },
};

// A slightly different timing for the second image so they don't move in sync
// This makes them feel more natural / organic
const floatAnimationDelayed = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 3.4,            // slightly different speed from bnd
    repeat: Infinity,
    ease: "easeInOut",
    delay: 0.8,               // starts 0.8s later so they're out of phase
  },
};


const HeroSection = () => {
  const [setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % snacks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, );


  return (
    <div style={{
      backgroundImage: `url(${BackgroundImg})`,
    }}
     className='pt-30 bg-cover bg-center '>
      {/* // HeroContent.jsx — fully responsive hero text + floating images + buttons
// Breakpoints handled: mobile (default), sm (640px), md (768px), lg (1024px) */}

<div 
className=" text-center  min-h-fit  px-6 sm:px-9  pt-0 sm:pt-12  pb-6  relative  max-w-3xl mx-auto  ">
  <AnimatedSection delay={0.3}>

    {/* ── Heading ── */}
    <h1 className="
      text-[#770523] font-display5 max-w-[280px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto
      tracking-tighter text-[26px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-bold  leading-tight
      mb-4 pt-2 sm:pt-1
    ">
      Every Bite. The snacks you grew up loving, made better than ever
    </h1>

    {/* ── Subtext ── */}
    <p className="
      max-w-[260px] sm:max-w-sm md:max-w-lg mx-auto
      mb-6
      font-display5
      text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]
      text-gray-600
      leading-relaxed
    ">
      We Bake and craft premium peanuts, Celebration Cakes, and Crispy Chin-Chin,
      every batch made fresh, every Bite unforgettable.
    </p>

    {/* ── Floating decorative image — bnd (top left) ──
        Hidden on very small screens to avoid overlap with text
        Appears from sm upward, positioned further left on larger screens */}
    <motion.img
      className="
         sm:block
        absolute top-4 sm:top-6 md:top-8
        left-3 sm:left-2 md:-left-4 lg:-left-8
        w-[45px] sm:w-[55px] md:w-[60px]
        rotate-[40deg]
        pointer-events-none
      "
      src={bnd}
      alt=""
      animate={floatAnimation.animate}
      transition={floatAnimation.transition}
    />

    {/* ── Floating decorative image — pie (middle right) ──
        Stays on the right side, scales down on smaller screens */}
    <motion.img
      className="
         sm:block
        absolute top-[60%] sm:top-[55%] md:top-[50%]
        right-4 sm:right-2 md:-right-4 lg:-right-8
        w-[50px] sm:w-[58px] md:w-[65px]
        rotate-[40deg]
        pointer-events-none
      "
      src={pie}
      alt=""
      animate={floatAnimationDelayed.animate}
      transition={floatAnimationDelayed.transition}
    />

    {/* ── Floating decorative image — stick (far right, large screens only) ──
        Only visible on lg+ where there's enough room to show it without overlap */}
    <motion.img
      className="
        hidden 
        absolute top-[40%]
        -right-16 lg:-right-20
        w-[45px] md:w-[50px]
        rotate-[40deg]
        pointer-events-none
      "
      src={stick}
      alt=""
      animate={floatAnimationDelayed.animate}
      transition={floatAnimationDelayed.transition}
    />

    {/* ── Buttons ──
        Stack vertically on mobile, side by side on sm+ */}
    <div className="">
      <AnimatedSection variant="zoom-in" duration={0.9}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="
            shimmer-btn
            bg-[#EDC483] rounded
            px-8 py-2.5
            font-display5
            text-[13px] sm:text-[14px]
            w-[200px] sm:w-auto
          "
          >
          Explore our Snacks
        </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="
              rounded border border-gray-400
              px-8 py-2.5
              font-display5
              text-[13px] sm:text-[14px]
              w-[200px] sm:w-auto
              hover:border-[#770523] hover:text-[#770523]
              transition-colors duration-200
            "
          >
            Our Story
          </motion.button>
        </div>
      </AnimatedSection>
    </div>

  </AnimatedSection>
</div>

      {/* MARQUEE BAR */}
      <div className='bg-[#EDC483]'>
        <div className='py-4 text-[#6B1A2A] max-w-7xl mx-auto overflow-x-hidden text-[0.72rem]'>
          <motion.div
            className='flex w-max whitespace-nowrap'
            animate={{ x: [0, '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 20,
              repeat: Infinity,
            }}
          >
            <div className='flex gap-9 tracking-[2px]'>
              <p>✦ CELEBRATION CAKES</p>
              <p>✦ CRISPY CHIN CHIN</p>
              <p>✦ WHOLESALE ORDERS</p>
              <p>✦ PREMIUM BAKED PEANUT</p>
              <p>✦ BAKED MEATPIE</p>
              <p className='mr-6'>EVENT SNACK CATERING</p>
            </div>
            <div className='flex gap-8 tracking-[2px]'>
              <p>✦ CELEBRATION CAKES</p>
              <p>✦ CRISPY CHIN CHIN</p>
              <p>✦ WHOLESALE ORDERS</p>
              <p>✦ PREMIUM BAKED PEANUT</p>
              <p>✦ BAKED MEATPIE</p>
              <p>✦ EVENT SNACK CATERING</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;