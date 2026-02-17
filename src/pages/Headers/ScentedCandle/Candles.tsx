"use client";

import { navigationData } from '@/data/navigation';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { useLocalCart } from '@/hooks/useLocalCart';
import toast from 'react-hot-toast';

export const Candles = () => {
    // 1. Find the Scented Candles navigation item
    const candlesNav = navigationData.find(item => item.id === 'candles');
    const addItem = useLocalCart((state) => state.addItem);

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

                    return allCandles.map((product, index) => (
                        <ShopProductCard
                            key={product.id}
                            product={product}
                            onQuickAdd={() => {
                                if (product.variants.length > 0) {
                                    addItem(product, product.variants[0]);
                                    toast.success(`Added ${product.title} to cart`);
                                }
                            }}
                            className="w-full"
                        />
                    ));
                })()}
            </div>
        </div>
    );
};