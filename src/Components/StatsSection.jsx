// StatsSection.jsx
// Reusable stats component — pass your own data via the `stats` prop
//
// USAGE EXAMPLE:
//
// import StatsSection from '../Components/StatsSection';
//
// <StatsSection
//   stats={[
//     { num: '10+',  label: 'Years of Excellence' },
//     { num: '40K+', label: 'Happy Customers'     },
//     { num: '25+',  label: 'Signature Recipes'   },
//     { num: '100%', label: 'Natural Ingredients' },
//   ]}
// />
//
// You can also change the background color:
// <StatsSection stats={[...]} bgColor="bg-[#770523]" textColor="text-white" />

import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// useCountUp hook — counts from 0 to target when triggered
// ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return count;
}

// ─────────────────────────────────────────────────────────────
// StatCard — single stat with count-up + intersection observer
// ─────────────────────────────────────────────────────────────
function StatCard({ num, label, delay, textColor }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const match = num.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';

  const count = useCountUp(target, 1800, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className='py-4 sm:py-2 px-2 text-center'>
      <h1 className={`
        font-display3 font-bold
        text-[40px] sm:text-[48px] md:text-[56px] lg:text-[60px]
        leading-none mb-1 tabular-nums
        ${textColor || 'text-[#6B1A2A]'}
      `}>
        {count}{suffix}
      </h1>
      <p className={`
        font-display5
        text-[12px] sm:text-[13px] md:text-[14px]
        leading-snug opacity-70
        ${textColor || 'text-[#6B1A2A]'}
      `}>
        {label}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// StatsSection — the reusable exported component
// Props:
//   stats     → array of { num, label } objects (required)
//   bgColor   → Tailwind bg class (default: 'bg-white')
//   textColor → Tailwind text class (default: 'text-[#6B1A2A]')
// ─────────────────────────────────────────────────────────────
export default function StatsSection({
  stats = [],
  bgColor = 'bg-white',
  textColor = 'text-[#6B1A2A]',
}) {
  return (
    <div className={bgColor}>
      <div className='
        grid grid-cols-2 lg:grid-cols-4
        max-w-7xl mx-auto
        px-4 sm:px-8
        py-6 sm:py-8 md:py-10
        divide-x-0 sm:divide-x divide-current/10
      '>
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            num={stat.num}
            label={stat.label}
            delay={i * 0.1}
            textColor={textColor}
          />
        ))}
      </div>
    </div>
  );
}
