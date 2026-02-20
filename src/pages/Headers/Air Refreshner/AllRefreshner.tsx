"use client";

import React from 'react';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { useLocalCart } from '@/hooks/useLocalCart';
import toast from 'react-hot-toast';
import { ChevronRight } from "lucide-react";

export const AllRefreshner = () => {
    const addItem = useLocalCart((state) => state.addItem);

    // Filter for Air Freshener products
    const airFresheners = products.filter(product => product.category === 'Air Fresheners');
    const heroImage = '/images/collections/air-fresheners/hero-main.png';

    return (
        <div className="w-full relative max-w-full min-h-screen bg-[#FDFBF7]">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] md:h-[75vh] mb-20 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={heroImage}
                        alt="Air Fresheners Collection"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center text-sm md:text-base opacity-90 mb-4 space-x-2"
                    >
                        <Link to="/" className="hover:text-[#d4af37] transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-semibold text-[#d4af37]">Air Fresheners</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-6 drop-shadow-xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Air Fresheners
                    </motion.h1>
                    <motion.div
                        className="h-1 w-24 bg-white/60 mb-8 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    />
                    <motion.p
                        className="text-white/90 text-lg md:text-xl font-inter tracking-wide max-w-2xl drop-shadow-md font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        Instantly refresh your space with our luxurious, long-lasting room sprays.
                    </motion.p>
                </div>
            </div>

            <div className="px-6 md:px-12 max-w-[100rem] mx-auto pb-32">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {airFresheners.length > 0 ? (
                        airFresheners.map((product) => (
                            <ShopProductCard
                                key={product.id}
                                product={product}
                                onQuickAdd={() => {
                                    if (product.variants.length > 0) {
                                        addItem(product, product.variants[0]);
                                        toast.success(`Added ${product.title} to cart`);
                                    }
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center text-black/40">
                            <p className="font-playfair text-2xl italic">No air fresheners found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
