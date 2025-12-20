import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets';
import { motion } from "motion/react";

interface MarqueeProps {
    children: ReactNode;
    pauseOnHover?: boolean;
    reverse?: boolean;
    className?: string;
    speed?: number;
}

function Marquee({
    children,
    pauseOnHover = false,
    reverse = false,
    className,
    speed = 40,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
                className
            )}
            style={
                {
                    "--duration": `${speed}s`,
                } as React.CSSProperties
            }
        >
            <div
                className={cn(
                    "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
                    reverse && "[animation-direction:reverse]",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
                    reverse && "[animation-direction:reverse]",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}

const marqueeImages1 = [
    IMAGES.candle,
    IMAGES.diffavent,
    IMAGES.spray,
    IMAGES.soap,
    IMAGES.artifact1
];

const marqueeImages2 = [
    IMAGES.candle2,
    IMAGES.diffaventus,
    IMAGES.roseapple,
    IMAGES.amberspray,
    IMAGES.soap2
];

function ScrambleButton() {
    const [displayText, setDisplayText] = useState("View Collection");
    const [isScrambling, setIsScrambling] = useState(false);
    const originalText = "View Collection";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const maxIterations = originalText.length;

        const interval = setInterval(() => {
            setDisplayText(() =>
                originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <Link to="/shop">
            <button
                onMouseEnter={scramble}
                className="px-10 py-4 bg-black text-white rounded-none font-medium hover:bg-black/90 hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs shadow-none border border-black"
            >
                {displayText}
            </button>
        </Link>
    );
}

export const MarketingMarquee = () => {
    return (
        <div className="py-0 md:py-10  text-foreground flex items-center overflow-hidden border-white/5 relative">
            <div className="w-full px-6 md:px-12 max-w-[109rem] mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:gap-20">
                    {/* Left Content */}
                    <div className="flex-shrink-0 space-y-6 md:space-y-8 px-4 lg:px-0 lg:max-w-xl text-center lg:text-left z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="block text-black/60 text-xs uppercase tracking-[0.4em] mb-4 font-inter">Handcrafted in Ghana</span>
                            <h2 className="text-4xl md:text-6xl font-playfair text-black mb-6 leading-tight">
                                The Essence of <br /> Luxury Scents
                            </h2>
                            <p className="text-black/70 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                                Scented by DDSD brings you an exquisite selection of home fragrances.
                                Blending modern aesthetics with timeless aromas to elevate your sensory experience.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="pt-4"
                        >
                            <ScrambleButton />
                        </motion.div>
                    </div>

                    {/* Right Marquee Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-1 w-full lg:w-auto space-y-6 overflow-hidden mt-16 lg:mt-0 relative"
                    >
                        {/* Gradient masks for smooth fade edges - Responsive widths */}
                        <div className="absolute inset-y-0 left-0 w-12 md:w-28 bg-gradient-to-r from-champagne-100 to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-12 md:w-28 bg-gradient-to-l from-champagne-100 to-transparent z-10 pointer-events-none" />

                        <Marquee speed={50} reverse className="[--gap:1rem] md:[--gap:1.5rem]">
                            {marqueeImages1.map((src, idx) => (
                                <div
                                    key={`m1 - ${idx} `}
                                    className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 overflow-hidden flex-shrink-0 rounded-none border border-black/5 shadow-none"
                                >
                                    <img
                                        src={src}
                                        alt={`Product ${idx + 1} `}
                                        className="w-full h-full object-cover hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform ease-out"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Marquee>
                        <Marquee speed={45} className="[--gap:1rem] md:[--gap:1.5rem]">
                            {marqueeImages2.map((src, idx) => (
                                <div
                                    key={`m2 - ${idx} `}
                                    className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 overflow-hidden flex-shrink-0 rounded-none border border-black/5 shadow-none"
                                >
                                    <img
                                        src={src}
                                        alt={`Product ${idx + 5} `}
                                        className="w-full h-full object-cover hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform ease-out"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
