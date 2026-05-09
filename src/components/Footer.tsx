import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-apple-border py-20 px-6 md:px-12 text-apple-text-secondary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        <div className="md:col-span-1">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-apple-text-primary mb-8">
            DataZync <span className="font-light text-apple-blue">Properties</span>
          </div>
          <p className="text-[13px] font-medium leading-relaxed max-w-xs transition-colors hover:text-apple-text-primary">
            Global leaders in high-end residential real estate, dedicated to the most discerning clientele.
          </p>
        </div>

        <div>
          <h4 className="text-apple-text-primary font-bold text-[11px] uppercase tracking-widest mb-8">Navigation</h4>
          <ul className="flex flex-col gap-4 text-[13px] font-medium">
            <li><a href="#properties" className="hover:text-apple-blue transition-colors">Properties</a></li>
            <li><a href="#agents" className="hover:text-apple-blue transition-colors">Agents</a></li>
            <li><a href="#contact" className="hover:text-apple-blue transition-colors">Inquiry</a></li>
            <li><a href="#" className="hover:text-apple-blue transition-colors">Legal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-apple-text-primary font-bold text-[11px] uppercase tracking-widest mb-8">Offices</h4>
          <ul className="flex flex-col gap-4 text-[13px] font-medium leading-relaxed">
            <li>Fifth Avenue, New York</li>
            <li>The Peak, Hong Kong</li>
            <li>Mayfair, London</li>
            <li>La Croisette, Cannes</li>
          </ul>
        </div>

        <div>
          <h4 className="text-apple-text-primary font-bold text-[11px] uppercase tracking-widest mb-8">Follow</h4>
          <ul className="flex flex-col gap-4 text-[13px] font-medium">
            <li><a href="#" className="hover:text-apple-blue transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-apple-blue transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-apple-blue transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-apple-blue transition-colors">WeChat</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-apple-border flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium">
        <p>© 2026 DataZync Properties Private Office. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-apple-blue transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-apple-blue transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};
