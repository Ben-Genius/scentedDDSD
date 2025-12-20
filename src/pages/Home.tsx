import React, { useEffect, useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { MarketingMarquee } from '@/components/MarketingMarquee';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import FeatureSection from '@/components/Featured';
import { SimpleNewArrivals } from '../components/SimpleNewArrivals';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';
import { motion } from "motion/react";
import Testimonials from '@/components/Testimonials';
import Hero from '@/components/Hero';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(products => {
            setFeaturedProducts(products.filter(p => p.featured));
        });
    }, []);


    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-6">
            <div className="bg-white border border-black/10 text-black font-playfair text-xl md:text-5xl font-normal w-12 h-12 md:w-24 md:h-24 flex items-center justify-center shadow-sm">
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-black/60 text-[10px] md:text-xs uppercase tracking-widest mt-3">{label}</span>
        </div>
    );

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
            <div className="flex flex-wrap justify-center gap-2 md:gap-0 mt-8 mb-10">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
        );
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: "easeOut" }
    } as const;

    return (
        <div className="overflow-x-hidden bg-champagne-100">
            <Hero />
            <div className="relative z-10 space-y-24 md:space-y-32 pb-24 pt-16">

                <motion.div {...fadeInUp}>
                    <ProductGrid products={featuredProducts} title="Featured Collections" />
                </motion.div>

                {/* <motion.div {...fadeInUp}>
                    <SimpleNewArrivals />
                </motion.div> */}

                <motion.div {...fadeInUp}>
                    <FeatureSection />
                </motion.div>

                {/* <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <MarketingMarquee />
                </motion.div> */}

                <motion.div {...fadeInUp}>
                    <Testimonials />
                </motion.div>

            </div>
        </div>
    );
};
