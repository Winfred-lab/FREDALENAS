import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../Components/AnimatedSection';
import StatsStation from '../Components/StatsSection';

import { Clock3, Heart, Leaf, Flag } from 'lucide-react';

const promises = [
  {
    icon: Clock3,
    title: 'Baked Fresh Daily',
    text: "Every product leaves our kitchen the same morning it's sold. No overnight stock. No preservatives. Just the honest freshness that has made Fredalenas a household name in Nigeria.",
  },
  {
    icon: Heart,
    title: 'Built on Trust',
    text: "Our customers keep coming back, not because of flashy marketing, but because we have never compromised on taste or quality. That consistency is our biggest promise.",
  },
  {
    icon: Leaf,
    title: 'Real Ingredients Only',
    text: "No artificial shortcuts. We use quality flour, real butter, fresh eggs, and properly sourced meat — because the ingredients are what make the difference between good and unforgettable.",
  },
  {
    icon: Flag,
    title: 'Proudly Nigerian',
    text: "Our recipes are rooted in Nigerian food culture. From the crunch of our chin-chin to the flaky layers of our meat pie, every product is a celebration of Nigerian baking at its best.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white pt-18">
      <div className=" bg-[#770523]  ">
        <div className='relative px-5 py-12 mx-auto overflow-hidden text-center md:py-16 max-w-7xl'>
            <p className="block text-[10px] tracking-[0.35em] uppercase text-[#E8C97A] mb-3">
            - OUR HERITAGE -
            </p>
          <h1 className='mb-3 text-3xl font-bold leading-snug text-white font-display3 md:text-4xl'>Baked with Tradition <br /> Served with Pride</h1>
        </div>
      </div>

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

      <div className='grid max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-2 p-9 font-display5'>
          <div>
            <p className='mb-3 text-[#DA9100]'>— Our Story —</p>
            <h2 className='text-[25px] mb-3 tracking-tight font-semibold text-[#770523] text-sm/7'>From a home kitchen to every Nigerian table</h2>
            <p className='tracking-tight text-sm/7'>Fredalenas started from something simple a deep love for good food and the joy it brings to people. What began as a home kitchen experiment grew into one of Nigeria's most trusted names in freshly baked snacks and pastries.
                <br /> Every product we make carries the same care and intention as that very first batch. We are not a factory. We are a bakery and that difference shows in every bite.</p>
          </div>

          <div>
            <p className='mb-3 text-[#DA9100]'>— Our Mission —</p>
            <h2 className='text-[25px] mb-3 tracking-tight font-semibold text-sm/7 text-[#770523]'>To bring freshly made, honest food to every Nigerian table.</h2>
            <p className='tracking-tight text-sm/7'>We believe that good snacks should not be a luxury. From a quick chin-chin on the go to a centrepiece celebration cake, Fredalenas is committed to quality that speaks for itself.</p>
          </div>
      </div>
      <StatsStation
        bgColor="bg-[#770523]"
        textColor="text-white"
        stats={[
          { num: '2020', label: 'Founded'            },
          { num: '5+',   label: 'Cities Delivered'   },
          { num: '50K+', label: 'Orders Fulfilled'   },
          { num: '98%',  label: 'Customer Satisfied' },
        ]}
      />
      <div className='mt-15'>
        <div className='text-center font-display5'>
          <p className='mb-1 text-[#DA9100]'>— What Makes us Different —</p>
          <h1 className='text-[#770523] tracking-tighter text-[30px] font-semibold '>Built on Four Unbreakable Promises</h1>
        </div>

        <div className='grid max-w-6xl grid-cols-1 gap-5 px-5 py-8 mx-auto md:grid-cols-2 sm:gap-6 md:gap-8 sm:px-8 md:px-9 sm:py-10 font-display5'>
      {promises.map(({ icon: Icon, title, text }, i) => (
        <div
          key={i}
          className='
            border border-[#6B1A2A]/15
            rounded-xl
            p-6 sm:p-7 md:p-9
            hover:border-[#770523]/40
            hover:shadow-md
            transition-all duration-300
          '
        >
          {/* Icon — fixed with valid Tailwind size class */}
          <div className='
            inline-flex items-center justify-center
            border border-[#6B1A2A]/20
            rounded-lg
            p-3 mb-4
            bg-[#FFF5E4]
          '>
            <Icon className='size-6 text-[#DA9100]' />
          </div>
 
          {/* Title — scales down on mobile */}
          <h1 className='
            py-1 mb-2
            tracking-tight font-semibold text-[#770523]
            text-[24px] sm:text-[28px] md:text-[32px]
            leading-tight
          '>
            {title}
          </h1>
 
          {/* Body text */}
          <p className='
            text-gray-600
            text-[13px] sm:text-[14px]
            leading-relaxed
          '>
            {text}
          </p>
        </div>
      ))}
    </div>
      </div>
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
  )
}

export default AboutUs

