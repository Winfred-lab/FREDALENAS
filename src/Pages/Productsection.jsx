import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../Components/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

import peanutBurger from '../assets/menu1.jpg';
import crispychin from '../assets/menu4.jpg';
import cake2 from '../assets/cake4.png';
import cupcak from '../assets/cupcak.jpg';

import herPhotoroom from '../assets/herPhotoroom.png';
import Ellipse from '../assets/Ellipse.png';
import FullStar from '../assets/Vector1.png';

import { ChefHat } from 'lucide-react';
import { PackageOpen } from 'lucide-react';
import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Product cards data — makes the grid DRY and easy to update
// ─────────────────────────────────────────────────────────────
const products = [
  { id: 1, name: 'Celebration Cake', img: cake2,        rating: '4.9', price: '₦40,000', old: '₦30,000' },
  { id: 2, name: 'Peanut Burger',    img: peanutBurger, rating: '4.9', price: '₦16,000', old: '₦25,000' },
  { id: 3, name: 'Crispy Chin Chin', img: crispychin,   rating: '4.9', price: '₦40,000', old: '₦30,000' },
  { id: 4, name: 'Cup Cakes',        img: cupcak,       rating: '5.0', price: '₦10,000', old: '₦30,000' },
];


function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    if (!trigger) return; // don't start until in view
 
    let startTime = null;
    const startValue = 0;
 
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 → 1
 
      // easeOutQuart — fast start, slow finish (feels satisfying)
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
 
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target); // snap to exact final value
    };
 
    requestAnimationFrame(step);
  }, [trigger, target, duration]);

    return count;
}

