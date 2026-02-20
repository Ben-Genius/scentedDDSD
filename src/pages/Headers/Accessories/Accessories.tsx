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

export const Accessories = () => {
    const addItem = useLocalCart((state) => state.addItem);

    // Slider Logic
    const headerImages = [
        IMAGES.sweethome,
        IMAGES.newlantern,
        IMAGES.burner1,
        IMAGES.burner2,
        IMAGES.artifact1,
        IMAGES.bag1,
        IMAGES.diffcar2,
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [headerImages.length]);

    // 1. Find the Accessories navigation item
    const navItem = navigationData.find(item => item.id === 'shop');

    if (!navItem || !navItem.sections) {
        return <div className="p-10 text-center">Accessories collection not found.</div>;
    }

    // Prepare products list (Flattened for the category view)
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
                    }
                };
            }
            return null;
        });
    }).filter((p): p is typeof products[0] => p !== null);

    // Remove duplicates if any slug appears in multiple sections
    const uniqueProducts = Array.from(new Map(allProducts.map(item => [item.id, item])).values());

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
                            alt={`Accessories Collection ${index + 1}`}
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
                        <span className="font-semibold text-[#d4af37]">Accessories</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-6 drop-shadow-xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        The Accessories Collection
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
                        Enhance your fragrance experience with our curated collection of luxury burners,
                        decorative pieces, and lifestyle accessories.
                    </motion.p>
                </div>
            </div>

            <div className="px-6 md:px-12 max-w-[100rem] mx-auto pb-32">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {uniqueProducts.length > 0 ? (
                        uniqueProducts.map((product) => (
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
                            <p className="font-playfair text-2xl italic">No accessories found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
