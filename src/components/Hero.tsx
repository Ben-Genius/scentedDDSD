import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';

export const Hero = () => {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden flex items-center">
            {/* Background with Metallic Gradient Overlay */}
            <div className="absolute inset-0 bg-black z-0">
                <div className="absolute inset-0 bg-metallic-gradient opacity-10 mix-blend-overlay" />
                <div
                    className="absolute inset-0 opacity-30 bg-cover bg-center"
                    style={{ backgroundImage: `url(${IMAGES.hero})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full max-w-4xl">
                <h2 className="text-gold text-sm tracking-[0.5em] uppercase font-inter mb-4 animate-fade-in-up">The Essence of Luxury</h2>
                <h1 className="text-5xl md:text-7xl font-playfair text-white leading-tight mb-8 animate-fade-in-up delay-100">
                    Elevate Your Space with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7852B] via-[#F5E0A3] to-[#B7852B] animate-shimmer bg-[size:200%_auto]">
                        Timeless Scents
                    </span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed animate-fade-in-up delay-200">
                    Handcrafted candles, diffusers, and essential oils designed to transform your environment into a sanctuary of calm and opulence.
                </p>

                <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                    <Link
                        to="/shop"
                        className="px-8 py-4 bg-gold text-black font-medium text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 transform hover:scale-105 rounded-md"
                    >
                        Shop Collection
                    </Link>
                    <Link
                        to="/bundles"
                        className="px-8 py-4 border border-gold text-gold font-medium text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors duration-300 rounded-md"
                    >
                        View Bundles
                    </Link>
                </div>
            </div>
        </div>
    );
};
