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
                "group relative block overflow-hidden rounded-none border bg-white text-black transition-all duration-300 ease-in-out hover:shadow-none border-black/5 hover:border-black/20",
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
                        <span className="absolute top-3 left-3 bg-white text-black border border-black/10 text-[10px] font-medium px-2 py-1 uppercase tracking-wider z-10 rounded-none">
                            Featured
                        </span>
                    )}

                    {/* Gradient Overlay for text readability if needed, or just luxury touch */}
                    {/* Gradient Overlay removed for clean look */}
                </div>

                {/* Card content */}
                <div className="p-4 bg-white border-t border-black/5">
                    <h3 className="font-playfair font-medium text-lg text-black leading-tight truncate group-hover:text-black/70 transition-colors">
                        {product.title}
                    </h3>
                    <div className="mt-2 flex justify-between items-center bg-transparent">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.category}</p>
                        <p className="text-sm text-black font-light">
                            {formatMoney(lowestPrice)}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Save button - appears on hover (Visual only for now) */}
            <button
                className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-none bg-white border border-black/10 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
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
                <span className="px-6 py-3 bg-white border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 pointer-events-auto rounded-none font-medium">
                    View Product
                </span>
            </div>
        </div>
    );
};
