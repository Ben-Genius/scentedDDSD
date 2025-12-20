import { IMAGES } from '@/assets';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "motion/react";

export const Footer = () => {
    return (
        <footer className="bg-champagne border-t border-black/10 pt-20 pb-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-12 mb-20"
            >
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="text-2xl font-playfair font-bold text-black mb-8 block uppercase tracking-widest">
                        {/* Use text or img depending on asset */}
                        <span className="sr-only">Scented by DDSD</span>
                        <img src={IMAGES.logo} alt="Logo" className="w-64 h-auto object-contain brightness-0" />
                    </Link>
                </div>

                <div>
                    <h4 className="text-black font-playfair text-lg mb-8 uppercase tracking-widest font-normal border-b border-black/10 pb-2 inline-block">Shop</h4>
                    <ul className="space-y-4 text-xs uppercase tracking-[0.15em] text-black/70">
                        <li><Link to="/shop?category=candle" className="hover:text-black transition-colors">Candles</Link></li>
                        <li><Link to="/shop?category=diffuser" className="hover:text-black transition-colors">Diffusers</Link></li>
                        <li><Link to="/shop?category=gels" className="hover:text-black transition-colors">Body Gels</Link></li>
                        <li><Link to="/bundles" className="hover:text-black transition-colors">Gift Bundles</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-black font-playfair text-lg mb-8 uppercase tracking-widest font-normal border-b border-black/10 pb-2 inline-block">Client Care</h4>
                    <ul className="space-y-4 text-xs uppercase tracking-[0.15em] text-black/70">
                        <li><Link to="/how-to-order" className="hover:text-black transition-colors">How to Order</Link></li>
                        <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
                        <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
                        <li><Link to="/admin" className="hover:text-black transition-colors">Admin Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-black font-playfair text-lg mb-8 uppercase tracking-widest font-normal border-b border-black/10 pb-2 inline-block">Newsletter</h4>
                    <div className="flex flex-col space-y-4">
                        <p className="text-black/70 text-sm font-light leading-relaxed">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex border-b border-black">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent w-full py-2 text-black placeholder-black/50 focus:outline-none text-sm font-light"
                            />
                            <button type="submit" className="uppercase text-xs tracking-widest text-black font-medium hover:opacity-70">
                                Join
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-black/60">
                <p>&copy; {new Date().getFullYear()} Scented by DDSD. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-black transition-colors">Instagram</a>
                    <a href="#" className="hover:text-black transition-colors">Twitter</a>
                    <a href="#" className="hover:text-black transition-colors">Facebook</a>
                </div>
            </div>
        </footer>
    );
};
