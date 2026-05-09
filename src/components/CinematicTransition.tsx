import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Interior
      gsap.to(bgRef.current, {
        yPercent: 15,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text Reveal
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 0.5,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center py-40 bg-white"
    >
      {/* Dynamic Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </div>

      <div 
        ref={textRef}
        className="relative z-10 text-center px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-snug tracking-tight text-apple-text-primary px-8">
          "Design is not just what it looks like and feels like. Design is how it works."
        </h2>
        <div className="mt-8 w-16 h-1 bg-apple-blue rounded-full mx-auto" />
      </div>
    </section>
  );
};
