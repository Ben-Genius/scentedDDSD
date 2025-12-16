import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../utils/formatMoney';
import { Product } from '../types';
import { motion } from "motion/react";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Determine display price (lowest variant)
    const lowestPrice = product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.priceGHS))
        : product.basePrice;

    // Generate theme color based on category (optional)
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'watches': '45 80% 55%',      // Gold
            'jewelry': '280 60% 65%',     // Purple
            'accessories': '200 70% 55%', // Blue
            'default': '45 80% 55%'       // Gold
        };
        return colors[category.toLowerCase()] || colors.default;
    };

    const themeColor = getCategoryColor(product.category);

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            variants={item}
            className="group relative w-full"
            style={{
                '--theme-color': themeColor,
            } as React.CSSProperties}
        >
            <Link
                to={`/product/${product.slug}`}
                className="block text-center cursor-pointer"
            >
                {/* Image Container - Arch Shape */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[1000px] mb-6 transition-transform duration-500 hover:-translate-y-2">
                    {/* Background Image */}
                    <img
                        src={product.images.default}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out 
                                 opacity-100"
                    />

                    {/* Featured Badge */}
                    {product.featured && (
                        <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black text-[10px] font-medium 
                                       px-3 py-1 uppercase tracking-widest border border-black/5 rounded-full z-10">
                            Featured
                        </span>
                    )}


                    {/* View Product Button */}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center 
                                  translate-y-4 opacity-0 
                                  group-hover:translate-y-0 group-hover:opacity-100 
                                  transition-all duration-300 delay-75 z-20">
                        <span className="px-8 py-3 bg-champagne text-black border border-black/10
                                       text-[10px] font-medium
                                       uppercase tracking-widest 
                                       hover:bg-champagne-200 hover:text-black 
                                       transition-colors duration-300 rounded-sm shadow-lg">
                            View Product
                        </span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2 px-1">
                    {/* Product Title */}
                    <h3 className="text-sm uppercase tracking-[0.2em] font-playfair text-black 
                                 group-hover:text-black/70 transition-colors duration-300">
                        {product.title}
                    </h3>

                    {/* Price */}
                    <p className="text-black/60 text-xs font-inter tracking-widest font-medium">
                        {formatMoney(lowestPrice)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};