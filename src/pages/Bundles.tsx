import React, { useEffect, useState } from 'react';
import { BundleBuilder } from '../components/BundleBuilder';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { Gift, Sparkles, Heart, Star, ShoppingBag, ArrowRight, Check, Layers, PenLine, Truck, Workflow, Group } from 'lucide-react';
import { IMAGES } from '../assets';

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
}

export const Bundles = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<'all' | 'relaxation' | 'romantic' | 'energizing' | 'luxury'>('all');

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const prebuiltBundles: PrebuiltBundle[] = [
        {
            id: 'bundle-1',
            name: 'The Relaxation Sanctuary',
            description: 'Transform your space into a peaceful retreat with our calming collection',
            tagline: 'Unwind & Restore',
            price: 450.00,
            originalPrice: 580.00,
            savings: 130.00,
            image: IMAGES.scentedcandle, // Placeholder mapping
            items: ['Lavender Calm Candle (Grande)', 'Eucalyptus Reed Diffuser (Classic)', 'Lavender Essential Oil (50ml)', 'Ceramic Oil Burner (Home)'],
            badge: 'Best Seller',
            category: 'relaxation'
        },
        {
            id: 'bundle-2',
            name: 'Romantic Evening Collection',
            description: 'Set the mood for intimate moments with luxurious rose and champagne notes',
            tagline: 'Romance & Elegance',
            price: 520.00,
            originalPrice: 680.00,
            savings: 160.00,
            image: IMAGES.roseapple,
            items: ['Royal English Rose Candle (Luxe)', 'Champagne Blossom Shower Gel (Classic)', 'Rose Essential Oil (50ml)', 'Gold-Accent Glass Burner (Grande)'],
            badge: 'Premium',
            category: 'romantic'
        },
        {
            id: 'bundle-3',
            name: 'Tropical Paradise Escape',
            description: 'Bring the vibrant energy of the tropics into your home',
            tagline: 'Fresh & Invigorating',
            price: 380.00,
            originalPrice: 500.00,
            savings: 120.00,
            image: IMAGES.diffcocktail,
            items: ['Pineapple Candle (Classic)', 'Tropical Muse Shower Gel (Family)', 'Citrus Luxe Hand Gel (Grande)', 'Melon Fields Diffuser'],
            category: 'energizing'
        },
        {
            id: 'bundle-4',
            name: 'The Luxury Signature Set',
            description: 'Our most exclusive collection featuring rare Oud and Amber notes',
            tagline: 'Ultimate Indulgence',
            price: 850.00,
            originalPrice: 1100.00,
            savings: 250.00,
            image: IMAGES.artifact1,
            items: ['Midnight Oud Candle (Signature Luxe)', 'Amber Noir Shower Gel (Premium)', 'Oud Essential Oil (100ml)', 'Marble-Look Burner (Decor)', 'Vanilla Hand Gel (Luxe)'],
            badge: 'Limited Edition',
            category: 'luxury'
        },
        {
            id: 'bundle-5',
            name: 'The Daily Essentials',
            description: 'Everything you need for your everyday self-care routine',
            tagline: 'Everyday Luxury',
            price: 320.00,
            originalPrice: 420.00,
            savings: 100.00,
            image: IMAGES.soap,
            items: ['Vanilla Silk Hand Gel (Classic)', 'Lavender Calm Shower Gel (Classic)', 'Citrus Air Freshener', 'Mini Burner'],
            category: 'relaxation'
        },
        {
            id: 'bundle-6',
            name: 'The Gift of Fragrance',
            description: 'Perfect gift set for loved ones who appreciate fine scents',
            tagline: 'Thoughtfully Curated',
            price: 420.00,
            originalPrice: 550.00,
            savings: 130.00,
            image: IMAGES.allprod1,
            items: ['Hawaii Sunset Candle (Grande)', 'Royal English Rose Diffuser', 'Strawberry Muse Oil (50ml)', 'Decorative Potpourri'],
            badge: 'Gift Ready',
            category: 'romantic'
        }
    ];

    const filteredBundles = activeCategory === 'all'
        ? prebuiltBundles
        : prebuiltBundles.filter(b => b.category === activeCategory);

    const benefits = [
        {
            icon: <Gift className="w-6 h-6" />,
            title: 'Save Up to 25%',
            description: 'Bundles offer significant savings compared to individual purchases'
        },
        {
            icon: <Group className="w-6 h-6" />,
            title: 'Curated Collections',
            description: 'Expertly paired scents for a harmonious experience'
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: 'Gift Ready',
            description: 'Beautiful packaging perfect for gifting or treating yourself'
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: 'Premium Quality',
            description: 'Hand-poured and handcrafted with the finest ingredients'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black font-inter">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={IMAGES.hero}
                        alt="Bundles Hero"
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
                </div>

                {/* Gold Glow Effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] mix-blend-screen"></div>

                <div className="container mx-auto px-4 relative z-10 h-full flex flex-col items-center justify-center text-center">
                    <div className="inline-block mb-6 animate-fade-in-up">
                        <span className="bg-white/5 border border-gold/40 text-gold text-xs font-bold px-6 py-2 rounded-full uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_15px_rgba(183,133,43,0.3)]">
                            Curated Luxury Sets
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6 leading-tight animate-fade-in-up delay-100 drop-shadow-xl">
                        Discover Our Signature <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7852B] via-[#EBC16E] to-[#B7852B] animate-shimmer bg-[size:200%_auto]">Gift Bundles</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
                        Thoughtfully curated collections that bring harmony to your space.
                        Build your own custom bundle or choose from our expertly paired sets.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-300">
                        <a href="#custom-builder" className="group relative px-8 py-4 bg-gold text-black font-medium text-sm tracking-widest uppercase rounded overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                <Workflow className="w-4 h-4" /> Build Your Own
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                        </a>
                        <a href="#signature-sets" className="group px-8 py-4 border border-white/30 text-white font-medium text-sm tracking-widest uppercase hover:bg-white/10 hover:border-gold/50 transition-all rounded backdrop-blur-sm">
                            <span className="flex items-center gap-2">
                                <Gift className="w-4 h-4" /> View Collections
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="relative z-20 -mt-20 container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl hover:border-gold/40 transition-all duration-500 group shadow-2xl">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                                <div className="text-gold">
                                    {benefit.icon}
                                </div>
                            </div>
                            <h3 className="text-white  mb-3 text-lg font-inter">{benefit.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Bundle Builder */}
            <div id="custom-builder" className="container mx-auto px-4 py-20 border-t border-white/5 relative">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">Create Your <span className="text-gold">Custom Bundle</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        Mix and match your favorite products to create a personalized collection.
                        Save more when you bundle multiple items together.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-1 md:p-8">
                    <BundleBuilder availableProducts={products} />
                </div>

                {/* Bundle Discount Tiers */}
                <div className="mt-16 bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] border border-gold/20 rounded-2xl p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-playfair text-gold mb-10 text-center">Bundle Savings Guide</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { discount: '10%', items: '3-4 Items', color: 'text-white' },
                                { discount: '15%', items: '5-6 Items', color: 'text-gold' },
                                { discount: '20%', items: '7+ Items', color: 'text-gold' }
                            ].map((tier, i) => (
                                <div key={i} className="text-center p-6 bg-black/50 rounded-xl border border-white/5 hover:border-gold/30 transition-colors">
                                    <div className={`text-4xl font-bold ${tier.color} mb-3 font-playfair`}>{tier.discount} OFF</div>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">{tier.items}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Signature Sets Section */}
            <div id="signature-sets" className="bg-[#050505] py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Our Collections</span>
                        <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">Signature Gift Sets</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                            Expertly curated sets designed to create the perfect ambiance for any occasion
                        </p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {[
                                { id: 'all', label: 'All Collections' },
                                { id: 'relaxation', label: 'Relaxation' },
                                { id: 'romantic', label: 'Romantic' },
                                { id: 'energizing', label: 'Energizing' },
                                { id: 'luxury', label: 'Luxury' }
                            ].map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id as any)}
                                    className={`px-6 py-3 text-xs uppercase tracking-widest font-medium rounded transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-gold text-black shadow-[0_0_15px_rgba(183,133,43,0.4)]'
                                        : 'bg-transparent border border-white/20 text-gray-400 hover:border-gold hover:text-gold'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bundles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredBundles.map((bundle) => (
                            <div
                                key={bundle.id}
                                className="group relative bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10"
                            >
                                {/* Badge */}
                                {bundle.badge && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-black/90 backdrop-blur text-gold border border-gold/30 text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-lg">
                                            {bundle.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Loading state placeholder */}
                                    <img
                                        src={bundle.image}
                                        alt={bundle.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>

                                    {/* Quick action button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                        <button
                                            onClick={() => setSelectedBundle(bundle.id)}
                                            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-gold text-black px-6 py-3 rounded font-bold uppercase tracking-wider text-xs hover:bg-white"
                                        >
                                            Quick View
                                        </button>
                                    </div>

                                    {/* Savings Badge */}
                                    <div className="absolute bottom-4 right-4 z-10">
                                        <div className="bg-black/80 backdrop-blur border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">
                                            Save {formatMoney(bundle.savings)}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="mb-6">
                                        <p className="text-gold/80 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">
                                            {bundle.tagline}
                                        </p>
                                        <h3 className="text-2xl font-playfair text-white mb-3 group-hover:text-gold transition-colors leading-tight">
                                            {bundle.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                            {bundle.description}
                                        </p>
                                    </div>

                                    {/* Items List */}
                                    <div className="mb-6 space-y-3 bg-white/5 p-4 rounded-lg border border-white/5">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 border-b border-white/10 pb-2">
                                            Package Contents
                                        </p>
                                        <div className="space-y-2">
                                            {bundle.items.slice(0, 3).map((item, index) => (
                                                <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                                                    <Check className="w-3 h-3 text-gold flex-shrink-0 mt-0.5" />
                                                    <span className="line-clamp-1">{item}</span>
                                                </div>
                                            ))}
                                            {bundle.items.length > 3 && (
                                                <p className="text-xs text-gold/70 pl-5 italic">+ {bundle.items.length - 3} more items</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 line-through text-xs mb-0.5">
                                                {formatMoney(bundle.originalPrice)}
                                            </span>
                                            <span className="text-2xl font-bold text-white font-playfair">
                                                {formatMoney(bundle.price)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => setSelectedBundle(bundle.id)}
                                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-colors"
                                            aria-label="Add to cart"
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-black py-24 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-playfair text-white mb-4">How It Works</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto font-light">
                            Create the perfect gift in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { icon: <Layers className="w-8 h-8" />, title: 'Choose Collection', desc: 'Select a pre-curated bundle or build your own custom set' },
                            { icon: <PenLine className="w-8 h-8" />, title: 'Personalize', desc: 'Add a personal message and choose premium gift packaging' },
                            { icon: <Truck className="w-8 h-8" />, title: 'Fast Delivery', desc: 'We\'ll deliver your beautifully packaged bundle ready to gift' }
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-full mb-6 relative">
                                    <span className="text-gold group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                                    <div className="absolute inset-0 border border-gold/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide font-playfair">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#080808] border-t border-gold/20 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <ShoppingBag className="w-12 h-12 text-gold mx-auto mb-6 opacity-80" />
                    <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
                        Can't Decide?
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg font-light">
                        Our fragrance experts can help you choose the perfect bundle for any occasion.
                        Contact us for personalized recommendations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="/contact" className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm rounded hover:bg-white transition-colors">
                            Contact Support
                        </a>
                        <a href="/products" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded hover:bg-white/10 transition-colors">
                            Browse Catalog
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};