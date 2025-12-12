import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
    products: Product[];
    title?: string;
}

export const ProductGrid = ({ products, title }: ProductGridProps) => {
    if (products.length === 0) {
        return <div className="text-center py-20 text-gray-500">Loading collection...</div>;
    }

    return (
        <section className="py-20 container mx-auto px-4">
            {title && (
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="block text-gold text-xs uppercase tracking-[0.4em] mb-4 font-inter">Curated Selection</span>
                    <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6 leading-tight">
                        {title}
                    </h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />
                </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};
