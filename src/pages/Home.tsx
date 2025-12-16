import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { MarketingMarquee } from '@/components/MarketingMarquee';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import FeatureSection from '@/components/Featured';
import { SimpleNewArrivals } from '../components/SimpleNewArrivals';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';
import { motion } from "motion/react";

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
        <div className="overflow-x-hidden bg-champagne-50">
            <Hero />
            <div className="relative z-10 space-y-24 md:space-y-32 pb-24 pt-16">

                <motion.div {...fadeInUp}>
                    <ProductGrid products={featuredProducts} title="Featured Collections" />
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    className='flex flex-col items-center justify-center text-center px-4'
                >
                    <span className="block text-black/60 text-xs uppercase tracking-[0.4em] font-inter mb-4">
                        Holiday Exclusive
                    </span>

                    <h2 className="text-4xl md:text-6xl font-playfair text-black mb-6 leading-tight">
                        The Gift of Scent
                    </h2>

                    <div className="h-px w-24 bg-black/10 mx-auto" />
                </motion.div>

                {/* Christmas Sale Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative py-24 md:py-36 overflow-hidden mx-4 md:mx-12"
                >
                    <div className="absolute inset-0">
                        <img
                            src={IMAGES.allprod3}
                            alt="Christmas Sale Background"
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-champagne-50 via-transparent to-champagne-50 opacity-90" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="block text-black text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-inter"
                        >
                            Limited Time Offer
                        </motion.span>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-black/80 max-w-2xl mx-auto mb-12 text-base md:text-xl font-light leading-relaxed"
                        >
                            Discover the perfect gift for your loved ones. Elevate your holiday season with our handcrafted fragrances,
                            now available at exclusive prices for a limited time.
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <CountdownTimer targetDate={new Date(`December 25, ${new Date().getFullYear()} 00:00:00`)} />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link
                                to="/shop"
                                className="inline-block px-12 py-4 bg-black text-white font-medium uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white hover:text-black border border-black transition-all duration-300 shadow-xl"
                            >
                                Shop Now
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.div {...fadeInUp}>
                    <MarketingMarquee />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <SimpleNewArrivals />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <FeatureSection />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <Testimonials />
                </motion.div>

            </div>
        </div>
    );
};
