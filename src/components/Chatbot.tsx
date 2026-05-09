import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Share2, Sparkles } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
  options?: string[];
  type?: 'contact-form' | 'image-reel';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Good morning. Welcome to DataZync Properties helpdesk.", 
      id: 'welcome' 
    },
    {
      role: 'model',
      text: "Our projects cover luxury, mid-range, and affordable categories, meeting the needs of different customers.",
      id: 'intro'
    },
    {
      role: 'model',
      text: "Please select your preferred budget range for the property",
      id: 'budget-ask',
      options: [
        'Less than Rs. 50L',
        'Rs. 50 Lakh - Rs. 75 Lakh',
        'Rs. 75 Lakh - Rs. 1 Cr',
        'Rs. 1 Cr - Rs. 1.50 Cr',
        'Rs. 1.5 Cr - Rs. 2 Cr',
        'Rs. 2 Cr - Rs. 2.5 Cr'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '' });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleOptionClick = async (option: string) => {
    const userMsg: Message = { role: 'user', text: option, id: Date.now().toString() };
    addMessage(userMsg);
    setIsLoading(true);

    // Mocking flow steps based on keywords for a demo-like structured experience
    if (option.includes('Rs.')) {
      setTimeout(() => {
        addMessage({
          role: 'model',
          text: "We have project in the following location. Would you be interested?",
          id: Date.now().toString(),
          options: ['Gachibowli', 'Tellapur', 'Back To Main Menu']
        });
        setIsLoading(false);
      }, 1000);
    } else if (option === 'Gachibowli' || option === 'Tellapur') {
      setTimeout(() => {
        addMessage({
          role: 'model',
          text: "We currently offer these property types. Which one interests you?",
          id: Date.now().toString(),
          options: ['Villa', 'Plots', 'Back to Main Menu']
        });
        setIsLoading(false);
      }, 1000);
    } else if (option === 'Villa' || option === 'Plots') {
      setTimeout(() => {
        addMessage({
          role: 'model',
          text: `Excellent. Here are some featured ${option} projects in your preferred location:`,
          id: Date.now().toString(),
          options: [
            'DataZync Highcity at Gachibowli',
            'Emerald Meadows in Tellapur'
          ]
        });
        setIsLoading(false);
      }, 1000);
    } else if (option.includes('Aspires') || option.includes('Highcity')) {
      setTimeout(() => {
        addMessage({
          role: 'model',
          text: `${option} is located in a premium prime district, with excellent connectivity to the IT Hub and City Center.`,
          id: Date.now().toString()
        });
        addMessage({
          role: 'model',
          text: "Project Showcase:",
          id: Date.now().toString() + '-reel',
          type: 'image-reel'
        });
        addMessage({
          role: 'model',
          text: "We will be happy to serve you further, meanwhile, May I ask you for your information? So that we can reach you just in case the chat interrupts",
          id: Date.now().toString() + '-contact-ask'
        });
        addMessage({
          role: 'model',
          text: "Please enter your contact information",
          id: Date.now().toString() + '-form',
          type: 'contact-form'
        });
        setIsLoading(false);
      }, 1500);
    } else if (option.includes('Main Menu')) {
      // Reset
      addMessage({
        role: 'model',
        text: "Please select your preferred budget range for the property",
        id: Date.now().toString(),
        options: ['Less than Rs. 50L', 'Rs. 50 Lakh - Rs. 75 Lakh', 'Rs. 75 Lakh - Rs. 1 Cr', 'Rs. 1 Cr - Rs. 1.50 Cr', 'Rs. 1.5 Cr - Rs. 2 Cr', 'Rs. 2 Cr - Rs. 2.5 Cr']
      });
      setIsLoading(false);
    } else {
      // Fallback to AI
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: option }] });
      const response = await generateChatResponse(history);
      addMessage({ role: 'model', text: response || '...', id: Date.now().toString() });
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const val = input;
    setInput('');
    handleOptionClick(val);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `*DataZync Contact Form*%0A%0AName: ${contactData.name}%0AEmail: ${contactData.email}%0APhone: ${contactData.phone}`;
    window.open(`https://wa.me/918072117912?text=${summary}`, '_blank');
    addMessage({ role: 'model', text: "Thank you. Your details have been shared with our team via WhatsApp.", id: Date.now().toString() });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-apple-blue text-white rounded-full shadow-2xl flex items-center justify-center group"
      >
        <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping group-hover:animate-none" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 z-[100] md:w-[480px] md:h-[85vh] md:max-h-[800px] bg-white md:rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border-t md:border border-apple-border"
          >
            {/* Header */}
            <div className="bg-white px-8 py-6 border-b border-apple-border flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-apple-bg rounded-2xl flex items-center justify-center relative border border-apple-border shadow-sm">
                  <span className="text-apple-blue font-bold text-xl tracking-tighter">DZ</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-apple-text-primary tracking-tight">DataZync Support</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[11px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] opacity-60">Concierge Desk Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-apple-bg rounded-full transition-all group active:scale-90"
              >
                <X size={24} className="text-apple-text-secondary group-hover:text-apple-text-primary" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-8 py-8 space-y-6 bg-white scroll-smooth"
            >
              <div className="flex flex-col gap-6 mb-12">
                {messages.map((m) => (
                  <div 
                    key={m.id}
                    className={cn(
                      "flex flex-col w-full animate-in fade-in slide-in-from-bottom-2",
                      m.role === 'user' ? "items-end" : "items-start"
                    )}
                  >
                    <div className="flex items-start gap-3 w-full max-w-[95%]">
                      {m.role === 'model' && (
                        <div className="w-9 h-9 rounded-full bg-apple-bg border border-apple-border flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-apple-blue mt-1 shadow-sm">
                          DZ
                        </div>
                      )}
                      <div className="flex flex-col items-start gap-4 w-full">
                        <motion.div 
                          layout
                          className={cn(
                            "p-5 rounded-[1.4rem] text-[15px] leading-relaxed shadow-sm font-medium",
                            m.role === 'user' 
                              ? "bg-apple-blue text-white rounded-tr-none ml-auto" 
                              : "bg-apple-bg/50 text-apple-text-primary border border-apple-border rounded-tl-none"
                          )}
                        >
                          {m.text}
                        </motion.div>

                        {/* Options Rendering */}
                        {m.options && (
                          <div className="flex flex-col items-center gap-2.5 w-full p-6 bg-apple-bg/30 border border-apple-border/50 rounded-[2rem] backdrop-blur-sm shadow-inner">
                            {m.options.map((opt) => (
                              <motion.button
                                key={opt}
                                whileHover={{ scale: 1.01, backgroundColor: '#ffffff' }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleOptionClick(opt)}
                                className="w-full py-4 px-8 bg-white/80 border border-apple-border rounded-2xl text-[14px] font-bold text-apple-text-primary hover:border-apple-blue hover:shadow-apple-sm transition-all duration-300"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}

                        {/* Contact Form */}
                        {m.type === 'contact-form' && (
                          <div className="w-full bg-white p-8 rounded-[2rem] border border-apple-border shadow-apple-lg mt-1">
                            <h4 className="text-[16px] font-bold text-center mb-8 tracking-tight">Personal Details</h4>
                            <form onSubmit={handleContactSubmit} className="space-y-5">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest ml-1">Full Name</label>
                                <input 
                                  type="text" 
                                  placeholder="Ex: Alexander Hunt" 
                                  required
                                  className="w-full border border-apple-border rounded-xl px-4 py-4 outline-none text-sm font-medium focus:border-apple-blue focus:ring-1 focus:ring-apple-blue/20 transition-all bg-apple-bg/30"
                                  value={contactData.name}
                                  onChange={(e) => setContactData({...contactData, name: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest ml-1">Email Address</label>
                                <input 
                                  type="email" 
                                  placeholder="alex@example.com" 
                                  required
                                  className="w-full border border-apple-border rounded-xl px-4 py-4 outline-none text-sm font-medium focus:border-apple-blue focus:ring-1 focus:ring-apple-blue/20 transition-all bg-apple-bg/30"
                                  value={contactData.email}
                                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="flex border border-apple-border rounded-xl overflow-hidden bg-apple-bg/30 ring-inset focus-within:border-apple-blue focus-within:ring-1 focus-within:ring-apple-blue/20 transition-all">
                                  <div className="bg-white/50 px-4 py-4 text-sm font-bold border-r border-apple-border flex items-center gap-2">
                                    🇮🇳 +91
                                  </div>
                                  <input 
                                    type="tel" 
                                    placeholder="98765 43210" 
                                    required
                                    className="flex-1 px-4 py-4 outline-none text-sm font-medium bg-transparent"
                                    value={contactData.phone}
                                    onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                                  />
                                </div>
                              </div>
                              <button 
                                type="submit"
                                className="w-full py-5 bg-apple-blue text-white rounded-2xl font-bold active:scale-95 transition-all text-[15px] shadow-xl shadow-apple-blue/20 hover:bg-apple-blue/90"
                              >
                                Submit & Notify Office
                              </button>
                            </form>
                          </div>
                        )}

                        {/* Image Reel */}
                        {m.type === 'image-reel' && (
                          <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-apple-border relative group">
                            <img 
                              src="https://images.unsplash.com/photo-1600607687943-207e0368383c?auto=format&fit=crop&q=80&w=800" 
                              alt="Project" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-4 bottom-6 flex justify-between items-center px-4">
                              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-apple-text-primary shadow-xl hover:scale-110 transition-transform">
                                ‹
                              </button>
                              <div className="flex gap-1.5">
                                <div className="w-8 h-1 bg-white rounded-full" />
                                <div className="w-1 h-1 bg-white/40 rounded-full" />
                                <div className="w-1 h-1 bg-white/40 rounded-full" />
                              </div>
                              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-apple-text-primary shadow-xl hover:scale-110 transition-transform">
                                ›
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-apple-bg border border-apple-border" />
                    <div className="bg-apple-bg p-5 rounded-2xl rounded-tl-none border border-apple-border shadow-sm">
                      <div className="flex gap-2">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white border-t border-apple-border flex-shrink-0 mb-safe">
              <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask our AI Concierge..."
                  className="w-full bg-apple-bg rounded-2xl pl-6 pr-16 py-5 outline-none text-[15px] font-medium border border-transparent focus:border-apple-blue focus:shadow-[0_0_0_4px_rgba(0,113,227,0.05)] transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-apple-blue text-white rounded-xl shadow-lg shadow-apple-blue/20 active:scale-90 transition-all hover:bg-apple-blue/90"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
