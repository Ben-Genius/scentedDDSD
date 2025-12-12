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
                "group relative block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:shadow-lg border-white/10 bg-white/5",
                className
            )}
        >
            <Link to={`/product/${product.slug}`} aria-label={product.title}>
                {/* Image container with taller aspect ratio to cover more space */}
                <div className="aspect-[4/5] overflow-hidden bg-[#111] relative">
                    <img
                        src={product.images.default}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                    />

                    {/* Featured Badge */}
                    {product.featured && (
                        <span className="absolute top-3 left-3 bg-gold/90 text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider z-10">
                            Featured
                        </span>
                    )}

                    {/* Gradient Overlay for text readability if needed, or just luxury touch */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card content */}
                <div className="p-4 bg-black/40 backdrop-blur-sm">
                    <h3 className="font-playfair font-semibold text-lg text-white leading-tight truncate group-hover:text-gold transition-colors">
                        {product.title}
                    </h3>
                    <div className="mt-1 flex justify-between items-center bg-transparent">
                        <p className="text-xs text-gold uppercase tracking-widest">{product.category}</p>
                        <p className="text-sm text-gray-300 font-light">
                            {formatMoney(lowestPrice)}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Save button - appears on hover (Visual only for now) */}
            <button
                className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-black hover:scale-110"
                aria-label="Save product"
                onClick={(e) => {
                    e.preventDefault();
                    // Future wishlist logic here
                    console.log('Saved', product.id);
                }}
            >
                <Bookmark className="h-4 w-4" />
            </button>

            {/* Quick Add / View Button - Centered Style */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                <span className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-gold hover:border-gold hover:text-black transition-colors duration-300 pointer-events-auto">
                    View Product
                </span>
            </div>
        </div>
    );
};
