// Footer.jsx
// Uniform spacing achieved by:
// 1. Removing px-25 from the outer div (it was uneven on different screens)
// 2. Adding px-6 to the outer div (consistent small padding on all sides)
// 3. max-w-7xl mx-auto on the grid handles centering uniformly
// 4. gap-10 on the grid keeps all column gaps equal

import { Phone, MapPinned, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <div className='bg-[#770523] py-20 font-display5 px-6'>

      <div className='grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-10 text-white'>

        {/* Col 1 — Brand */}
        <div className='col-span-2 lg:col-span-1'>
          <h1 className='font-display4 text-[40px] font-bold leading-none mb-3'>Fredalenas</h1>
          <p className='text-[13px] text-base/7 text-white/80'>
            Handcrafted Nigerian snacks baked fresh daily in Lagos. Peanuts, cakes & chin chin made with heritage recipes since 2015.
          </p>
        </div>

        {/* Col 2 — Explore */}
        <div>
          <h2 className='text-[17px] mb-3 font-semibold text-[#EDC483]'>Explore</h2>
          <div className='text-[14px] text-base/8'>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Home</p>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Service</p>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Products</p>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>About Us</p>
          </div>
        </div>

        {/* Col 3 — Product */}
        <div>
          <h2 className='text-[17px] mb-3 font-semibold text-[#EDC483]'>Product</h2>
          <div className='text-[14px] text-base/8'>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Celebration Cake</p>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Chin Chin</p>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Meat Pie</p>
            <p className='hover:text-[#EDC483] cursor-pointer transition-colors'>Peanuts</p>
          </div>
        </div>

        {/* Col 4 — Get in Touch */}
        <div>
          <h2 className='text-[17px] mb-3 font-semibold text-[#EDC483]'>Get in Touch</h2>
          <div className='text-[14px] space-y-3 text-white/90'>

            <p className='flex items-center gap-3'>
              <Phone className='size-[17px] flex-shrink-0' />
              <span>+234 8137690600</span>
            </p>

            <p className='flex items-start gap-3'>
              <MapPinned className='size-[17px] flex-shrink-0 mt-0.5' />
              <span className='text-sm/6'>
                4517 Washington Ave. Manchester,<br />Kentucky 39495
              </span>
            </p>

            <p className='flex items-center gap-3'>
              <Mail className='size-[17px] flex-shrink-0' />
              <span>fredalenafoods@gmail.com</span>
            </p>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className='max-w-7xl mx-auto'>
        <hr className='mt-10 border-white/30' />
        <p className='text-center text-white/50 text-[12px] mt-5 font-display5'>
          © {new Date().getFullYear()} Fredalenas Foods & Bakery Ltd. All rights reserved.
        </p>
      </div>

    </div>
  );
}