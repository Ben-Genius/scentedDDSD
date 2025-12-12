import React, { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import { Product, ProductVariant } from '../types';
import { formatMoney } from '../utils/formatMoney';
import {
    Sparkles,
    Star,
    Clock,
    TrendingUp,
    Filter,
    X,
    ShoppingCart,
    ArrowRight,
    Gift,
    Bell,
    Instagram,
    ChevronDown,
    Check,
    Zap,
    Facebook,
    MessageCircle,
    Music
} from 'lucide-react';

export const NewArrivals = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);

    // Filters
    const [showFilters, setShowFilters] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [scentFilter, setScentFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    // Email capture
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    useEffect(() => {
        getProducts().then((prods) => {
            // Filter only new products - assuming "new" means recent additions or distinct by some flag
            // For now, we take the first 12 as "New Arrivals" or filter by featured
            const newProducts = prods.filter(p => p.featured || p.stock > 0).slice(0, 12);
            setProducts(newProducts);
            setFilteredProducts(newProducts);
        });
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }

        // Price filter
        filtered = filtered.filter(p => {
            const price = p.basePrice;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case 'newest':
                // Already in newest order from API usually
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case 'popular':
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        setFilteredProducts(filtered);
    }, [categoryFilter, scentFilter, sortBy, priceRange, products]);

    const openQuickAdd = (product: Product) => {
        setActiveProduct(product);
        setSelectedVariant(product.variants[0] || null);
        setQuantity(1);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setTimeout(() => setActiveProduct(null), 300);
    };

    const handleAddToCart = () => {
        // Add to cart logic placeholder
        console.log('Adding to cart:', {
            product: activeProduct,
            variant: selectedVariant,
            quantity
        });

        // Show success animation
        closeDrawer();
        // You could show a toast notification here
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle email subscription
        console.log('Email submitted:', email);
        setEmailSubmitted(true);
        setTimeout(() => {
            setEmail('');
            setEmailSubmitted(false);
        }, 3000);
    };

    const currentPrice = selectedVariant?.priceGHS || activeProduct?.basePrice || 0;

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-black via-gold/10 to-black border-b border-gold/20">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-gold" />
                            <span className="text-gold text-xs font-bold uppercase tracking-wider">
                                Fresh Arrivals
                            </span>
                            <Clock className="w-4 h-4 text-gold" />
                        </div>

                        {/* Hero Title */}
                        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6 leading-tight">
                            Discover What's
                            <span className="block text-gold mt-2">New at Scented by DDSD</span>
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                            Handcrafted luxury fragrances, freshly launched this season.
                            From calming lavender to exotic oud, explore our latest creations.
                        </p>

                        {/* Hero CTAs */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <a
                                href="#products"
                                className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 font-bold uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-all transform hover:scale-105"
                            >
                                Shop New Arrivals
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 font-bold uppercase tracking-wider rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                                Filter Products
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-gold" />
                                <span className="text-gray-400">12 New Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-gold" />
                                <span className="text-gray-400">Limited Edition Items</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Gift className="w-5 h-5 text-gold" />
                                <span className="text-gray-400">Free Shipping Over GHS 200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-6 h-6 text-gold" />
                </div>
            </div>

            {/* Filters & Sorting Bar */}
            <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Product Count */}
                        <div className="text-gray-400 text-sm">
                            <span className="text-white font-semibold">{filteredProducts.length}</span> Products
                        </div>

                        {/* Filter & Sort Controls */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Category Filter */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white px-4 py-2 rounded-lg text-sm outline-none focus:border-gold transition-colors"
                            >
                                <option value="all">All Categories</option>
                                <option value="candles">Candles</option>
                                <option value="diffusers">Diffusers</option>
                                <option value="oils">Essential Oils</option>
                                <option value="hand-gel">Hand Gel</option>
                                <option value="shower-gel">Shower Gel</option>
                            </select>

                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white px-4 py-2 rounded-lg text-sm outline-none focus:border-gold transition-colors"
                            >
                                <option value="newest">Newest First</option>
                                <option value="popular">Most Popular</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>

                            {/* Advanced Filters Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showFilters
                                    ? 'bg-gold text-black'
                                    : 'bg-white/5 border border-white/20 text-white hover:border-gold'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                                    Scent Family
                                </label>
                                <select
                                    value={scentFilter}
                                    onChange={(e) => setScentFilter(e.target.value)}
                                    className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 rounded-lg text-sm outline-none focus:border-gold"
                                >
                                    <option value="all">All Scents</option>
                                    <option value="floral">Floral</option>
                                    <option value="citrus">Citrus</option>
                                    <option value="woody">Woody</option>
                                    <option value="fresh">Fresh</option>
                                    <option value="oriental">Oriental</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                                    Price Range (GHS)
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 rounded-lg text-sm outline-none focus:border-gold"
                                        placeholder="Min"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 rounded-lg text-sm outline-none focus:border-gold"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setCategoryFilter('all');
                                        setScentFilter('all');
                                        setPriceRange([0, 1000]);
                                    }}
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 rounded-lg text-sm hover:border-gold transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div id="products" className="container mx-auto px-4 py-12">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No products match your filters</p>
                        <button
                            onClick={() => {
                                setCategoryFilter('all');
                                setScentFilter('all');
                                setPriceRange([0, 1000]);
                            }}
                            className="mt-4 text-gold hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                onQuickAdd={() => openQuickAdd(product)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Email Capture Section */}
            <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <Bell className="w-12 h-12 text-gold mx-auto mb-4" />
                        <h2 className="text-3xl font-playfair text-white mb-3">
                            Be First to Know
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Get notified about new drops and exclusive early access.
                            Plus, enjoy <span className="text-gold font-semibold">10% off</span> your first order.
                        </p>

                        {emailSubmitted ? (
                            <div className="flex items-center justify-center gap-2 text-green-400">
                                <Check className="w-5 h-5" />
                                <span>Thank you! Check your email for your discount code.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 bg-white/5 border border-white/20 text-white px-4 py-3 rounded-lg outline-none focus:border-gold transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="bg-gold text-black px-6 py-3 font-bold uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-colors whitespace-nowrap"
                                >
                                    Get 10% Off
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Social Proof / UGC Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Instagram className="w-5 h-5 text-gold" />
                        <h2 className="text-2xl font-playfair text-white">Shop The Look</h2>
                    </div>
                    <p className="text-gray-400">See how our community is styling their spaces</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Facebook */}
                    <a
                        href="https://web.facebook.com/people/ScentedBy-Ddsd/pfbid02asCf1ubE6Pmmtxk2LVcLkSae1NivtRs6hnjuBLkDze2jYGbLPQ1upZ6f3mBNRkixl/?mibextid=2JQ9oc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square bg-[#1877F2]/10 rounded-lg overflow-hidden group cursor-pointer border border-[#1877F2]/20 hover:border-[#1877F2] transition-colors"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Facebook className="w-12 h-12 text-[#1877F2]" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Follow Us</span>
                        </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://api.whatsapp.com/send/?phone=233257087042&text&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square bg-[#25D366]/10 rounded-lg overflow-hidden group cursor-pointer border border-[#25D366]/20 hover:border-[#25D366] transition-colors"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MessageCircle className="w-12 h-12 text-[#25D366]" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Chat with Us</span>
                        </div>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/scented_by_ddsd_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square bg-[#E4405F]/10 rounded-lg overflow-hidden group cursor-pointer border border-[#E4405F]/20 hover:border-[#E4405F] transition-colors"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Instagram className="w-12 h-12 text-[#E4405F]" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Follow Us</span>
                        </div>
                    </a>

                    {/* TikTok */}
                    <a
                        href="https://www.tiktok.com/@scentedbyddsd?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square bg-[#000000]/30 rounded-lg overflow-hidden group cursor-pointer border border-white/20 hover:border-white transition-colors"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* TikTok doesn't have a direct Lucide icon often, using Video or a path if needed, or stick to Video/Music for now since I can't import custom svgs easily here without creating files. Using Music for now. */}
                            <Music className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Watch Videos</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Quick Add Drawer */}
            {drawerOpen && activeProduct && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={closeDrawer}
                    />

                    {/* Drawer */}
                    <aside className="relative w-full md:w-[480px] bg-[#111] border-l border-white/20 overflow-y-auto animate-slide-in-right">
                        {/* Header */}
                        <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex items-center justify-between z-10">
                            <h3 className="text-xl font-playfair text-gold">Quick Add</h3>
                            <button
                                onClick={closeDrawer}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Product Image & Info */}
                            <div className="flex gap-4">
                                <div className="w-32 h-32 bg-black rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={activeProduct.images.default}
                                        alt={activeProduct.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    {activeProduct.featured && (
                                        <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs px-2 py-1 rounded mb-2 uppercase tracking-wider">
                                            New Arrival
                                        </span>
                                    )}
                                    <h4 className="text-white font-bold text-lg mb-1">
                                        {activeProduct.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm mb-2">
                                        {activeProduct.description}
                                    </p>
                                    <div className="flex items-center gap-1 text-gold text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                        <span className="text-gray-400 ml-1">(48 reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Display */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-baseline gap-3">
                                    <div className="text-3xl font-bold text-gold">
                                        {formatMoney(currentPrice * quantity)}
                                    </div>
                                </div>
                            </div>

                            {/* Size Selector */}
                            {activeProduct.variants.length > 0 && (
                                <div>
                                    <label className="block text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
                                        Select Size
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {activeProduct.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`p-4 rounded-lg border-2 transition-all text-left ${selectedVariant?.id === variant.id
                                                    ? 'border-gold bg-gold/10'
                                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                                                    }`}
                                            >
                                                <div className="font-semibold text-white mb-1">
                                                    {variant.label}
                                                </div>
                                                <div className="text-gold text-sm font-bold">
                                                    {formatMoney(variant.priceGHS)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 bg-white/5 border border-white/20 rounded-lg hover:border-gold transition-colors"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-20 bg-white/5 border border-white/20 text-white text-center py-2 rounded-lg outline-none focus:border-gold"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 bg-white/5 border border-white/20 rounded-lg hover:border-gold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Product Features */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-gold" />
                                    <span>Hand-poured in Accra, Ghana</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-gold" />
                                    <span>Premium soy blend wax</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-gold" />
                                    <span>Long-lasting fragrance</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-gold" />
                                    <span>Free shipping over GHS 200</span>
                                </div>
                            </div>

                            {/* Cross-sell */}
                            <div className="border-t border-white/10 pt-6">
                                <p className="text-gray-400 text-sm mb-3">Frequently bought together:</p>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                                    <div className="w-12 h-12 bg-black rounded"></div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">Matching Oil Diffuser</p>
                                        <p className="text-gold text-xs">+ {formatMoney(89.99)}</p>
                                    </div>
                                    <button className="text-xs text-gold hover:underline">Add</button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="sticky bottom-0 bg-[#111] border-t border-white/10 p-6 space-y-3">
                            <button
                                onClick={handleAddToCart}
                                className="w-full flex items-center justify-center gap-2 bg-gold text-black py-4 font-bold uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-all transform hover:scale-[1.02]"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="w-full bg-white/5 border border-white/20 text-white py-4 font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

// Product Card Component
const ProductCard = ({ product, index, onQuickAdd }: { product: Product; index: number; onQuickAdd: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animationDelay: `${index * 50}ms`
            }}
        >
            {/* Image Container */}
            <div className="relative aspect-square bg-gradient-to-br from-gold/10 to-black overflow-hidden">
                <img
                    src={product.images.default}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* NEW Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        New
                    </span>
                </div>

                {/* Limited Stock Badge */}
                {product.stock < 5 && product.stock > 0 && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            Only {product.stock} left
                        </span>
                    </div>
                )}

                {/* Quick Add Button */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={onQuickAdd}
                        className="bg-gold/90 backdrop-blur-sm text-black px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gold transition-colors shadow-xl"
                    >
                        Quick Add
                    </button>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-2">
                    <p className="text-gold text-xs uppercase tracking-wider font-medium">
                        {product.category}
                    </p>
                </div>

                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                    {product.title}
                </h3>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                    <span className="text-gray-500 text-xs ml-1">(24)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between">
                    <div>
                        <span className="text-xs text-gray-500 mr-2">From</span>
                        <span className="text-gold font-bold text-lg">
                            {formatMoney(product.basePrice)}
                        </span>
                    </div>
                    <button
                        onClick={onQuickAdd}
                        className="text-gold hover:text-gold/70 transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </article>
    );
};
