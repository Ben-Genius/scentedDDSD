import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Instagram, Clock, Send, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const Contact = () => {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Location",
            content: "Accra, Ghana",
            sub: "Online Store"
        },
        {
            icon: Phone,
            title: "Phone",
            content: "+233 25 708 7042",
            sub: "Mon-Sat 9am-6pm"
        },
        {
            icon: Clock,
            title: "Work Hours",
            content: "9:00 AM - 6:00 PM",
            sub: "Monday - Saturday"
        },
        {
            icon: Mail,
            title: "Email",
            content: "info@scentedbyddsd.com",
            sub: "Online Support"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fffcf8] font-inter">
            {/* Dark Hero Section */}
            <div className="bg-[#1a1a1a] text-white pt-40 pb-48 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-gold/20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-0 bottom-0 w-64 h-64 bg-rose/20 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-playfair mb-6"
                    >
                        Feel free to <span className="text-gold italic">get in touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg font-light"
                    >
                        We'd love to hear from you. Whether you have a question about our scents, orders, or just want to say hello.
                    </motion.p>
                </div>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#fffcf8]">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="hidden"></path>
                        <path d="M0,120L1200,0V120H0Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            {/* Content Section with Overlapping Card */}
            <div className="container mx-auto max-w-7xl px-4 -mt-32 pb-24 relative z-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Floating Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-5/12"
                    >
                        <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-gray-100">
                            <h3 className="text-2xl font-playfair mb-8">Leave your message</h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Name</label>
                                        <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-lg focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                                        <input type="email" placeholder="Your Email" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-lg focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all text-sm" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Subject</label>
                                    <input type="text" placeholder="Subject" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-lg focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Message</label>
                                    <textarea rows={5} placeholder="Write your message here..." className="w-full bg-gray-50 border border-gray-100 p-4 rounded-lg focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all resize-none text-sm"></textarea>
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <input type="checkbox" id="privacy" className="mt-1 accent-gold" />
                                    <label htmlFor="privacy" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                                        I agree to the privacy policy and allow Scented by DDSD to contact me regarding my inquiry.
                                    </label>
                                </div>

                                <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-black transition-all shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2">
                                    Send Message <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info Side */}
                    <div className="lg:w-7/12 pt-10 lg:pt-32">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-4xl font-playfair mb-6 text-gray-900">Don't hesitate to <span className="italic text-gold">contact us</span></h2>
                            <p className="text-gray-500 mb-12 text-lg leading-relaxed max-w-xl">
                                Need help choosing a scent? Have a question about your order?
                                Our team is here to help you find your perfect fragrance match.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {contactInfo.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all group">
                                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-colors">
                                            <item.icon size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600 font-medium mb-1">{item.content}</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.sub}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="font-playfair text-xl text-gray-900">Follow us:</span>
                                <div className="flex gap-4">
                                    <a href="https://instagram.com/scented_by_ddsd_" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white transition-all">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="https://tiktok.com/@scentedbyddsd" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white transition-all">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white transition-all">
                                        <MessageCircle size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
