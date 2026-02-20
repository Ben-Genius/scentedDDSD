"use client";

import React, { useState, useEffect } from 'react';
import { navigationData } from '@/data/navigation';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { IMAGES } from '@/assets';
import { ChevronRight } from "lucide-react";
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { useLocalCart } from '@/hooks/useLocalCart';
import toast from 'react-hot-toast';

export const AllEssentialOil = () => {
    const addItem = useLocalCart((state) => state.addItem);

    // Slider Logic - Using Essential Oil Images
    const headerImages = [
        IMAGES.oil1,
        IMAGES.oil2,
        IMAGES.oil3,
        IMAGES.oil4,
        IMAGES.oil5,
        IMAGES.oil6,
        IMAGES.oil7,
        IMAGES.oil8,
        IMAGES.oil9,
        IMAGES.oil10,
        IMAGES.oil11,
        IMAGES.oil12,
        IMAGES.oil13,
        IMAGES.oil14,
        IMAGES.oil15,
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [headerImages.length]);

    // 1. Find the Essential Oils navigation item
    const navItem = navigationData.find(item => item.id === 'oils');

    if (!navItem || !navItem.sections) {
        return <div className="p-10 text-center">Essential Oils collection not found.</div>;
    }

    // Prepare products list (similar to Candles.tsx)
    const allProducts = navItem.sections.flatMap(section => {
        return section.links.map(link => {
            const slug = link.path.split('/').pop();
            const product = products.find(p => p.slug === slug);
            if (product) {
                return {
                    ...product,
                    // Use Nav Data images if available, otherwise product defaults
                    images: {
                        ...product.images,
                        default: link.image || product.images.default,
                        gallery: link.hoverImage
                            ? [link.hoverImage, ...product.images.gallery.filter(img => img !== link.hoverImage)]
                            : product.images.gallery
                    }
                };
            }
            return null;
        });
    }).filter((p): p is typeof products[0] => p !== null);

    return (
        <div className="w-full relative max-w-full min-h-screen bg-[#FDFBF7]">
            {/* Hero Section - Slider */}
            <div className="relative w-full h-[60vh] md:h-[75vh] mb-20 overflow-hidden font-outfit">
                {/* Background Images */}
                {headerImages.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Essential Oil Collection ${index + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                ))}

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-4 z-10 text-white">
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
                        <span className="font-semibold text-[#d4af37]">Essential Oils</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-6 drop-shadow-xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Essential Oil Collection
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
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Pure, potent, and hand-selected. Discover our range of therapeutic-grade
                        essential oils designed to restore balance and harmony.
                    </motion.p>
                </div>
            </div>

            <div className="px-6 md:px-12 max-w-[100rem] mx-auto pb-32">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {allProducts.length > 0 ? (
                        allProducts.map((product) => (
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
                            <p className="font-playfair text-2xl italic">No essential oils found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
