import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onInquiryClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onInquiryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '#properties' },
    { name: 'Agents', href: '#agents' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6",
        isScrolled ? "bg-white/80 backdrop-blur-xl py-4 border-b border-apple-border shadow-apple" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-apple-text-primary">
            DataZync <span className="font-light text-apple-blue">Properties</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-[13px] font-medium text-apple-text-primary/70 hover:text-apple-blue transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button 
              onClick={onInquiryClick}
              className="px-5 py-2 bg-apple-blue text-white text-[13px] font-medium rounded-full hover:bg-apple-blue/90 transition-all duration-300 shadow-sm active:scale-95"
            >
              Inquire
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-apple-text-primary p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-apple-border overflow-hidden shadow-xl"
          >
            <ul className="py-8 px-6 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-xl font-medium text-apple-text-primary hover:text-apple-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    onInquiryClick();
                  }}
                  className="w-full py-4 bg-apple-blue text-white rounded-2xl font-medium"
                >
                  Inquire Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
