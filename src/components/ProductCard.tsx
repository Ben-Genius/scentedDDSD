import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../utils/formatMoney';
import { Product } from '../types';
import cn from 'classnames';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Determine display price (lowest variant)
    const lowestPrice = product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.priceGHS))
        : product.basePrice;

    return (
        <div className="group relative">
            <Link to={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-[#111] mb-6">
                    <img
                        src={product.images.default}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {product.featured && (
                        <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium px-3 py-1 uppercase tracking-[0.2em]">
                            Featured
                        </span>
                    )}

                    {/* Quick Add / View Button */}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-gold hover:border-gold hover:text-black transition-colors duration-300">
                            View Product
                        </span>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {product.category}
                    </p>
                    <h3 className="text-xl font-playfair text-white group-hover:text-gold transition-colors duration-300">
                        {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light tracking-wide">
                        <span className="text-gold/60 mr-2">From</span>
                        {formatMoney(lowestPrice)}
                    </p>
                </div>
            </Link>
        </div>
    );
};
