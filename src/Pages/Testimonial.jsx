import { useRef, useState } from "react";
import AnimatedSection from '../Components/AnimatedSection'; // ← import added


import FullStar from '../assets/Vector1.png';
import customer1 from '../assets/NigerianWoman.jpeg';
import customer2 from '../assets/NigerianWoman_50s.jpeg';
import customer3 from '../assets/Man.jpeg';





const testimonials = [
  {
    id: 1,
    text: "I ordered a custom cake for my daughter's birthday and it was absolutely stunning. The taste matched the look, moist, rich, and perfectly sweetened. Fredalenas never disappoints. We'll be back every celebration!",
    name: "Amaka Osei",
    role: "Customer",
    avatar: customer1,
    stars: 4,
  },
  {
    id: 2,
    text: "Their chin-chin is the best I've had since my grandmother used to make it. Crunchy, not too sweet, and the portion size is generous. I bought three bags last week and they were gone in two days. Highly recommend!",
    name: "Tunde Adeyemi",
    role: "Customer",
    avatar: customer3,
    stars: 5,
  },
  {
    id: 3,
    text: "The meat pies are something else — that pastry is so flaky and the filling is properly seasoned. I stopped buying from other places the moment I tried Fredalenas. The beef burger is also 10/10, don't sleep on it!",
    name: "Blessing Nwosu",
    role: "Customer",
    avatar: customer2,
    stars: 4,
  },
];

const StarRating = ({ count }) => (
  <div className="flex mt-0.5 gap-0.5 size-[2]">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`text-lg ${i <= count ? "text-yellow-500" : "text-gray-300"}`}>
        ★
      </span>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="flex flex-col justify-between h-full bg-white p-9">
    <p className="leading-relaxed text-gray-700 text-[12px] lg:text-[15px] font-display5">{testimonial.text}</p>
    <div className="flex gap-4 mt-4">
      <img className="object-cover rounded-full w-9 h-9 lg:h-14 lg:w-14" src={testimonial.avatar} />
      <div>
        <h2 className="font-bold font-display5 leading-none text-[11px]">{testimonial.name}</h2>
        <p className="leading-none font-display5 tracking-tight text-[#A8A5A5] text-[11px]  mt-1">{testimonial.role}</p>
        <StarRating count={testimonial.stars} />
      </div>
    </div>
  </div>
);

const ArrowBtn = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Previous" : "Next"}
    className={`
      absolute top-1/2 -translate-y-1/2 z-10
      ${direction === "left" ? "-left-4" : "-right-4"}
      w-9 h-9 rounded-full flex items-center justify-center
      shadow-md transition-all duration-200
      ${disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-[#6B1D1D] text-[#F5D87A] hover:bg-[#4e1515] active:scale-95"
      }
    `}
  >
    {direction === "left" ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    )}
  </button>
);

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const MIN_SWIPE = 50;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, total - 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > MIN_SWIPE) next();
    else if (diff < -MIN_SWIPE) prev();
  };

  return (
    <div className="bg-[#D9D9D9] mt-8">
      <div className="p-8">

        {/* 🎬 ANIMATION 1: Section heading slides in from top */}
        <AnimatedSection variant="fade-down" duration={0.6}>
          <div className="text-center">
            <p>— Every Client Matters —</p>
            <h1 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] sm:leading-snug md:leading-tight font-bold tracking-tight">
              What our Customers are saying
            </h1>
          </div>
        </AnimatedSection>

        {/* ── DESKTOP: 3 cards stagger up one by one ── */}
        <div className="hidden grid-cols-3 gap-4 mx-auto lg:grid max-w-7xl p-9">
          {testimonials.map((t, index) => (
            // 🎬 ANIMATION 2: Each desktop card fades up with a stagger delay
            // index * 0.15 means: card 1 = 0s, card 2 = 0.15s, card 3 = 0.30s
            <AnimatedSection
              key={t.id}
              variant="fade-up"
              delay={index * 0.15}
              duration={0.6}
            >
              <TestimonialCard testimonial={t} />
            </AnimatedSection>
          ))}
        </div>

        {/* ── MOBILE: the whole slider fades up as one block ── */}
        {/* 🎬 ANIMATION 3: Mobile slider fades up as a single unit         */}
        {/* ⚠️  We wrap the OUTER div, NOT the individual slides inside.    */}
        {/*     Wrapping slides would break the swipe translateX transform.  */}
        <AnimatedSection variant="fade-up" duration={0.6} className="lg:hidden">
          <div className="p-4 pt-8 mx-auto max-w-7xl">

            <div className="relative px-6">
              <ArrowBtn direction="left" onClick={prev} disabled={current === 0} />

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform ease-in-out duration-400"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {testimonials.map((t) => (
                    <div key={t.id} className="min-w-full">
                      <TestimonialCard testimonial={t} />
                    </div>
                  ))}
                </div>
              </div>

              <ArrowBtn direction="right" onClick={next} disabled={current === total - 1} />
            </div>

            <div className="flex justify-center gap-2 mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`
                    rounded-full transition-all duration-300
                    ${i === current
                      ? "w-6 h-2.5 bg-[#6B1D1D]"
                      : "w-2.5 h-2.5 bg-[#6B1D1D]/30"
                    }
                  `}
                />
              ))}
            </div>

          </div>
        </AnimatedSection>
        {/* end mobile slider */}

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
      <div className="bg-[#D9D9D9] h-8">

      </div>
    </div>
  );
}