import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { Product } from '@/types';
import { formatMoney } from '@/utils/formatMoney';

interface ShopProductCardProps {
    product: Product;
    className?: string;
}

export const ShopProductCard = ({ product, className }: ShopProductCardProps) => {
    // Determine display price
    const lowestPrice = product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.priceGHS))
        : product.basePrice;

    return (
        <div
            className={cn(
                "group relative block bg-transparent transition-all duration-300 ease-in-out",
                className
            )}
        >
            <Link to={`/product/${product.slug}`} aria-label={product.title}>
                {/* Image container with taller aspect ratio (Quince style) */}
                <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5] relative mb-3">
                    <img
                        src={product.images.default}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Featured Badge - Minimalist text only */}
                    {product.featured && (
                        <span className="absolute top-2 left-2 text-xs font-medium tracking-widest text-black uppercase">
                            New
                        </span>
                    )}

                    {/* Quick Add - Slide up from bottom */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                        <button
                            className="w-full bg-white/95 backdrop-blur-sm py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors border-t border-black/5"
                            onClick={(e) => {
                                e.preventDefault();
                                // Interaction handled by parent usually, or we can dispatch event
                            }}
                        >
                            Quick Add
                        </button>
                    </div>
                </div>

                {/* Card content - Minimalist */}
                <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-sans text-sm font-medium text-black leading-snug group-hover:text-black/70 transition-colors">
                            {product.title}
                        </h3>
                        <span className="text-sm font-medium text-black ml-4">
                            {formatMoney(lowestPrice)}
                        </span>
                    </div>

                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.category}</p>
                </div>
            </Link>
        </div>
    );
};
