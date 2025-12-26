import React, { useEffect, useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import { SimpleNewArrivals } from '../components/SimpleNewArrivals';
import { motion } from "motion/react";
import Testimonials from '@/components/Testimonials';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/Featured';

export const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(products => {
            setFeaturedProducts(products.filter(p => p.featured));
        });
    }, []);

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
