import React, { useState } from 'react';
import { BundleBuilder } from '../components/BundleBuilder';
import { useInventory } from '../hooks/useInventory';
import { formatMoney } from '../utils/formatMoney';
import { ShoppingBag } from 'lucide-react';
import { useLocalCart } from '../hooks/useLocalCart';
import { IMAGES } from '../assets';
import { motion } from 'motion/react';
import { BundlesHero } from '../components/BundlesHero';

interface PrebuiltBundle {
    id: string;
    name: string;
    description: string;
    tagline: string;
    price: number;
    originalPrice: number;
    savings: number;
    image: string;
    items: string[];
    badge?: string;
    category: 'relaxation' | 'romantic' | 'energizing' | 'luxury';
    gridArea?: string; // For Bento Grid
}

export const Bundles = () => {
    const { products } = useInventory();
    const { addItem } = useLocalCart();
    const [activeCategory, setActiveCategory] = useState<'all' | 'relaxation' | 'romantic' | 'energizing' | 'luxury'>('all');

    const handleAddPrebuiltBundle = (bundle: PrebuiltBundle) => {
        let addedCount = 0;
        bundle.items.forEach(itemName => {
            // Fuzzy match logic or direct match
            const product = products.find(p => p.title.includes(itemName) || itemName.includes(p.title));
            if (product) {
                addItem(product, product.variants[0], undefined, product.scents[0], undefined, 1);
                addedCount++;
            }
        });

        if (addedCount > 0) {
            alert(`Added ${bundle.name} to cart!`);
        } else {
            alert("Could not find items for this bundle in inventory.");
        }
    };

    const prebuiltBundles: PrebuiltBundle[] = [
        // {
        //     id: 'bundle-4', // Luxury Set - Large Featured Item
        //     name: 'The Luxury Signature Collection',
        //     description: 'Our most exclusive collection featuring rare Oud and Amber notes. An indulgence for the senses.',
        //     tagline: 'Ultimate Indulgence',
        //     price: 850.00,
        //     originalPrice: 1100.00,
        //     savings: 250.00,
        //     image: IMAGES.artifact1,
        //     items: ['Midnight Oud Candle', 'Amber Noir Gel', 'Oud Oil (100ml)', 'Marble Burner'],
        //     badge: 'Limited Edition',
        //     category: 'luxury',
        //     gridArea: 'md:col-span-2 md:row-span-2'
        // },
        // {
        //     id: 'bundle-1',
        //     name: 'Relaxation Sanctuary',
        //     description: 'Transform your space into a peaceful retreat.',
        //     tagline: 'Unwind & Restore',
        //     price: 450.00,
        //     originalPrice: 580.00,
        //     savings: 130.00,
        //     image: IMAGES.scentedcandle,
        //     items: ['Lavender Candle', 'Eucalyptus Diffuser'],
        //     category: 'relaxation',
        //     gridArea: 'md:col-span-1 md:row-span-1'
        // },
        // {
        //     id: 'bundle-2',
        //     name: 'Romantic Evening',
        //     description: 'Set the mood for intimate moments.',
        //     tagline: 'Romance',
        //     price: 520.00,
        //     originalPrice: 680.00,
        //     savings: 160.00,
        //     image: IMAGES.roseapple,
        //     items: ['Rose Candle', 'Champagne Gel'],
        //     badge: 'Premium',
        //     category: 'romantic',
        //     gridArea: 'md:col-span-1 md:row-span-1'
        // },
        // {
        //     id: 'bundle-3',
        //     name: 'Tropical Paradise',
        //     description: 'Vibrant energy of the tropics.',
        //     tagline: 'Fresh',
        //     price: 380.00,
        //     originalPrice: 500.00,
        //     savings: 120.00,
        //     image: IMAGES.diffcocktail,
        //     items: ['Pineapple Candle', 'Tropical Gel'],
        //     category: 'energizing',
        //     gridArea: 'md:col-span-1 md:row-span-1'
        // },
        // {
        //     id: 'bundle-5',
        //     name: 'Daily Essentials',
        //     description: 'Everyday self-care routine.',
        //     tagline: 'Everyday',
        //     price: 320.00,
        //     originalPrice: 420.00,
        //     savings: 100.00,
        //     image: IMAGES.scentedcandle,
        //     items: ['Vanilla Gel', 'Lavender Gel'],
        //     category: 'relaxation',
        //     gridArea: 'md:col-span-1 md:row-span-1'
        // }
    ];

    const filteredBundles = activeCategory === 'all'
        ? prebuiltBundles
        : prebuiltBundles.filter(b => b.category === activeCategory);

    return (
        <div className="min-h-screen bg-champagne-50 text-black font-inter selection:bg-gold selection:text-white pb-16 sm:pb-24 md:pb-32">

            {/* 1. Hero Section */}
            <BundlesHero
                logo={{
                    url: "", // No logo needed here, simpler
                    alt: "Scented by DDSD",
                    text: "Scented by DDSD"
                }}
                slogan="Handcrafted Luxury Scents"
                title={
                    <>
                        Curated <br />
                        <span className="text-gold italic">Collections</span>
                    </>
                }
                subtitle="Experience the art of fragrance layering. Our signature bundles are thoughtfully paired to transform your space."
                callToAction={{
                    text: "Explore Sets",
                    href: "#collection"
                }}
                backgroundImage={IMAGES.bundle}
                contactInfo={{
                    website: "Free Shipping",
                    phone: "Satisfaction Guaranteed",
                    address: "Eco-Friendly"
                }}
            />

            {/* 3. Bento Grid Collection - Fully Responsive */}
           

            {/* 4. Interactive Bundle Builder Section - Responsive */}
            <div id="custom-builder" className="py-16 sm:py-20 md:py-24 bg-white border-t border-black/5">
                <div className="max-w-[115rem] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header - Responsive */}
                    <div className="mb-10 sm:mb-12 md:mb-16 text-center">
                        <span className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 block">
                            Personalized
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4 sm:mb-6">
                            Build Your Own
                        </h2>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-black/60 font-light px-4">
                            Create a custom collection tailored to your preferences.
                        </p>
                    </div>

                    <BundleBuilder availableProducts={products} />
                </div>
            </div>
        </div>
    );
};