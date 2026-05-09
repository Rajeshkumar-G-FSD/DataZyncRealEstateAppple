import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="relative py-40 px-6 md:px-12 bg-apple-bg overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-apple-text-primary mb-8"
          >
            Begin Your Journey
          </motion.h2>
          <p className="text-apple-text-secondary text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Allow us to curate your next extraordinary living experience. 
            Connect with our private office for a confidential consultation.
          </p>
        </div>

        <form className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-apple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative">
              <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-widest pl-4 mb-2 block">Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all placeholder:text-apple-text-secondary/30 font-medium"
              />
            </div>
            <div className="group relative">
              <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-widest pl-4 mb-2 block">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all placeholder:text-apple-text-secondary/30 font-medium"
              />
            </div>
          </div>
          
          <div className="group relative">
            <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-widest pl-4 mb-2 block">Subject</label>
            <input 
              type="text" 
              placeholder="Interested Property or Location"
              className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all placeholder:text-apple-text-secondary/30 font-medium"
            />
          </div>

          <div className="group relative">
            <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-widest pl-4 mb-2 block">Message</label>
            <textarea 
              rows={4}
              placeholder="Your Message"
              className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all placeholder:text-apple-text-secondary/30 font-medium resize-none"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button className="group flex items-center justify-center gap-4 px-12 py-5 bg-apple-blue text-white rounded-full font-bold text-sm hover:bg-apple-blue/90 transition-all duration-300 shadow-lg active:scale-95 w-full md:w-auto">
              Send Inquiry <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
