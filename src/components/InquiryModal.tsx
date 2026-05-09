import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, Clock, MapPin, Building, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
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
    
    const message = `*New Real Estate Inquiry*%0A%0A` +
      `*Full Name:* ${formData.name}%0A` +
      `*Primary Mobile:* ${formData.mobile}%0A` +
      `*Secondary Mobile:* ${formData.secondaryMobile || 'Not Provided'}%0A` +
      `*Scheduled Visit:* ${formData.date}%0A` +
      `*Preferred Slot:* ${formData.slot}%0A` +
      `*Interest:* ${formData.propertyType}%0A` +
      `*Address:* ${formData.address}`;

    window.open(`https://wa.me/918072117912?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />

          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white pointer-events-auto w-full max-w-4xl rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row h-[95vh] md:h-auto max-h-[850px]"
            >
              {/* Left Panel: Visual/Info */}
              <div className="hidden md:flex md:w-[40%] bg-apple-blue p-12 text-white flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                   <div className="absolute top-1/4 -right-20 w-80 h-80 border-4 border-white rounded-full" />
                   <div className="absolute -bottom-20 -left-20 w-60 h-60 border-4 border-white rounded-full" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8">
                    <Building size={32} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">Your Next Chapter Begins Here</h2>
                  <p className="text-white/80 text-lg font-medium leading-relaxed">
                    DataZync Properties offers the most exclusive locations in the city. Fill in your details to schedule a site visit.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-sm font-bold bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Available for Site Visits
                  </div>
                  <div className="px-2 text-[11px] font-bold uppercase tracking-widest opacity-60">
                    Trusted by 5000+ Home Owners
                  </div>
                </div>
              </div>

              {/* Right Panel: Form */}
              <div className="flex-1 p-8 md:p-14 overflow-y-auto bg-gray-50/50">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h3 className="text-2xl font-bold text-apple-text-primary tracking-tight">Schedule Consultation</h3>
                    <p className="text-apple-text-secondary text-sm">Please provide your valid details for coordination.</p>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="p-3 hover:bg-white hover:shadow-apple-sm rounded-full transition-all active:scale-90"
                  >
                    <X size={24} className="text-apple-text-secondary" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Section */}
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-apple-border rounded-2xl px-6 py-5 outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm"
                        placeholder="Ex: Alexander Hunt"
                      />
                    </div>
                  </div>

                  {/* Phone Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Primary Mobile</label>
                      <div className="flex border border-apple-border rounded-2xl overflow-hidden bg-white shadow-sm focus-within:border-apple-blue focus-within:ring-4 focus-within:ring-apple-blue/5 transition-all">
                        <div className="bg-apple-bg px-5 py-4 border-r border-apple-border flex items-center gap-2 font-bold text-sm">
                          🇮🇳 +91
                        </div>
                        <input 
                          required
                          type="tel" 
                          value={formData.mobile}
                          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                          className="flex-1 px-6 py-4 outline-none font-medium text-base bg-transparent"
                          placeholder="98765 43210"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Secondary Mobile</label>
                      <input 
                        type="tel" 
                        value={formData.secondaryMobile}
                        onChange={(e) => setFormData({...formData, secondaryMobile: e.target.value})}
                        className="w-full bg-white border border-apple-border rounded-2xl px-6 py-5 outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm"
                        placeholder="Optional Number"
                      />
                    </div>
                  </div>

                  {/* Date & Slot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Visit Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-text-secondary group-focus-within:text-apple-blue transition-colors" size={20} />
                        <input 
                          required
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-white border border-apple-border rounded-2xl pl-16 pr-6 py-5 outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Preferred Slot</label>
                      <div className="relative group">
                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-text-secondary group-focus-within:text-apple-blue transition-colors" size={20} />
                        <select 
                          value={formData.slot}
                          onChange={(e) => setFormData({...formData, slot: e.target.value})}
                          className="w-full bg-white border border-apple-border rounded-2xl pl-16 pr-6 py-5 outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm appearance-none cursor-pointer"
                        >
                          {slots.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Property Interest */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Looking for</label>
                    <div className="grid grid-cols-3 gap-4">
                      {propertyTypes.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, propertyType: type})}
                          className={cn(
                            "py-4 rounded-2xl font-bold text-sm transition-all border shadow-sm",
                            formData.propertyType === type 
                              ? "bg-apple-blue text-white border-apple-blue" 
                              : "bg-white text-apple-text-primary border-apple-border hover:bg-apple-bg"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-1">Permanent Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-6 text-apple-text-secondary group-focus-within:text-apple-blue transition-colors" size={20} />
                      <textarea 
                        required
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-white border border-apple-border rounded-[2rem] pl-16 pr-8 py-6 outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/5 transition-all font-medium text-base shadow-sm resize-none"
                        placeholder="Enter your current residential address"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-6 bg-apple-blue text-white rounded-3xl font-bold flex items-center justify-center gap-4 hover:bg-apple-blue/90 transition-all shadow-[0_20px_40px_rgba(0,113,227,0.3)] active:scale-[0.98] text-lg"
                    >
                      Process Inquiry <Send size={22} className="opacity-80" />
                    </button>
                    <p className="text-center text-[11px] font-medium text-apple-text-secondary mt-6 opacity-60">
                      By submitting, you agree to our terms and conditions for private viewings.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
