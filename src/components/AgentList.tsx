import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  {
    id: 1,
    name: "Eleanor Sterling",
    role: "Founding Partner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Julian Montrose",
    role: "Senior Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Sofia Valentino",
    role: "Luxury Specialist",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800",
  }
];

export const AgentList: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
            delay: index * 0.15
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="agents" ref={containerRef} className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-apple-blue font-semibold tracking-tight text-sm block mb-6"
        >
          Unrivaled Expertise
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-apple-text-primary">Executive Counsel</h2>
        <div className="mt-8 w-12 h-1 bg-apple-blue rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {AGENTS.map((agent, idx) => (
          <div 
            key={agent.id}
            ref={(el) => (cardsRef.current[idx] = el!)}
            className="group flex flex-col items-center p-8 bg-apple-bg rounded-[2.5rem] shadow-apple hover:shadow-apple-hover transition-all duration-700"
          >
            <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-[2rem]">
              <img 
                src={agent.image} 
                alt={agent.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tight mb-2 text-apple-text-primary group-hover:text-apple-blue transition-colors">{agent.name}</h3>
              <p className="text-apple-text-secondary text-sm font-medium mb-6 uppercase tracking-widest">{agent.role}</p>
              
              <div className="flex justify-center gap-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <Instagram size={20} className="text-apple-text-secondary hover:text-apple-blue cursor-pointer transition-colors" />
                <Linkedin size={20} className="text-apple-text-secondary hover:text-apple-blue cursor-pointer transition-colors" />
                <Twitter size={20} className="text-apple-text-secondary hover:text-apple-blue cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
