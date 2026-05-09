/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CinematicTransition } from './components/CinematicTransition';
import { PropertyGrid } from './components/PropertyGrid';
import { AgentList } from './components/AgentList';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-apple-bg min-h-screen selection:bg-apple-blue selection:text-white">
      {/* Subtle Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-apple-blue z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="overflow-x-hidden">
        <Hero />
        
        <div id="properties">
          <PropertyGrid />
        </div>

        <CinematicTransition />

        <div id="agents">
          <AgentList />
        </div>

        <div id="contact">
          <ContactForm />
        </div>
      </main>

      <Footer />

      {/* Decorative Overlays - subtle top/bottom fade for depth */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute top-0 w-full h-[15vh] bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </div>
  );
}
