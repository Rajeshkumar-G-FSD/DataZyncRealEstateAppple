import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const FLOW_IMAGES = [
  "https://images.unsplash.com/photo-1600607687940-4e5a99427c53?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000"
];

interface HeroProps {
  onInquiryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onInquiryClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowContainerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Flow Motion: Layered Parallax
      gsap.to(layer1Ref.current, {
        y: '-15%',
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(layer2Ref.current, {
        y: '-30%',
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Horizontal flow of building "reels"
      gsap.to(flowContainerRef.current, {
        x: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Content fade out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center bg-apple-bg"
    >
      {/* Flow Motion Background Layers */}
      <div 
        ref={flowContainerRef}
        className="absolute inset-0 z-0 flex w-[150%] will-change-transform"
      >
        <div 
          ref={layer1Ref}
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url("${FLOW_IMAGES[0]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>

        <div 
          ref={layer2Ref}
          className="absolute inset-0 z-10 translate-x-[30%] opacity-40 will-change-transform pointer-events-none"
          style={{
            backgroundImage: `url("${FLOW_IMAGES[1]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)'
          }}
        />
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/10 via-transparent to-apple-bg" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-apple-bg/40 via-transparent to-apple-bg/40" />

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-30 text-center px-6 max-w-6xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-[1.5px] bg-apple-blue" />
          <span className="text-apple-blue font-bold tracking-tight text-sm md:text-base uppercase">
            Luxury Flow RE-DEFINED
          </span>
          <div className="w-8 h-[1.5px] bg-apple-blue" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-9xl font-bold leading-[0.95] mb-8 tracking-tighter text-apple-text-primary drop-shadow-sm"
        >
          Crafting Iconic <br className="hidden md:block" /> Real Estate Flow
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-apple-text-secondary text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-medium"
        >
          Experience a new dimension of residential excellence through our curated flow of ultra-luxury residences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-12 py-5 bg-apple-blue text-white font-bold rounded-2xl hover:bg-apple-blue/90 transition-all duration-300 shadow-xl shadow-apple-blue/20 active:scale-95 w-full sm:w-auto">
            Discover Portfolio
          </button>
          <button 
            onClick={onInquiryClick}
            className="px-12 py-5 glass-panel-light text-apple-text-primary font-bold rounded-2xl hover:bg-white transition-all duration-300 shadow-md active:scale-95 w-full sm:w-auto"
          >
            Private Consultation
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator - Apple style */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-text-secondary/60">Flow Down</span>
          <div className="w-[1.5px] h-16 bg-gradient-to-b from-apple-blue to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};
