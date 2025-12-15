import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';
import { motion } from "motion/react";

export const Hero = () => {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden flex items-center">
            {/* Background with Metallic Gradient Overlay */}
            <div className="absolute inset-0 bg-black z-0">
                <div className="absolute inset-0 bg-metallic-gradient opacity-10 mix-blend-overlay" />
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${IMAGES.hero})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full max-w-5xl">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase font-inter mb-4 md:mb-6 drop-shadow-md"
                >
                    The Essence of Luxury
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-4xl md:text-7xl font-playfair text-white leading-tight mb-6 md:mb-8 drop-shadow-lg"
                >
                    Elevate Your Space with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7852B] via-[#F5E0A3] to-[#B7852B] animate-shimmer bg-[size:200%_auto] drop-shadow-sm">
                        Timeless Scents
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-gray-200 text-base md:text-xl max-w-2xl font-light mb-8 md:mb-10 leading-relaxed drop-shadow-md"
                >
                    Handcrafted candles, diffusers, and essential oils designed to transform your environment into a sanctuary of calm and opulence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex flex-wrap gap-4"
                >
                    <Link
                        to="/shop"
                        className="px-8 py-3 md:px-10 md:py-4 bg-rose text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-rose transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Shop Collection
                    </Link>
                    <Link
                        to="/bundles"
                        className="px-8 py-3 md:px-10 md:py-4 border border-rose text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:bg-rose/10 transition-all duration-300 rounded-sm hover:-translate-y-1"
                    >
                        View Bundles
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
