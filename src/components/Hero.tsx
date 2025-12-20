import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IMAGES } from '../assets';

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(imageRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5 }
        )
            .fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
                "-=1"
            );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-[77vh] bg-rose-gold overflow-hidden">
            {/* Background Image - Full Cover */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    ref={imageRef}  
                    src={IMAGES.hero1}
                    alt="Holiday Collection"
                    className="w-full h-full object-cover object-center pl-2"
                />
                {/* Subtle gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Overlay */}
            <div ref={textRef} className="absolute bottom-6 left-2 md:bottom-6 md:left-3 max-w-sm bg-black/30 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl text-white shadow-2xl">
                <h2 className="text-xl font-playfair text-white mb-4 uppercase tracking-[0.1em]">
                    Timeless scents for every season                </h2>
                <Link
                    to="/shop"
                    className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-champagne hover:scale-105 transition-all duration-300 uppercase tracking-widest text-sm"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default Hero;
