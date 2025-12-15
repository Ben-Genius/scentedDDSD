import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../utils/formatMoney';
import { Product } from '../types';

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

    return (
        <div
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-black/90 mb-6
                               transition-all duration-500 ease-in-out
                               group-hover:scale-[1.02]
                             ">

                    {/* Background Image with Parallax Effect */}
                    <img
                        src={product.images.default}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out 
                                   group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />

                    {/* Featured Badge - Original Style */}
                    {product.featured && (
                        <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md 
                                       border border-white/20 text-white text-[10px] font-medium 
                                       px-3 py-1 uppercase tracking-[0.2em]">
                            Featured
                        </span>
                    )}

                    {/* View Product Button - Original Style */}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center 
                                  translate-y-4 opacity-0 
                                  group-hover:translate-y-0 group-hover:opacity-100 
                                  transition-all duration-500 delay-100">
                        <span className="px-6 py-3 bg-white/10 backdrop-blur-sm 
                                       border border-white/30 text-white text-xs 
                                       uppercase tracking-widest 
                                       hover:bg-gold hover:border-gold hover:text-white 
                                       transition-colors duration-300">
                            View Product
                        </span>
                    </div>
                </div>

                {/* Text Content - Outside Image */}
                <div className="text-center space-y-2">
                    {/* Category Tag */}
                    <p
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold 
                                 opacity-90 group-hover:opacity-100 transition-opacity"
                        style={{
                            color: `hsl(var(--theme-color))`,
                        }}
                    >
                        {product.category}
                    </p>

                    {/* Product Title */}
                    <h3 className="text-xl font-playfair text-gold 
                                 transition-colors duration-300"
            
                    >
                        {product.title}
                    </h3>

                    {/* Price */}
                    <p className="text-gray-500 text-sm font-medium tracking-wide">
                        <span
                            className="mr-2 text-gold "

                        >
                            From
                        </span>
                        {formatMoney(lowestPrice)}
                    </p>
                </div>
            </Link>
        </div>
    );
};