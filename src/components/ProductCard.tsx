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
                className="block"
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-gray-50 mb-4 md:mb-6 shadow-none border border-black/5 group-hover:border-black/10 transition-colors duration-300">

                    {/* Background Image */}
                    <img
                        src={product.images.default}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out 
                                   group-hover:scale-110 opacity-100"
                    />

                    {/* Featured Badge */}
                    {product.featured && (
                        <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-medium 
                                       px-3 py-1 uppercase tracking-widest border border-black/10 rounded-none">
                            Featured
                        </span>
                    )}

                    {/* View Product Button */}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center 
                                  translate-y-4 opacity-0 
                                  group-hover:translate-y-0 group-hover:opacity-100 
                                  transition-all duration-300 delay-75">
                        <span className="px-8 py-3 bg-white text-black border border-black
                                       text-xs font-medium
                                       uppercase tracking-widest 
                                       hover:bg-black hover:text-white 
                                       transition-colors duration-300 rounded-none">
                            View Product
                        </span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-2 px-1">
                    {/* Category Tag */}
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500 group-hover:text-black transition-colors">
                        {product.category}
                    </p>

                    {/* Product Title */}
                    <h3 className="text-lg md:text-xl font-playfair text-black 
                                 group-hover:text-black/70 transition-colors duration-300 leading-tight font-normal">
                        {product.title}
                    </h3>

                    {/* Price */}
                    <p className="text-gray-500 text-sm font-medium tracking-wide">
                        <span className="mr-2 text-gray-400 text-xs uppercase">From</span>
                        <span className="text-black font-medium">{formatMoney(lowestPrice)}</span>
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};