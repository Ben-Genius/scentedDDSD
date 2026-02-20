"use client";

import React, { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { IMAGES } from '@/assets';
import { ChevronRight } from "lucide-react";
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { useLocalCart } from '@/hooks/useLocalCart';
import toast from 'react-hot-toast';

export const AllBody = () => {
    const addItem = useLocalCart((state) => state.addItem);

    // Filter for Bath & Body products
    const bathBodyProducts = products.filter(product => product.category === 'Bath & Body');

    // Slider Logic - Using Soap Images
    const headerImages = [
        IMAGES.soap1,
        IMAGES.soap2,
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [headerImages.length]);

    return (
        <div className="w-full relative max-w-full min-h-screen bg-[#FDFBF7]">
            {/* Hero Section - Slider */}
            <div className="relative w-full h-[60vh] md:h-[75vh] mb-20 overflow-hidden font-outfit">
                {/* Background Images */}
                {headerImages.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={img}
                            alt={`Bath & Body Collection ${index + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                ))}

                {/* Overlay Content */}
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
                        <span className="font-semibold text-[#d4af37]">Bath & Body</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-6 drop-shadow-xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        The Body Collection
                    </motion.h1>

                    <motion.div
                        className="h-1 w-24 bg-white/60 mb-8 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    />

                    <motion.p
                        className="text-white/90 text-lg md:text-xl font-inter tracking-wide max-w-2xl drop-shadow-md font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        Indulge in our luxurious bath and body collection. Hand-crafted soaps and treatments
                        designed for a spa-like experience in the comfort of your home.
                    </motion.p>
                </div>
            </div>

            <div className="px-6 md:px-12 max-w-[100rem] mx-auto pb-32">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {bathBodyProducts.length > 0 ? (
                        bathBodyProducts.map((product) => (
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
                            <p className="font-playfair text-2xl italic">No bath & body products found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
