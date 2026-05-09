import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Calendar, Clock, MapPin, Building, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    secondaryMobile: '',
    date: '',
    slot: '10:00 AM - 12:00 PM',
    address: '',
    propertyType: 'Village / Plot'
  });

  const slots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM'
  ];

  const propertyTypes = ['Villa', 'Plot', 'Both'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Real Estate Inquiry from Website*%0A%0A` +
      `*Full Name:* ${formData.name}%0A` +
      `*Primary Mobile:* ${formData.mobile}%0A` +
      `*Secondary Mobile:* ${formData.secondaryMobile || 'Not Provided'}%0A` +
      `*Scheduled Visit:* ${formData.date}%0A` +
      `*Preferred Slot:* ${formData.slot}%0A` +
      `*Interest:* ${formData.propertyType}%0A` +
      `*Address:* ${formData.address}`;

    window.open(`https://wa.me/918072117912?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-40 px-6 md:px-12 bg-white overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-apple-border to-transparent" />
      <div className="absolute top-[20%] -left-20 w-96 h-96 bg-apple-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-20 w-96 h-96 bg-apple-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left: Branding/Copy */}
          <div className="lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="sticky top-40"
            >
              <span className="text-apple-blue font-bold tracking-widest text-[11px] uppercase mb-6 block">Direct Office</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-apple-text-primary mb-10 leading-[0.9]">
                Let's Discuss Your Dream Home
              </h2>
              <p className="text-apple-text-secondary text-lg font-medium leading-relaxed mb-12 max-w-md">
                Our property consultants are available for a private tour. Schedule your site visit today and experience architectural excellence.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-apple-bg flex items-center justify-center text-apple-blue shadow-sm">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-apple-text-primary mb-1">Direct Line</h4>
                    <p className="text-apple-text-secondary font-medium">+91 80721 17912</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-apple-bg flex items-center justify-center text-apple-blue shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-apple-text-primary mb-1">HQ Address</h4>
                    <p className="text-apple-text-secondary font-medium">Financial District, Gachibowli<br/>Hyderabad, TS 500032</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-14 rounded-[3rem] shadow-apple border border-apple-border"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-apple-bg/50 border border-apple-border rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Mobiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Primary Mobile</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className="w-full bg-apple-bg/50 border border-apple-border rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm"
                      placeholder="+91"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Secondary Mobile</label>
                    <input 
                      type="tel" 
                      value={formData.secondaryMobile}
                      onChange={(e) => setFormData({...formData, secondaryMobile: e.target.value})}
                      className="w-full bg-apple-bg/50 border border-apple-border rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Visit Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Visit Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-text-secondary" size={20} />
                      <input 
                        required
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-apple-bg/50 border border-apple-border rounded-2xl pl-16 pr-6 py-5 outline-none focus:bg-white focus:border-apple-blue transition-all font-medium text-sm cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Preferred Slot</label>
                    <div className="relative">
                      <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-text-secondary" size={20} />
                      <select 
                        value={formData.slot}
                        onChange={(e) => setFormData({...formData, slot: e.target.value})}
                        className="w-full bg-apple-bg/50 border border-apple-border rounded-2xl pl-16 pr-6 py-5 outline-none focus:bg-white focus:border-apple-blue transition-all font-medium text-sm appearance-none cursor-pointer"
                      >
                        {slots.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Interest Grid */}
                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">What are you looking for?</label>
                  <div className="grid grid-cols-3 gap-4">
                    {propertyTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, propertyType: type})}
                        className={cn(
                          "py-4 rounded-2xl font-bold text-[13px] transition-all border shadow-sm",
                          formData.propertyType === type 
                            ? "bg-apple-blue text-white border-apple-blue" 
                            : "bg-apple-bg/50 text-apple-text-primary border-apple-border hover:bg-apple-bg hover:border-apple-text-primary"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Current Residential Address</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-apple-bg/50 border border-apple-border rounded-2xl px-8 py-6 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm resize-none"
                    placeholder="Enter your detailed address"
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="group w-full py-6 bg-apple-blue text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-4 hover:bg-apple-blue/90 transition-all shadow-xl shadow-apple-blue/10 active:scale-[0.98]"
                  >
                    Send Inquiry & Plan Visit <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
