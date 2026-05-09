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
    propertyType: 'Villa'
  });

  const slots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM'
  ];

  const propertyTypes = ['Plot', 'Villa', 'Both'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Inquiry from DataZync Properties*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Mobile:* ${formData.mobile}%0A` +
      `*Secondary Mobile:* ${formData.secondaryMobile || 'N/A'}%0A` +
      `*Visit Date:* ${formData.date}%0A` +
      `*Slot:* ${formData.slot}%0A` +
      `*Property Type:* ${formData.propertyType}%0A` +
      `*Address:* ${formData.address}`;

    window.open(`https://wa.me/918072117912?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white pointer-events-auto w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Sidebar Info */}
              <div className="bg-apple-blue p-8 md:p-12 text-white flex flex-col justify-between md:w-1/3">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4">Book Your Visit</h2>
                  <p className="text-white/80 text-sm font-medium leading-relaxed">
                    Experience luxury firsthand. Schedule a private tour of our exclusive properties.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-60">
                    <Smartphone size={14} /> Private Office
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-[11px] font-bold text-apple-blue uppercase tracking-widest">Inquiry Form</span>
                  <button onClick={onClose} className="p-2 hover:bg-apple-bg rounded-full transition-colors">
                    <X size={20} className="text-apple-text-secondary" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Full Name</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm"
                        placeholder="Ex: John Doe"
                      />
                    </div>
                  </div>

                  {/* Mobiles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm"
                        placeholder="+91"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Secondary Number</label>
                      <input 
                        type="tel" 
                        value={formData.secondaryMobile}
                        onChange={(e) => setFormData({...formData, secondaryMobile: e.target.value})}
                        className="w-full bg-apple-bg rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Visit Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Visit Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-blue/40" size={16} />
                        <input 
                          required
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-apple-bg rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm appearance-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Slot Time</label>
                      <div className="relative">
                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-blue/40" size={16} />
                        <select 
                          value={formData.slot}
                          onChange={(e) => setFormData({...formData, slot: e.target.value})}
                          className="w-full bg-apple-bg rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm appearance-none cursor-pointer"
                        >
                          {slots.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Property Interest</label>
                    <div className="relative">
                      <Building className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-blue/40" size={16} />
                      <select 
                        value={formData.propertyType}
                        onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                        className="w-full bg-apple-bg rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm appearance-none cursor-pointer"
                      >
                        {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] ml-2">Permanent Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-4 text-apple-blue/40" size={16} />
                      <textarea 
                        required
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-apple-bg rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all font-medium text-sm resize-none"
                        placeholder="Enter your detailed address"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit"
                    className="w-full py-5 bg-apple-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-apple-blue/90 transition-all shadow-xl shadow-apple-blue/20 active:scale-[0.98]"
                  >
                    Confirm & Send WhatsApp <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
