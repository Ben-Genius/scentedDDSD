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
        <section className="py-6 px-4 max-w-[109rem] mx-auto">
            {title && (
                <div className="text-center mb-10 px-4">
                    <h2 className="text-2xl md:text-3xl font-playfair text-black mb-4 uppercase tracking-[0.1em]">
                        {title}
                    </h2>
                    <div className="flex justify-center">
                        {/* Subtle sun/star icon similar to inspo */}
                        <span className="text-black/20 text-xl">✦</span>
                    </div>
                </div>
            )}

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className={`grid gap-x-8 gap-y-16 ${variant === 'shop'
                    ? 'grid-cols-2 lg:grid-cols-3'
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
