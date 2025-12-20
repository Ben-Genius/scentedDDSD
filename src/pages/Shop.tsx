import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../lib/api';
import { Product, ProductVariant } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { IMAGES } from '@/assets';
import {
    Filter,
    X,
    ShoppingCart,
    Search,
    Facebook,
    MessageCircle,
    Music,
    Instagram,
    Check,
    Star,
    Heart,
    ChevronDown,
    Flame,
    Droplets,
    Wind,
    SlidersHorizontal,
    LayoutGrid,
    List
} from 'lucide-react';

// Category Definitions with Icons/Images (using icons for now as placeholders for "images")
const CATEGORIES = [
    { id: 'all', label: 'All', icon: <Star className="w-6 h-6" /> },
    { id: 'candles', label: 'Candles', icon: <Flame className="w-6 h-6" /> },
    { id: 'diffusers', label: 'Diffusers', icon: <Wind className="w-6 h-6" /> },
    { id: 'oils', label: 'Oils', icon: <Droplets className="w-6 h-6" /> },
    { id: 'hand-gel', label: 'Hand Gel', icon: <span className="text-xl font-bold">HG</span> },
    { id: 'shower-gel', label: 'Shower Gel', icon: <span className="text-xl font-bold">SG</span> },
];

export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters & UI State
    const [showFilters, setShowFilters] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
    const [scentFilter, setScentFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    useEffect(() => {
        getProducts().then((prods) => {
            setProducts(prods);
        });
    }, []);

    // Sync state to URL
    useEffect(() => {
        const params: Record<string, string> = {};
        if (categoryFilter && categoryFilter !== 'all') params.category = categoryFilter;
        setSearchParams(params);
    }, [categoryFilter, setSearchParams]);

    // Apply Filters
    const filteredProducts = React.useMemo(() => {
        let filtered = [...products];

        // Category filter
        if (categoryFilter === 'New') {
            filtered = filtered.filter(p => p.featured || (p.stock > 0 && p.stock < 10)); // Logic for "New"
        } else if (categoryFilter !== 'all') {
            filtered = filtered.filter(p =>
                p.category.toLowerCase() === categoryFilter.toLowerCase() ||
                p.category.toLowerCase().includes(categoryFilter.toLowerCase().replace('gels', 'gel'))
            );
        }

        // Scent filter
        if (scentFilter !== 'all') {
            filtered = filtered.filter(p => p.scents && p.scents.some(s => s.toLowerCase().includes(scentFilter.toLowerCase())));
        }

        // Price filter
        filtered = filtered.filter(p => {
            const price = p.basePrice;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case 'newest': // Default logic implies order in array
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

        return filtered;
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
        console.log('Adding to cart:', {
            product: activeProduct,
            variant: selectedVariant,
            quantity
        });
        closeDrawer();
    };

    const currentPrice = selectedVariant?.priceGHS || activeProduct?.basePrice || 0;

    return (
        <div className="bg-champagne-100 text-black min-h-screen font-inter transition-colors duration-500">
            {/* Nav / Header Area - Simplified for this page view */}
            {/* Ideally the global nav is here, assuming it's in layout. */}

            {/* New Hero Section: Banner Grid & Categories */}
            <div className="container mx-auto px-4 pt-8 pb-12 space-y-16">

                {/* 1. Promotional Banners (3-Column) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px] md:h-[600px]">
                    {/* Banner 1 */}
                    <div className="relative group overflow-hidden h-full flex items-end p-8 md:p-12 bg-gray-200">
                        <img
                            src={IMAGES.hero1}
                            alt="Winter Collection"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10 text-white animate-slide-in-up">
                            <h3 className="text-3xl font-playfair mb-4">Seasonal Scents</h3>
                            <button className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop Candles
                            </button>
                        </div>
                    </div>

                    {/* Banner 2 */}
                    <div className="relative group overflow-hidden h-full flex items-end p-8 md:p-12 bg-gray-300">
                        <img
                            src={IMAGES.diffavent2}
                            alt="Diffusers"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10 text-white animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                            <h3 className="text-3xl font-playfair mb-4">Instant Ambience</h3>
                            <button className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop Diffusers
                            </button>
                        </div>
                    </div>

                    {/* Banner 3 */}
                    <div className="relative group overflow-hidden h-full flex items-end p-8 md:p-12 bg-gray-200">
                        <img
                            src={IMAGES.allprod1}
                            alt="Gift Sets"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10 text-white animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                            <h3 className="text-3xl font-playfair mb-4">Gift Sets</h3>
                            <button className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop Gifts
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Circular Categories */}
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-8 md:gap-12 min-w-max md:min-w-0 px-4">
                        {CATEGORIES.map((cat, idx) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoryFilter(cat.id)}
                                className="group flex flex-col items-center gap-4 min-w-[100px]"
                            >
                                <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center overflow-hidden border transition-all duration-300  ${categoryFilter === cat.id
                                    ? 'border-gold ring-0 ring-gold/20'
                                    : 'border-black/5 hover:border-gold/50'
                                    }`}>
                                    {/* Background Image Placeholder for Category */}
                                    <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-110 ${categoryFilter === cat.id ? 'opacity-90' : 'opacity-100'
                                        }`}>
                                        {/* 
                                            Ideally, we'd have specific images for each category. 
                                            For now, we use the icon with a nice background. 
                                         */}
                                        <div className="w-full h-full bg-champagne-200/50 flex items-center justify-center">
                                            {/* Scaling the icon up to act more like an 'image' graphic */}
                                            <div className="scale-150 text-black/20 group-hover:text-black/40 transition-colors">
                                                {cat.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overlay for active state */}
                                    {categoryFilter === cat.id && (
                                        <div className="absolute inset-0 bg-gold/10 z-10" />
                                    )}
                                </div>

                                <span className={`text-sm font-medium tracking-wide transition-colors ${categoryFilter === cat.id ? 'text-black font-semibold' : 'text-black/60 group-hover:text-black'
                                    }`}>
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-40 bg-champagne-100/95 backdrop-blur-xl border-y border-black/5 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Left: Filter Toggle & Count */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setShowFilters(true)}
                            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black hover:text-gold transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                        <div className="hidden md:flex items-center gap-3 text-xs font-medium text-black/40 uppercase tracking-widest">
                            <div className="h-4 w-px bg-black/10 mx-2"></div>
                            <span>{filteredProducts.length} Results</span>
                        </div>
                    </div>

                    {/* Right: Sort & View */}
                    <div className="flex items-center gap-4">
                        {/* View Toggle (Desktop) */}
                        <div className="hidden md:flex items-center bg-black/5 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="h-4 w-px bg-black/10 hidden md:block"></div>

                        {/* Custom Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black hover:text-gold transition-colors"
                            >
                                <span>Sort By</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isSortOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                                    <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="py-2">
                                            {[
                                                { label: 'Newest Arrivals', value: 'newest' },
                                                { label: 'Best Sellers', value: 'popular' },
                                                { label: 'Price: Low to High', value: 'price-asc' },
                                                { label: 'Price: High to Low', value: 'price-desc' },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setIsSortOpen(false);
                                                    }}
                                                    className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-champagne-50 flex items-center justify-between group ${sortBy === option.value ? 'text-black font-bold bg-champagne-50/50' : 'text-black/60'
                                                        }`}
                                                >
                                                    {option.label}
                                                    {sortBy === option.value && <Check className="w-4 h-4 text-gold" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Filter Drawer */}
            {showFilters && (
                <div className="fixed inset-0 z-50 flex justify-end isolate">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowFilters(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-black/5">
                            <h3 className="text-xl font-playfair font-medium">Filters</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                            >
                                <X className="w-5 h-5 opacity-50" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-10">
                            {/* Categories */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Category</h4>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setCategoryFilter(cat.id)}
                                            className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${categoryFilter === cat.id
                                                ? 'bg-black text-white border-black shadow-lg shadow-black/20'
                                                : 'bg-white text-black/70 border-black/10 hover:border-black/30 hover:bg-gray-50'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Scent Family */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Scent Family</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Floral', 'Citrus', 'Woody', 'Fresh', 'Oriental', 'Spicy'].map((scent) => {
                                        const isSelected = scentFilter.toLowerCase() === scent.toLowerCase();
                                        return (
                                            <button
                                                key={scent}
                                                onClick={() => setScentFilter(isSelected ? 'all' : scent.toLowerCase())}
                                                className={`relative overflow-hidden rounded-xl p-4 text-left border transition-all duration-300 group ${isSelected
                                                    ? 'border-gold bg-gold/5 ring-1 ring-gold'
                                                    : 'border-black/10 hover:border-gold/50 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className={`block text-sm font-medium transition-colors ${isSelected ? 'text-black' : 'text-black/60 group-hover:text-black'}`}>
                                                    {scent}
                                                </span>
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2">
                                                        <div className="w-2 h-2 rounded-full bg-gold" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Price Range</h4>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <label className="text-[10px] uppercase text-black/30 font-bold mb-1 block">Min Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm">GHS</span>
                                                <input
                                                    type="number"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-black/10 rounded-lg text-sm font-medium focus:border-black focus:ring-0 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-4 h-px bg-black/10 mt-5"></div>
                                        <div className="flex-1">
                                            <label className="text-[10px] uppercase text-black/30 font-bold mb-1 block">Max Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm">GHS</span>
                                                <input
                                                    type="number"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-black/10 rounded-lg text-sm font-medium focus:border-black focus:ring-0 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price Presets */}
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: 'Under 100', min: 0, max: 100 },
                                            { label: '100 - 300', min: 100, max: 300 },
                                            { label: '300+', min: 300, max: 1000 },
                                        ].map((preset) => (
                                            <button
                                                key={preset.label}
                                                onClick={() => setPriceRange([preset.min, preset.max])}
                                                className="px-3 py-1.5 rounded-md border border-black/5 bg-gray-50 text-xs font-medium text-black/60 hover:bg-black hover:text-white transition-colors"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-black/5 bg-gray-50 space-y-3">
                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-full bg-black text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors shadow-lg shadow-black/10"
                            >
                                Show {filteredProducts.length} Products
                            </button>
                            <button
                                onClick={() => {
                                    setCategoryFilter('all');
                                    setScentFilter('all');
                                    setPriceRange([0, 1000]);
                                }}
                                className="w-full py-3 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-black/5  ">
                        <Search className="w-12 h-12 text-black/20 mx-auto mb-4" />
                        <p className="text-black/40 mb-4">No match found for your filters.</p>
                        <button
                            onClick={() => { setCategoryFilter('all'); setScentFilter('all'); setPriceRange([0, 1000]); }}
                            className="text-gold font-medium hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
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

            {/* Quick Add Drawer - Light Mode */}
            {drawerOpen && activeProduct && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeDrawer} />
                    <aside className="relative w-full md:w-[450px] bg-white h-full  flex flex-col animate-slide-in-right">
                        <div className="p-6 border-b border-black/5 flex items-center justify-between">
                            <h3 className="text-xl font-playfair text-black">Quick Add</h3>
                            <button onClick={closeDrawer} className="text-black/40 hover:text-black transition-colors"><X className="w-6 h-6" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            <div className="flex gap-5 mb-8">
                                <div className="w-28 h-28 bg-gray-50 rounded-lg overflow-hidden border border-black/5">
                                    <img src={activeProduct.images.default} alt={activeProduct.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-black font-playfair text-xl mb-1">{activeProduct.title}</h4>
                                    <p className="text-gold font-medium text-lg mb-2">{formatMoney(currentPrice)}</p>
                                    <p className="text-black/50 text-sm line-clamp-2 leading-relaxed">{activeProduct.description}</p>
                                </div>
                            </div>

                            {/* Options */}
                            {activeProduct.variants.length > 0 && (
                                <div className="mb-8">
                                    <label className="text-xs font-bold uppercase text-black/30 mb-3 block tracking-widest">Select Variant</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {activeProduct.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-4 border rounded-xl text-left flex items-center justify-between transition-all duration-200 ${selectedVariant?.id === variant.id
                                                    ? 'border-gold bg-gold/5 ring-1 ring-gold shadow-sm'
                                                    : 'border-black/10 hover:border-black/30 bg-gray-50'
                                                    }`}
                                            >
                                                <span className={`font-medium ${selectedVariant?.id === variant.id ? 'text-black' : 'text-black/70'}`}>
                                                    {variant.label}
                                                </span>
                                                <span className="text-sm font-semibold text-black/90">{formatMoney(variant.priceGHS)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mb-8">
                                <label className="text-xs font-bold uppercase text-black/30 mb-3 block tracking-widest">Quantity</label>
                                <div className="flex items-center w-32 h-12 border border-black/10 rounded-lg bg-gray-50">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full hover:bg-black/5 text-black/60 hover:text-black transition-colors">-</button>
                                    <span className="w-10 text-center font-medium text-black">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full hover:bg-black/5 text-black/60 hover:text-black transition-colors">+</button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-black/5 bg-gray-50/50">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 font-bold uppercase tracking-wider rounded-xl text-sm hover:bg-gold transition-all shadow-lg shadow-black/10 hover:shadow-gold/20 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart — {formatMoney(currentPrice * quantity)}
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Footer / Socials */}
            <div className="border-t border-black/5 mt-20 py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-playfair text-black mb-8">#ScentedByDDSD</h2>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white text-black transition-all duration-300 shadow-sm"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white text-black transition-all duration-300 shadow-sm"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white text-black transition-all duration-300 shadow-sm"><Music className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Refined Product Card Component (Light Mode) ---
const ProductCard = ({ product, index, onQuickAdd }: { product: Product; index: number; onQuickAdd: () => void }) => {
    return (
        <div className="group flex flex-col gap-4">
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm shadow-sm transition-shadow group-hover:shadow-md">
                <img
                    src={product.images.default}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {product.featured && (
                        <span className="bg-white/90 backdrop-blur text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">New</span>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                        <span className="bg-red-50 text-red-700 text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm border border-red-100">Low Stock</span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-black hover:bg-black hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300">
                    <Heart className="w-4 h-4" />
                </button>

                {/* Quick Add (Hover) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={onQuickAdd}
                        className="w-full bg-white/95 backdrop-blur text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg"
                    >
                        Quick Add
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div>
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-black font-medium text-base truncate pr-2 group-hover:text-gold transition-colors font-playfair">{product.title}</h3>
                    <span className="text-black font-semibold whitespace-nowrap">{formatMoney(product.basePrice)}</span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'text-gray-300 stroke-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-xs text-black/40 font-medium">(12)</span>
                </div>
            </div>
        </div>
    );
};

