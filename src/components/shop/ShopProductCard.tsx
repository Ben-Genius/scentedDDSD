import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { formatMoney } from '@/utils/formatMoney';
import { Heart, Star } from 'lucide-react';
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
                <Link to={`/product/${product.slug}`} className="w-32 h-40 flex-shrink-0 relative overflow-hidden rounded-sm bg-[#f5f5f5] block">
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
                            <Link to={`/product/${product.slug}`} className="block">
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
            <Link to={`/product/${product.slug}`} aria-label={product.title} className="block relative">
                {/* Image container */}
                <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5] relative mb-4 rounded-sm">
                    <img
                        src={product.images.default}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

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
                    {onQuickAdd && (
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
                    )}
                </div>

                {/* Card content */}
                <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-playfair text-sm text-black leading-snug group-hover:text-black/70 transition-colors">
                            {product.title}
                        </h3>
                        <span className="text-sm font-medium text-black ml-4">
                            {formatMoney(lowestPrice)}
                        </span>
                    </div>

                    {/* Rating Stub (Optional visual candy) */}
                    <div className="flex items-center gap-1 opacity-50">
                        <div className="flex text-black/40">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-current" />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
