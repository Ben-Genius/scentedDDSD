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
            <section id="collection" className="max-w-[115rem]  mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                {/* Header Section - Responsive */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-12 lg:mb-16 gap-4 sm:gap-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair">Signature Sets</h2>

                    {/* Responsive Tab Switcher - Horizontal Scroll on Mobile */}
                    <div className="flex w-full md:w-auto overflow-x-auto pb-2 md:pb-0 gap-1 md:gap-1 md:bg-black/5 md:p-1 md:rounded-full scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                        {['all', 'relaxation', 'romantic', 'luxury'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat as typeof activeCategory)}
                                className={`px-4 sm:px-5 md:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all whitespace-nowrap flex-shrink-0 ${activeCategory === cat
                                    ? 'bg-black text-white md:bg-white md:shadow-sm md:text-black'
                                    : 'text-black/60 bg-black/5 md:bg-transparent md:text-black/40 hover:text-black active:bg-black/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>


                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 sm:gap-4 md:h-[700px] lg:h-[900px]"
                >
                    {filteredBundles.map((bundle) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4 }}
                            key={bundle.id}
                            className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 transition-colors min-h-[350px] sm:min-h-[400px] md:min-h-0 ${bundle.gridArea || 'md:col-span-1 md:row-span-1'
                                } ${
                                // Make luxury bundle span 2 columns on tablet as well
                                bundle.id === 'bundle-4' ? 'sm:col-span-2' : ''
                                }`}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={bundle.image}
                                    alt={bundle.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:from-black/60 md:via-transparent opacity-80 md:opacity-60" />
                            </div>

                            {/* Content Layout - Responsive Padding */}
                            <div className="absolute inset-0 z-10 p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between text-white">
                                {/* Top Section - Badge & Cart Button */}
                                <div className="flex justify-between items-start">
                                    {bundle.badge ? (
                                        <span className="px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur border border-white/20 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                                            {bundle.badge}
                                        </span>
                                    ) : <span></span>}

                                    <button
                                        onClick={() => handleAddPrebuiltBundle(bundle)}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-black transition-colors active:scale-95"
                                        aria-label={`Add ${bundle.name} to cart`}
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Bottom Section - Content (Always visible on mobile, hover on desktop) */}
                                <div className="transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2 block">
                                        {bundle.tagline}
                                    </span>
                                    <h3 className={`font-playfair leading-tight mb-2 sm:mb-3 ${bundle.gridArea?.includes('col-span-2')
                                        ? 'text-2xl sm:text-3xl md:text-4xl'
                                        : 'text-xl sm:text-2xl'
                                        }`}>
                                        {bundle.name}
                                    </h3>

                                    {/* Description & Pricing - Always visible on mobile, hover on desktop */}
                                    <div className="h-auto md:h-0 md:group-hover:h-auto overflow-visible md:overflow-hidden opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:delay-75">
                                        <p className="text-white/90 md:text-white/80 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                                            {bundle.description}
                                        </p>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <span className="text-base sm:text-lg font-medium">
                                                {formatMoney(bundle.price)}
                                            </span>
                                            <span className="text-xs sm:text-sm text-white/50 line-through">
                                                {formatMoney(bundle.originalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

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