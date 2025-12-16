import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';
import { motion } from "motion/react";

export const Hero = () => {
    return (
        <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-champagne-100">
            {/* Background Image with Gentle Zoom */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${IMAGES.hero})` }}
                />
                {/* Soft overlay for text readability (Cream fade instead of harsh black) */}
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center h-full max-w-4xl text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-white text-xs md:text-sm tracking-[0.4em] uppercase font-inter mb-6 drop-shadow-md font-medium"
                >
                    The Holiday Collection
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl md:text-8xl font-playfair text-white leading-tight mb-8 drop-shadow-xl"
                >
                    Scented by <br className="hidden md:block" />
                    <span className="italic">Luxury</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-white/90 text-lg md:text-xl max-w-2xl font-light mb-12 leading-relaxed drop-shadow-md"
                >
                    Discover our new range of handcrafted fragrances, designed to illuminate your home with warmth and elegance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    <Link
                        to="/shop"
                        className="inline-block px-14 py-4 bg-black text-white font-semibold text-xs tracking-[0.25em] uppercase hover:bg-black/90 hover:scale-[1.01] transition-all duration-300 min-w-[240px] border border-black"
                    >
                        Shop Now
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