function StatCard({ num, label, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
 
  // Extract the numeric part and suffix separately
  // e.g. "40K+" → target=40, suffix="K+"
  // e.g. "100%" → target=100, suffix="%"
  // e.g. "10+"  → target=10,  suffix="+"
  const match = num.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';
 
  const count = useCountUp(target, 1800, inView);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // small delay per card for stagger effect
          setTimeout(() => setInView(true), delay * 1000);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
 
  return (
    <div ref={ref} className='px-2 py-4 sm:py-6'>
      {/* Number — scales down on mobile */}
      <h1 className='
        font-display3 font-bold text-[#6B1A2A]
        text-[40px] sm:text-[48px] md:text-[56px] lg:text-[60px]
        leading-none mb-1
        tabular-nums          
      '>
        {count}{suffix}
      </h1>
 
      {/* Label */}
      <p className='
        font-display5 text-[#6B1A2A]/70
        text-[12px] sm:text-[13px] md:text-[14px]
        leading-snug
      '>
        {label}
      </p>
    </div>
  );
}
const stats = [
  { num: '10+',  label: 'Years of Excellence' },
  { num: '40+',  label: 'Happy Customers'     }, // note: "40K+" → use "40" + suffix "K+"
  { num: '25+',  label: 'Signature Recipes'   },
  { num: '100%', label: 'Natural Ingredients' },
];
const statsFixed = [
  { num: '10+',  label: 'Years of Excellence' },
  { num: '40K+', label: 'Happy Customers'     },
  { num: '25+',  label: 'Signature Recipes'   },
  { num: '100%', label: 'Natural Ingredients' },
];
 

export default function Product() {
  return (
    <div className="">
      <div className='bg-white text-[#6B1A2A]'>
        <div className='bg-white text-[#6B1A2A]'>
          <div className='
            grid grid-cols-2 lg:grid-cols-4
            max-w-7xl mx-auto
            text-center
            px-4 sm:px-8
            py-4 sm:py-6 md:py-4
            divide-x-0 sm:divide-x divide-[#6B1A2A]/10
          '>
            {statsFixed.map((stat, i) => (
              <StatCard
                key={i}
                num={stat.num}
                label={stat.label}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='bg-[#770523] px-5 sm:px-8 py-12 sm:py-16 md:py-20'>
 
      <div className='grid grid-cols-1 gap-5 mx-auto overflow-hidden lg:grid-cols-2 max-w-7xl'>
 
        <AnimatedSection variant="fade-left" delay={0.2}>
          <div className='p-6 sm:p-8 md:p-10 hover:bg-[#f7eedd] bg-white h-full transition-colors duration-300'>
 
            <div className='flex items-center place-content-between'>
              {/* Icon scales down on mobile */}
              <ChefHat
                className='size-9 sm:size-10 md:size-[50px]'
                color='#DA9100'
              />
              {/* Number scales down on mobile */}
              <h2 className='text-4xl text-gray-200 sm:text-5xl md:text-6xl font-display3'>
                01
              </h2>
            </div>
 
            <div>
              {/* Heading scales up progressively */}
              <h1 className='
                py-4 sm:py-5
                font-display3 font-bold text-[#6B1A2A]
                text-3xl sm:text-4xl md:text-5xl
              '>
                Baked Fresh Daily
              </h1>
              <p className='font-display5 text-[14px] sm:text-[15px] leading-relaxed text-gray-700'>
                Every product leaves our kitchen the same morning it's sold. No overnight stock. No preservatives.
                Just the honest freshness that has made Fredalenas a household name in Nigeria.
              </p>
            </div>
 
          </div>
        </AnimatedSection>
 
        <AnimatedSection variant="fade-right" delay={0.2}>
          <div className='p-6 sm:p-8 md:p-10 hover:bg-[#f7eedd] bg-white h-full transition-colors duration-300'>
 
            <div className='flex items-center place-content-between'>
              <PackageOpen
                className='size-9 sm:size-10 md:size-[50px]'
                color='#DA9100'
              />
              <h2 className='text-4xl text-gray-200 sm:text-5xl md:text-6xl font-display3'>
                02
              </h2>
            </div>
 
            <div>
              <h1 className='
                py-4 sm:py-5
                font-display3 font-bold text-[#6B1A2A]
                text-3xl sm:text-4xl md:text-5xl
              '>
                Custom Orders
              </h1>
              <p className='font-display5 text-[14px] sm:text-[15px] leading-relaxed text-gray-700'>
                Weddings, corporate events, celebrations, or bulk orders, we create bespoke
                gift packages and event snack solutions tailored perfectly to your occasion and guest count.
              </p>
            </div>
 
          </div>
        </AnimatedSection>
 
      </div>
    </div>



      {/* ══════════════════════════════════════════════════════
          SIGNATURE SNACKS — photo left, text right
          🎬 Photo slides in from left, text slides in from right
          They arrive together (same delay) for a mirrored feel
      ══════════════════════════════════════════════════════ */}
     <div className='grid items-center max-w-4xl grid-cols-1 gap-8 px-6 py-12 mx-auto bg-white lg:grid-cols-2 lg:gap-2 sm:px-10 md:px-14 sm:py-14 md:py-16'>
 
      {/* 🎬 Image — fades in from left */}
      <AnimatedSection variant="fade-left" duration={0.7}>
        <div className='relative flex justify-center overflow-visible lg:justify-start'>
 
          {/* Main photo — starts smaller on mobile, full size on lg */}
          <img
            className='relative z-10 w-[220px] sm:w-[260px] md:w-[290px] lg:w-[310px]'
            src={herPhotoroom}
            alt="Fredalenas signature snacks"
          />
 
          {/* Ellipse decoration — hidden on mobile to avoid clutter */}
          <div className='absolute z-0 sm:block top-27 left-29 sm:left-2 sm:top-8 md:top-40'>
            <img
              className='w-[200px] sm:w-[240px] md:w-[270px] lg:w-w-[300px] opacity-80'
              src={Ellipse}
              alt=""
            />
          </div>
 
        </div>
      </AnimatedSection>
 
      {/* 🎬 Text — fades in from right */}
      <AnimatedSection variant="fade-right" delay={0.15} duration={0.7}>
        <div className='text-center lg:text-left'>
 
          {/* Label */}
          <p className='
            font-semibold font-display5 text-[#DA9100]
            text-[15px] sm:text-[17px] md:text-xl
          '>
            - Our Signature Snacks -
          </p>
 
          {/* Heading — scales down on mobile so it doesn't overflow */}
          <h1 className='
            font-display5 font-bold text-[#6B1A2A]
            text-[32px] sm:text-[40px] md:text-[50px] lg:text-6xl
            leading-tight
            my-3 text-sm/6
          '>
            Crafted Fresh, Every Single Day
          </h1>
 
          {/* Body text */}
          <p className='
            font-display5
            text-[13px] sm:text-[14px] md:text-[15px]
            text-gray-600 leading-relaxed
            max-w-sm mx-auto lg:mx-0
          '>
            Handcrafted in Lagos with locally-sourced ingredients & generations of recipe heritage
          </p>
 
        </div>
      </AnimatedSection>
 
    </div>


      <div className='mx-auto max-w-7xl'>

        {/* 🎬 ANIMATION: "Best Seller" label + heading fades up */}
        <AnimatedSection variant="fade-up" duration={0.5}>
          {/* <p className='text-center px-9 font-display5 sm:text-left'>-Best Seller -</p> */}
          <div className="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 md:px-9">
            <h1
              className="text-center sm:text-left text-[20px] sm:text-[28px] md:text-[42px] lg:text-[40px]
                font-display5 leading-tight">
              <span className="text-[#770523]">Best Seller </span>
              Products
            </h1>

            <button
              className="
                flex items-center justify-center
                gap-1
                font-display5
                text-[12px] sm:text-[14px] md:text-[16px]
                bg-[#770523] text-white
                px-4 sm:px-5 md:px-6
                py-2 sm:py-2.5
                rounded
                whitespace-nowrap
                w-full sm:w-auto
              "
            >
              View all products
              <ChevronRight className="size-4 md:size-5" />
            </button>

          </div>
        </AnimatedSection>

        {/* ══════════════════════════════════════════════════
            PRODUCT CARDS GRID
            🎬 Each card fades up with a stagger delay:
               Card 1 = 0s, Card 2 = 0.1s, Card 3 = 0.2s, Card 4 = 0.3s
            This creates a smooth left-to-right wave as you scroll down
        ══════════════════════════════════════════════════ */}
        <div className='grid grid-cols-2 gap-4 mx-auto lg:grid-cols-4 max-w-7xl p-9'>
          {products.map((product, index) => (
            <AnimatedSection
              key={product.id}
              variant="fade-up"
              delay={index * 0.1}   // stagger: each card waits 100ms more than the last
              duration={0.55}
            >
              <div>
                {/* Product Image + Action Icons */}
                <div className='relative group'>
                  <img className='object-cover w-full' src={product.img} alt={product.name} />

                  {/* Heart + Cart icons */}
                  <div className='absolute z-10 flex gap-3 -translate-x-1/2 -translate-y-1/2 top-8/9 left-1/2'>
                    <Heart className='p-2 transition-transform bg-white rounded-full shadow-md cursor-pointer size-9 hover:scale-110' />
                    <ShoppingCart className='p-2 transition-transform bg-white rounded-full shadow-md cursor-pointer size-9 hover:scale-110' />
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <div className='flex items-center justify-between mt-3'>
                    <h3 className='font-bold text-[15.5px] sm:text-[15px] md:text-[20px] font-display5'>{product.name}</h3>
                    <p className='text-sm bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded'>★ {product.rating}</p>
                  </div>
                  <p className='mt-2 text-sm text-gray-600'>
                    Moist vanilla sponge layered with silky buttercream. Fully customisable flavours, sizes, and decorations for any special occasion.
                  </p>
                  <p className='mt-2 text-lg font-bold text-amber-900'>
                    {product.price}
                    <span className='ml-2 text-sm font-normal text-gray-400 line-through'>{product.old}</span>
                  </p>
                  {/* <button className='w-full flex items-center justify-center gap-2 bg-[#DA9100] text-white py-2.5 rounded-xl mt-4 hover:bg-[#EDC483] transition-colors font-display5'>
                    <ShoppingCart size={18} /> Add to Cart
                  </button> */}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>

    </div>
  );
}