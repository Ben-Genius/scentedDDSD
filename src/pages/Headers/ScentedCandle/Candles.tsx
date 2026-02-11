"use client";

import { navigationData } from '@/data/navigation';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatMoney } from '@/utils/formatMoney';

export const Candles = () => {
    // 1. Find the Scented Candles navigation item
    const candlesNav = navigationData.find(item => item.id === 'candles');

    if (!candlesNav || !candlesNav.sections) {
        return <div className="p-10 text-center">Scented Candles collection not found.</div>;
    }

    return (
        <div className="w-full relative max-w-full px-2 mx-auto min-h-screen py-24  bg-champagne-100">
            <motion.section
                className="w-full px-4 mb-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight font-playfair"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <span className="bg-gradient-to-r from-black via-black/90 to-black/70 bg-clip-text text-transparent font-inter">
                            Scented Candles
                        </span>

                    </motion.h1>
                    <motion.p
                        className="text-base md:text-lg text-black/60 max-w-2xl mx-auto leading-relaxed font-inter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                        Discover our diverse collections of hand-poured luxury candles, crafted to transform your space.
                    </motion.p>
                </div>
            </motion.section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[100rem] mx-auto">
                {(() => {
                    // Aggregate all products from all sections
                    const allCandles = candlesNav.sections.flatMap(section => {
                        return section.links.map(link => {
                            const slug = link.path.split('/').pop();
                            const product = products.find(p => p.slug === slug);

                            // If product found, use navigation data for images
                            if (product) {
                                return {
                                    ...product,
                                    images: {
                                        ...product.images,
                                        default: link.image || product.images.default, // Use image from navigation (White/Black candle)
                                        gallery: link.hoverImage
                                            ? [link.hoverImage, ...product.images.gallery.filter(img => img !== link.hoverImage)]
                                            : product.images.gallery
                                    }
                                };
                            }
                            return null;
                        });
                    }).filter((p): p is typeof products[0] => p !== null);

                    if (allCandles.length === 0) {
                        return <div className="col-span-full text-center py-20 text-gray-500">No products found.</div>;
                    }

                    return allCandles.map((product, index) => {
                        // Determine display price
                        const lowestPrice = product.variants.length > 0
                            ? Math.min(...product.variants.map(v => v.priceGHS))
                            : product.basePrice;

                        return (
                            <motion.div
                                key={product.id}
                                className="group relative bg-[#F5F5F5] rounded-xl min-h-[450px] w-full overflow-hidden transition-all duration-500 hover:shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            >
                                <Link to={`/product/${product.slug}`} className="block w-full h-full relative p-6">
                                    {/* Images - Background Fill */}
                                    <div className="absolute inset-0 z-0">
                                        {/* Main Image */}
                                        <img
                                            src={product.images.default}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 origin-center"
                                        />

                                        {/* Hover Image (Fruit/Flower) */}
                                        {product.images.gallery && product.images.gallery.length > 0 && (
                                            <img
                                                src={product.images.gallery[0]}
                                                alt={product.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-10"
                                            />
                                        )}

                                        {/* Subtle overlay to ensure text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-all duration-300" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="relative z-20 flex flex-col h-full pointer-events-none">
                                        <h2 className="text-center text-xl font-playfair font-bold text-black my-2 group-hover:text-black/80 transition-colors duration-300 px-2 line-clamp-2 drop-shadow-md">
                                            {product.title}
                                        </h2>

                                        <div className="flex-grow" />

                                        <div className="flex flex-col items-center justify-end pb-8">
                                            <span className="text-sm font-inter text-black font-bold tracking-widest bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 shadow-sm">
                                                {formatMoney(lowestPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-white rounded-tl-[2rem] flex items-center justify-center z-30 border-l border-t border-gray-100 pointer-events-auto">
                                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-[#d4af37] group-hover:scale-110 transition-all duration-300 shadow-lg text-white">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    });
                })()}
            </div>
        </div>
    );
};