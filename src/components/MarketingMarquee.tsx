import React, { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets';

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
                className="px-8 py-3 bg-white text-black rounded-sm font-semibold hover:bg-gold hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm"
            >
                {displayText}
            </button>
        </Link>
    );
}

export const MarketingMarquee = () => {
    return (
        <div className="py-20 bg-background text-foreground flex items-center overflow-hidden border-white/5 relative bg-black">
            <div className="w-full container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center lg:gap-12">
                    {/* Left Content */}
                    <div className="flex-shrink-0 space-y-8 px-6 lg:px-0 py-12 lg:py-0 lg:max-w-xl text-center lg:text-left">
                        <div>
                            <span className="block text-gold text-xs uppercase tracking-[0.4em] mb-4 font-inter">Handcrafted in Ghana</span>
                            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6 leading-tight">
                                The Essence of <br /> Luxury Scents
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                                Scented by DDSD brings you an exquisite selection of home fragrances.
                                Blending modern aesthetics with timeless aromas to elevate your sensory experience.
                            </p>
                        </div>

                        <div className="pt-4">
                            <ScrambleButton />
                        </div>
                    </div>

                    {/* Right Marquee Grid */}
                    <div className="flex-1 w-full lg:w-auto space-y-6 overflow-hidden mt-12 lg:mt-0 relative">
                        {/* Gradient masks for smooth fade edges */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                        <Marquee speed={40} reverse className="[--gap:1.5rem]">
                            {marqueeImages1.map((src, idx) => (
                                <div
                                    key={`m1-${idx}`}
                                    className="relative w-64 h-64 lg:w-72 lg:h-72 overflow-hidden flex-shrink-0 rounded-lg border border-white/10"
                                >
                                    <img
                                        src={src}
                                        alt={`Product ${idx + 1}`}
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform ease-out"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Marquee>
                        <Marquee speed={45} className="[--gap:1.5rem]">
                            {marqueeImages2.map((src, idx) => (
                                <div
                                    key={`m2-${idx}`}
                                    className="relative w-64 h-64 lg:w-72 lg:h-72 overflow-hidden flex-shrink-0 rounded-lg border border-white/10"
                                >
                                    <img
                                        src={src}
                                        alt={`Product ${idx + 5}`}
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform ease-out"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    );
};
