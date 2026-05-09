import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Maximize2, BedDouble, Bath } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  area: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "DataZync Highcity",
    location: "Gachibowli, Hyderabad",
    price: "₹1.75 Cr onwards",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    beds: 3,
    baths: 3,
    area: "2,400 sq.ft"
  },
  {
    id: 2,
    title: "Crystal Aspires",
    location: "Kondapur, Hyderabad",
    price: "₹85 Lakh onwards",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
    beds: 2,
    baths: 2,
    area: "1,450 sq.ft"
  },
  {
    id: 3,
    title: "Emerald Meadows",
    location: "Tellapur, Hyderabad",
    price: "₹2.20 Cr onwards",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1200",
    beds: 4,
    baths: 4,
    area: "3,800 sq.ft"
  },
  {
    id: 4,
    title: "The Sky Pavilion",
    location: "Banjara Hills, Hyderabad",
    price: "₹5.50 Cr onwards",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    beds: 5,
    baths: 6,
    area: "6,200 sq.ft"
  }
];

export const PropertyGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            delay: index * 0.1
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="properties" ref={sectionRef} className="py-32 px-6 md:px-12 bg-apple-bg max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-apple-blue font-semibold tracking-tight text-sm block mb-4"
          >
            Curated Collection
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-apple-text-primary">Featured Residences</h2>
        </div>
        <button className="flex items-center gap-2 text-apple-blue group tracking-tight text-[15px] font-medium border-b-2 border-transparent hover:border-apple-blue transition-all duration-300 pb-1">
          View all catalog <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {PROPERTIES.map((property, idx) => (
          <div 
            key={property.id}
            ref={(el) => (cardsRef.current[idx] = el!)}
            className="group relative bg-apple-card rounded-[2rem] overflow-hidden shadow-apple hover:shadow-apple-hover transition-all duration-700"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 glass-panel-light rounded-full text-apple-text-primary text-[11px] font-bold tracking-tight">
                Exclusive Listing
              </div>
            </div>

            {/* Info Card */}
            <div className="p-10 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2 text-apple-text-primary">
                    {property.title}
                  </h3>
                  <p className="text-apple-text-secondary text-base font-medium mb-6">{property.location}</p>
                </div>
                <div className="md:text-right">
                  <span className="text-2xl md:text-3xl font-bold text-apple-blue block">{property.price}</span>
                </div>
              </div>
                
              <div className="flex flex-wrap items-center gap-8 text-apple-text-secondary text-[13px] font-medium border-t border-apple-border pt-8">
                <div className="flex items-center gap-2">
                  <BedDouble size={18} className="text-apple-blue/70" /> {property.beds} Beds
                </div>
                <div className="flex items-center gap-2">
                  <Bath size={18} className="text-apple-blue/70" /> {property.baths} Baths
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 size={18} className="text-apple-blue/70" /> {property.area}
                </div>
              </div>

              <div className="mt-4">
                <button className="w-full py-4 bg-apple-bg text-apple-text-primary font-bold rounded-2xl hover:bg-apple-blue hover:text-white transition-all duration-500 shadow-sm active:scale-[0.98]">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
