import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { MarketingMarquee } from '../components/MarketingMarquee';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import { IMAGES } from '@/assets';
import FeatureSection from '@/components/Featured';
import { NewArrivals } from '../components/NewArrivals';
import { SimpleNewArrivals } from '../components/SimpleNewArrivals';
import { Testimonials } from '../components/Testimonials';

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

                <MarketingMarquee />

                <SimpleNewArrivals />

                <div className='flex flex-col items-center justify-center text-center mt-12'>
                    <span className="block text-gold text-xs uppercase tracking-[0.4em]  font-inter">
                        Holiday Exclusive
                    </span>

                    <h2 className="text-4xl md:text-5xl font-playfair text-white mb-2 leading-tight">
                        Christmas Sale  <br />

                        <span className="mt-3 block text-gold text-sm uppercase tracking-[0.4em] mb-4 font-inter">Ends In</span>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />

                    </h2>

                </div>
                <FeatureSection />
                <Testimonials />

            </div>
        </>
    );
};
