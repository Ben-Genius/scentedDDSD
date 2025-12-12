import React from 'react';
import { ProductCard } from './ProductCard';
import { ShopProductCard } from './ShopProductCard';
import { Product } from '../types';

interface ProductGridProps {
    products: Product[];
    title?: string;
    variant?: 'default' | 'shop';
}

export const ProductGrid = ({ products, title, variant = 'default' }: ProductGridProps) => {
    if (products.length === 0) {
        return <div className="text-center py-20 text-gray-500">Loading collection...</div>;
    }

    return (
        <section className="py-20 px-10 max-w-[109rem] mx-auto px-4">
            {title && (
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="block text-gold text-xs uppercase tracking-[0.4em] mb-4 font-inter">Curated Selection</span>
                    <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6 leading-tight">
                        {title}
                    </h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />
                </div>
            )}

            <div className={`grid gap-6 md:gap-10 ${variant === 'shop'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 lg:grid-cols-4'
                }`}>
                {products.map((product) => (
                    variant === 'shop' ? (
                        <ShopProductCard key={product.id} product={product} />
                    ) : (
                        <ProductCard key={product.id} product={product} />
                    )
                ))}
            </div>
        </section>
    );
};
