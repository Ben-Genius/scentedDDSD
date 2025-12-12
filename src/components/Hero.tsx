import React, { useRef } from "react";
import { Link } from "react-router-dom";
import vid from "@/assets/video/heroVid.mp4";
export const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoLoad = () => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5; // 🔥 Adjust speed here (0.5 = slow, 1 = normal)
        }
    };
    return (
        <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={vid}     // 🔥 Put your video file in /public/videos/
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={handleVideoLoad}
                ref={videoRef}
            />

            {/* Overlay Layers */}
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/60 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-0" />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center max-w-4xl text-center md:text-left">
                <h2 className="text-gold text-sm tracking-[0.5em] uppercase font-inter mb-4 animate-fade-in-up">
                    The Essence of Luxury
                </h2>

                <h1 className="text-5xl md:text-7xl font-playfair text-white leading-tight mb-8 animate-fade-in-up delay-100">
                    Elevate Your Space with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7852B] via-[#F5E0A3] to-[#B7852B] animate-shimmer bg-[size:200%_auto]">
                        Timeless Scents
                    </span>
                </h1>

                <p className="text-gray-200 text-lg md:text-xl font-light mb-10 max-w-2xl animate-fade-in-up delay-200">
                    Handcrafted candles, diffusers, and essential oils designed to transform your
                    environment into a sanctuary of calm and opulence.
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-up delay-300">
                    <Link
                        to="/shop"
                        className="px-8 py-4 bg-gold text-black font-medium text-sm tracking-widest uppercase 
                        hover:bg-white transition-all duration-300 transform hover:scale-105"
                    >
                        Shop Collection
                    </Link>

                    <Link
                        to="/bundles"
                        className="px-8 py-4 border border-gold text-gold font-medium text-sm tracking-widest uppercase 
                        hover:bg-gold/10 transition-all duration-300"
                    >
                        View Bundles
                    </Link>
                </div>
            </div>
        </div>
    );
};
