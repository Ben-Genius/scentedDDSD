import React, { useEffect, useState } from 'react';
import { BundleBuilder } from '../components/BundleBuilder';
import { useInventory } from '../hooks/useInventory';
import { Product } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { ShoppingBag, Check } from 'lucide-react';
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
        {
            id: 'bundle-4', // Luxury Set - Large Featured Item
            name: 'The Luxury Signature Collection',
            description: 'Our most exclusive collection featuring rare Oud and Amber notes. An indulgence for the senses.',
            tagline: 'Ultimate Indulgence',
            price: 850.00,
            originalPrice: 1100.00,
            savings: 250.00,
            image: IMAGES.artifact1,
            items: ['Midnight Oud Candle', 'Amber Noir Gel', 'Oud Oil (100ml)', 'Marble Burner'],
            badge: 'Limited Edition',
            category: 'luxury',
            gridArea: 'md:col-span-2 md:row-span-2'
        },
        {
            id: 'bundle-1',
            name: 'Relaxation Sanctuary',
            description: 'Transform your space into a peaceful retreat.',
            tagline: 'Unwind & Restore',
            price: 450.00,
            originalPrice: 580.00,
            savings: 130.00,
            image: IMAGES.scentedcandle,
            items: ['Lavender Candle', 'Eucalyptus Diffuser'],
            category: 'relaxation',
            gridArea: 'md:col-span-1 md:row-span-1'
        },
        {
            id: 'bundle-2',
            name: 'Romantic Evening',
            description: 'Set the mood for intimate moments.',
            tagline: 'Romance',
            price: 520.00,
            originalPrice: 680.00,
            savings: 160.00,
            image: IMAGES.roseapple,
            items: ['Rose Candle', 'Champagne Gel'],
            badge: 'Premium',
            category: 'romantic',
            gridArea: 'md:col-span-1 md:row-span-1'
        },
        {
            id: 'bundle-3',
            name: 'Tropical Paradise',
            description: 'Vibrant energy of the tropics.',
            tagline: 'Fresh',
            price: 380.00,
            originalPrice: 500.00,
            savings: 120.00,
            image: IMAGES.diffcocktail,
            items: ['Pineapple Candle', 'Tropical Gel'],
            category: 'energizing',
            gridArea: 'md:col-span-1 md:row-span-1'
        },
        {
            id: 'bundle-5',
            name: 'Daily Essentials',
            description: 'Everyday self-care routine.',
            tagline: 'Everyday',
            price: 320.00,
            originalPrice: 420.00,
            savings: 100.00,
            image: IMAGES.soap,
            items: ['Vanilla Gel', 'Lavender Gel'],
            category: 'relaxation',
            gridArea: 'md:col-span-1 md:row-span-1'
        }
    ];

    const filteredBundles = activeCategory === 'all'
        ? prebuiltBundles
        : prebuiltBundles.filter(b => b.category === activeCategory);

    return (
        <div className="min-h-screen bg-champagne-50 text-black font-inter selection:bg-gold selection:text-white pb-32">

            {/* 1. New Hero Section (Inspiration from User) */}
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

            {/* 2. Marquee Divider */}
            <div className="py-6 border-b border-black/5 bg-white overflow-hidden whitespace-nowrap">
                <div className="inline-flex animate-marquee">
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className="text-6xl mx-12 font-playfair italic text-black/5 font-bold uppercase">
                            Hand Poured • Luxury • Sustainable •
                        </span>
                    ))}
                </div>
            </div>

            {/* 3. Bento Grid Collection */}
            <section id="collection" className="container mx-auto px-4 py-24">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-5xl font-playfair">Signature Sets</h2>

                    {/* Minimalist Tab Switcher */}
                    <div className="hidden md:flex gap-1 bg-black/5 p-1 rounded-full">
                        {['all', 'relaxation', 'romantic', 'luxury'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat as any)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${activeCategory === cat ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[900px]">
                    {filteredBundles.map((bundle) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            key={bundle.id}
                            className={`group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 transition-colors ${bundle.gridArea || 'md:col-span-1 md:row-span-1'}`}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content Layout */}
                            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    {bundle.badge ? (
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {bundle.badge}
                                        </span>
                                    ) : <span></span>}

                                    <button
                                        onClick={() => handleAddPrebuiltBundle(bundle)}
                                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 block">{bundle.tagline}</span>
                                    <h3 className={`font-playfair leading-tight mb-2 ${bundle.gridArea?.includes('col-span-2') ? 'text-4xl' : 'text-2xl'}`}>
                                        {bundle.name}
                                    </h3>
                                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                                        <p className="text-white/80 text-sm mb-4 line-clamp-2">{bundle.description}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-medium">{formatMoney(bundle.price)}</span>
                                            <span className="text-sm text-white/50 line-through">{formatMoney(bundle.originalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 4. Interactive Bundle Builder Sections */}
            <div id="custom-builder" className="py-24 bg-white border-t border-black/5">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <span className="text-gold text-xs font-bold uppercase tracking-widest mb-4 block">Personalized</span>
                        <h2 className="text-5xl font-playfair mb-6">Build Your Own</h2>
                        <p className="max-w-2xl mx-auto text-lg text-black/60 font-light">Create a custom collection tailored to your preferences.</p>
                    </div>

                    <BundleBuilder availableProducts={products} />
                </div>
            </div>
        </div>
    );
};