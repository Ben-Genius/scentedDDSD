import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { formatMoney } from '@/utils/formatMoney';

import { motion } from 'motion/react';

interface ShopProductCardProps {
    product: Product;
    viewMode?: 'grid' | 'list';
    onQuickAdd?: () => void;
    className?: string;
}

export const ShopProductCard = ({
    product,
    viewMode = 'grid',
    onQuickAdd,
    className
}: ShopProductCardProps) => {
    // Determine display price
    const lowestPrice = product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.priceGHS))
        : product.basePrice;

    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                    "group flex gap-6 p-4 bg-white rounded-sm border border-transparent hover:border-black/5 hover:shadow-lg transition-all",
                    className
                )}
            >
                <Link 
                    to={`/product/${product.slug}`} 
                    state={{ passedImages: product.images }}
                    className="w-32 h-40 flex-shrink-0 relative overflow-hidden rounded-sm bg-[#f5f5f5] block"
                >
                    <img
                        src={product.images.default}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </Link>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link 
                                to={`/product/${product.slug}`} 
                                state={{ passedImages: product.images }}
                                className="block"
                            >
                                <h3 className="text-lg font-playfair text-black mb-2 hover:text-black/70 transition-colors">{product.title}</h3>
                            </Link>
                            <p className="text-black/60 text-xs line-clamp-2 max-w-md mb-3">{product.shortDescription}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.category}</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-3">
                            <span className="text-lg font-medium text-black block">{formatMoney(lowestPrice)}</span>
                            {onQuickAdd && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onQuickAdd();
                                    }}
                                    className="text-[10px] font-bold uppercase tracking-widest border border-black/10 px-4 py-2 rounded-sm hover:bg-black hover:text-white transition-colors"
                                >
                                    Quick Add
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group relative block bg-transparent transition-all duration-300 ease-in-out",
                className
            )}
        >
            <Link 
                to={`/product/${product.slug}`} 
                state={{ passedImages: product.images }}
                aria-label={product.title} 
                className="block relative"
            >
                {/* Image container */}
                <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5] relative mb-4 rounded-sm">
                    {/* Main Image */}
                    <img
                        src={product.images.default}
                        alt={product.title}
                        className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
                            // If gallery has image, fade out default on hover. Else zoom.
                            product.images.gallery[0] ? "group-hover:opacity-0" : "group-hover:scale-105"
                        )}
                        loading="lazy"
                    />

                    {/* Secondary Image (Hover) - Only if available */}
                    {product.images.gallery[0] && (
                        <img
                            src={product.images.gallery[0]}
                            alt={`${product.title} view`}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"
                            loading="lazy"
                        />
                    )}

                    {/* Featured/Stock Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.featured && (
                            <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                                New
                            </span>
                        )}
                        {product.stock > 0 && product.stock < 5 && (
                            <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                                Low Stock
                            </span>
                        )}
                    </div>

                    {/* Quick Add - Slide up from bottom */}
                    {/* {onQuickAdd && (
                        <div className="absolute inset-x-0 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 z-20 flex justify-center px-4">
                            <button
                                className="w-fit bg-white/95 backdrop-blur-sm px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors border border-black/5 shadow-lg rounded-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onQuickAdd();
                                }}
                            >
                                Quick Add
                            </button>
                        </div>
                    )} */}
                </div>

                {/* Card content */}
                <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-playfair text-md text-black leading-snug group-hover:text-black/70 transition-colors">
                            {product.title}
                        </h3>
                        <span className="text-sm font-medium text-black ml-4">
                            {formatMoney(lowestPrice)}
                        </span>
                    </div>

                    {/* Quick Add / Add to Cart replacing stars */}
                    {onQuickAdd && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickAdd();
                            }}
                            className="mt-2 w-full bg-transparent border border-black/10 hover:border-black text-black text-[10px] font-bold uppercase tracking-widest py-2 rounded-sm transition-all hover:bg-black hover:text-white"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};
