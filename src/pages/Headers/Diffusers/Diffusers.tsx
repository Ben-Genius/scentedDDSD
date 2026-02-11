"use client";

import React from 'react';
import { navigationData } from '@/data/navigation';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { formatMoney } from '@/utils/formatMoney';

export const Diffusers = () => {
    // 1. Find the Diffusers navigation item
    const navItem = navigationData.find(item => item.id === 'diffusers');

    if (!navItem || !navItem.sections) {
        return <div className="p-10 text-center">Diffusers collection not found.</div>;
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
        <div className="w-full relative max-w-full min-h-screen bg-[#FDFBF7]"> {/* Light champagne/off-white bg */}

            {/* Hero Section - Stunning Design */}
            {navItem.featuredImage ? (
                <div className="relative w-full h-[60vh] md:h-[75vh] mb-20 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={navItem.featuredImage}
                            alt="Diffusers Collection"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text readability */}
                    </motion.div>

                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-6 drop-shadow-xl"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            The Diffuser Collection
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
                            Elevate your ambiance with our long-lasting, hand-crafted reed diffusers.
                            A symphony of scent that lingers beautifully.
                        </motion.p>
                    </div>
                </div>
            ) : (
                <div className="pt-32 pb-12 text-center">
                    <h1 className="text-4xl font-playfair mb-4">Diffusers</h1>
                </div>
            )}


            <div className="px-6 md:px-12 max-w-[100rem] mx-auto pb-32">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {allProducts.length > 0 ? (
                        allProducts.map((product, index) => {
                            const lowestPrice = product.variants.length > 0
                                ? Math.min(...product.variants.map(v => v.priceGHS))
                                : product.basePrice;

                            return (
                                <motion.div
                                    key={product.id}
                                    className="group relative flex flex-col items-center"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                >
                                    <Link to={`/product/${product.slug}`} className="block relative w-full aspect-[4/5] overflow-hidden mb-6 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500">
                                        <div className="absolute inset-0 bg-gray-100" />
                                        <img
                                            src={product.images.default}
                                            alt={product.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                        />
                                        {/* Hover Image */}
                                        {product.images.gallery && product.images.gallery[0] && (
                                            <img
                                                src={product.images.gallery[0]}
                                                alt={`${product.title} detailed view`}
                                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                                            />
                                        )}

                                        {/* Tag */}
                                        <div className="absolute top-4 left-4">
                                            {product.stock < 10 && (
                                                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">Low Stock</span>
                                            )}
                                        </div>
                                    </Link>

                                    <div className="text-center space-y-2 w-full px-2">
                                        <Link to={`/product/${product.slug}`}>
                                            <h3 className="font-playfair text-xl text-black hover:text-[#d4af37] transition-colors duration-300">{product.title}</h3>
                                        </Link>
                                        <p className="text-xs font-inter text-black/50 uppercase tracking-widest">{product.category || 'Collection'}</p>
                                        <p className="text-sm font-medium text-black pt-1">{formatMoney(lowestPrice)}</p>
                                    </div>

                                    <button
                                        onClick={() => window.location.href = `/product/${product.slug}`}
                                        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-b border-black text-xs uppercase tracking-widest py-1 hover:border-[#d4af37] hover:text-[#d4af37]"
                                    >
                                        View Product
                                    </button>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-32 text-center text-black/40">
                            <p className="font-playfair text-2xl italic">No diffusers found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
