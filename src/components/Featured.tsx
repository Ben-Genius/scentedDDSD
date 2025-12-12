import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "@/assets";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +targetDate - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });



    return (
        <div className="flex flex-wrap justify-center mt-8 mb-10">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
};

export const FeatureSection = () => {
    // Set target date to Christmas of current year
    const currentYear = new Date().getFullYear();
    const christmasDate = new Date(`December 25, ${currentYear} 00:00:00`);

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image */}

            <div className="absolute inset-0">
                <img
                    src={IMAGES.allprod3}
                    alt="Christmas Sale Background"
                    className="w-full h-full object-co"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
            </div>
            <span className="block text-gold text-sm uppercase tracking-[0.4em] mb-4 font-inter">Ends In</span>

            {/* Content of Featured Section */}
            <div className="container mx-auto px-4 relative z-10 text-center">

                <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed animate-fade-in-up delay-200">
                    Discover the perfect gift for your loved ones. Elevate your holiday season with our handcrafted fragrances,
                    now available at exclusive prices for a limited time.
                </p>

                <div className="animate-fade-in-up delay-300">
                    <CountdownTimer targetDate={christmasDate} />
                </div>

                <div className="animate-fade-in-up delay-500">
                    <Link
                        to="/shop"
                        className="inline-block px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300 rounded-sm"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
        <div className="bg-black/40 backdrop-blur-md border border-gold/30 text-white font-playfair text-3xl md:text-5xl font-bold w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-lg">
            {String(value).padStart(2, '0')}
        </div>
        <span className="text-gold text-xs uppercase tracking-widest mt-2">{label}</span>
    </div>
);

export default FeatureSection;
