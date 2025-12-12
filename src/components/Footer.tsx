import { IMAGES } from '@/assets';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="text-2xl font-playfair font-bold text-gold mb-6 block">
                        <img src={IMAGES.logo1} alt="Logo" className="w-32 h-32 object-cover" />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Experience luxury through scent. Handcrafted essentials for your home and lifestyle.
                    </p>
                </div>

                <div>
                    <h4 className="text-gold font-playfair text-lg mb-6">Shop</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link to="/shop?category=candle" className="hover:text-gold transition-colors">Candles</Link></li>
                        <li><Link to="/shop?category=diffuser" className="hover:text-gold transition-colors">Diffusers</Link></li>
                        <li><Link to="/shop?category=gels" className="hover:text-gold transition-colors">Body Gels</Link></li>
                        <li><Link to="/bundles" className="hover:text-gold transition-colors">Gift Bundles</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gold font-playfair text-lg mb-6">Support</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link to="/how-to-order" className="hover:text-gold transition-colors">How to Order</Link></li>
                        <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                        <li><Link to="/admin" className="hover:text-gold transition-colors">Admin Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gold font-playfair text-lg mb-6">Stay golden</h4>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-gold outline-none rounded-none placeholder-gray-600 font-inter text-sm"
                        />
                        <button className="bg-gold text-black font-medium py-2 px-6 uppercase tracking-wider text-sm hover:bg-white hover:scale-[1.02] transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Scented by DDSD. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gold">Instagram</a>
                    <a href="#" className="hover:text-gold">Twitter</a>
                </div>
            </div>
        </footer>
    );
};
