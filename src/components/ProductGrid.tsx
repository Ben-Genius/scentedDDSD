import React from 'react';
import { ProductCard } from './ProductCard';
import { ShopProductCard } from './ShopProductCard';
import { Product } from '../types';
import { motion } from "motion/react";

interface ProductGridProps {
    products: Product[];
    title?: string;
    variant?: 'default' | 'shop';
}

export const ProductGrid = ({ products, title, variant = 'default' }: ProductGridProps) => {
    if (products.length === 0) {
        return <div className="text-center py-20 text-gray-500">Loading collection...</div>;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-24 px-4 max-w-[109rem] mx-auto">
            {title && (
                <div className="text-center mb-16 px-4">
                    <span className="block text-black/60 text-[10px] uppercase tracking-[0.4em] mb-4 font-inter">Curated Selection</span>
                    <h2 className="text-3xl md:text-5xl font-playfair text-black mb-6 leading-tight">
                        {title}
                    </h2>
                    <div className="h-px w-24 bg-black/10 mx-auto" />
                </div>
            )}

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className={`grid gap-6 md:gap-10 ${variant === 'shop'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 lg:grid-cols-4'
                    }`}
            >
                {products.map((product) => (
                    variant === 'shop' ? (
                        <ShopProductCard key={product.id} product={product} />
                    ) : (
                        <ProductCard key={product.id} product={product} />
                    )
                ))}
            </motion.div>
        </section>
    );
};
