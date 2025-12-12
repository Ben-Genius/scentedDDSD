import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import { IMAGES } from '@/assets';

export const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(products => {
            setFeaturedProducts(products.filter(p => p.featured));
        });
    }, []);

    return (
        <>
            <Hero />
            <div className="bg-black relative z-10">
                <ProductGrid products={featuredProducts} title="Featured Collections" />

                {/* Marketing / About Section */}
                <section className="py-20 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-4 text-center max-w-2xl">
                        <h2 className="text-3xl font-playfair text-gold mb-6">Handcrafted in Ghana</h2>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Scented by DDSD brings you an exquisite selection of home fragrances.
                            Each product is thoughtfully designed to elevate your sensory experience,
                            blending modern aesthetics with timeless aromas.
                        </p>
                        <img
                            src={IMAGES.allprod1}
                            alt="Atelier"
                            className="w-full h-auto opacity-80 rounded"
                            loading="lazy"
                        />
                    </div>
                </section>
            </div>
        </>
    );
};
