import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../Components/AnimatedSection';

import Puffpuff from '../assets/puffpuff.png';
import Sakarpala from '../assets/Sakarpala.jpg';
import meatpie from '../assets/meatpie.jpeg';
import cupcak from '../assets/cupcak.jpg';
import Beefpie from '../assets/Beefpie.jpg';

const images = [
  { src: Puffpuff,  label: 'Puff Puff'   },
  { src: Sakarpala, label: 'Sakara Pala' },
  { src: meatpie,   label: 'Meat Pie'    },
  { src: cupcak,    label: 'Cup Cakes'   },
  { src: Beefpie,   label: 'Beef Pie'    },
];

const GalleryCard = ({ src, label, tall }) => (
  <div
    className={`
      flex-shrink-0 rounded-xl overflow-hidden
      border border-[#6B1D1D]/10
      group cursor-pointer
      ${tall ? 'w-[180px] h-[220px]' : 'w-[210px] h-[170px]'}
    `}
  >
    <img
      src={src}
      alt={label}
      className="w-full h-full object-cover
                 transition-transform duration-500
                 group-hover:scale-105"
    />
  </div>
);

const GalleryRow = ({ items, direction, tall }) => (
  <div className="overflow-hidden w-full">
    <div
      className={`
        flex gap-3 w-max
        ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}
        hover:[animation-play-state:paused]
      `}
    >
      {/* Render twice for seamless infinite loop */}
      {[...items, ...items].map((img, i) => (
        <GalleryCard key={i} src={img.src} label={img.label} tall={tall} />
      ))}
    </div>
  </div>
);
 

const Gallery = () => {
  return (
   <div className="bg-white py-12 overflow-hidden">
 
      <div className="px-5 mb-8">
        <p className="text-[#C8922A] uppercase tracking-[2px] text-[11px] font-display5 text-center">
          — Fresh from our kitchen —
        </p>
        <h1 className="text-[52px] text-center font-semibold text-[#6B1D1D] font-display5 mt-1">
          Gallery
        </h1>
      </div>
 
      <div className="flex flex-col gap-4">
        <GalleryRow items={images} direction="left" tall={false} />
      </div>
 
    </div>
  )
}

export default Gallery
