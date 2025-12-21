import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import { useLocalCart } from '../hooks/useLocalCart';
import { Product, ProductVariant } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { IMAGES } from '@/assets';
import {
    X,
    ShoppingCart,
    Search,
    ChevronDown,
    LayoutGrid,
    List,
    Check,
    SlidersHorizontal,
    Heart,
    Star,
    Flame,
    Wind,
    Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import cn from 'classnames';

export const Shop = () => {
    // Hooks
    const { products } = useInventory();
    const { addItem } = useLocalCart();
    const [searchParams, setSearchParams] = useSearchParams();

    // Local State
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);

    // Filters & UI State
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
    const [scentFilter, setScentFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);


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
            filtered = filtered.filter(p => p.featured || (p.stock > 0 && p.stock < 10));
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
            case 'newest':
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
        if (activeProduct) {
            addItem(
                activeProduct,
                selectedVariant || activeProduct.variants[0],
                undefined,
                undefined,
                undefined,
                quantity
            );
            closeDrawer();
        }
    };

    const currentPrice = selectedVariant?.priceGHS || activeProduct?.basePrice || 0;

    return (
        <div className="min-h-screen bg-champagne-100 text-black font-inter pb-32 transition-colors duration-500">

            {/* 1. Hero / Promotional Banners */}
            <div className="container mx-auto px-4 pt-12 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[500px] md:h-[600px]">
                    {/* Banner 1 */}
                    <div className="relative group overflow-hidden h-full flex items-end p-8 md:p-12 bg-gray-200 rounded-sm">
                        <img
                            src={IMAGES.hero1}
                            alt="Winter Collection"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10 text-white animate-slide-in-up">
                            <h3 className="text-3xl font-playfair mb-4">Seasonal Scents</h3>
                            <button onClick={() => setCategoryFilter('all')} className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop All
                            </button>
                        </div>
                    </div>

                    {/* Banner 2 */}
                    <div className="relative group overflow-hidden h-full flex items-end p-8 md:p-12 bg-gray-300 rounded-sm">
                        <img
                            src={IMAGES.diffavent2}
                            alt="Diffusers"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10 text-white animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                            <h3 className="text-3xl font-playfair mb-4">Instant Ambience</h3>
                            <button onClick={() => setCategoryFilter('Diffuser')} className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop Diffusers
                            </button>
                        </div>
                    </div>

                    {/* Banner 3 */}
                    <div className="relative group overflow-hidden h-full flex items-end p-8 md:p-12 bg-gray-200 rounded-sm">
                        <img
                            src={IMAGES.allprod1}
                            alt="Gift Sets"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative z-10 text-white animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                            <h3 className="text-3xl font-playfair mb-4">Gift Sets</h3>
                            <button onClick={() => setCategoryFilter('Bundle')} className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop Gifts
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[105rem] mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* 2. Left Sidebar Filter (Desktop) */}
                    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-10 sticky top-32 h-fit">
                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-6">Explore</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'all', label: 'All Products', icon: <Star className="w-4 h-4" /> },
                                    { id: 'Candle', label: 'Candles', icon: <Flame className="w-4 h-4" /> },
                                    { id: 'Diffuser', label: 'Diffusers', icon: <Wind className="w-4 h-4" /> },
                                    { id: 'Spray', label: 'Room Sprays', icon: <Droplets className="w-4 h-4" /> },
                                ].map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategoryFilter(cat.id)}
                                        className={cn(
                                            "flex items-center gap-3 w-full text-left transition-colors",
                                            categoryFilter === cat.id ? "text-black font-bold" : "text-black/60 hover:text-black"
                                        )}
                                    >
                                        <span className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                            categoryFilter === cat.id ? "bg-black text-white" : "bg-black/5 text-black/40"
                                        )}>
                                            {cat.icon}
                                        </span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="h-px bg-black/10" />

                        {/* Scent Family */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-6">Scent Family</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Floral', 'Citrus', 'Woody', 'Fresh', 'Oriental', 'Spicy'].map((scent) => {
                                    const isSelected = scentFilter.toLowerCase() === scent.toLowerCase();
                                    return (
                                        <button
                                            key={scent}
                                            onClick={() => setScentFilter(isSelected ? 'all' : scent.toLowerCase())}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                                                isSelected
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-black/60 border-black/10 hover:border-black/30"
                                            )}
                                        >
                                            {scent}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-6">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">MIN</span>
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="w-full pl-10 pr-2 py-2 bg-white border border-black/10 rounded-lg text-sm focus:border-black outline-none"
                                        />
                                    </div>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">MAX</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-full pl-10 pr-2 py-2 bg-white border border-black/10 rounded-lg text-sm focus:border-black outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { label: '< 100', min: 0, max: 100 },
                                        { label: '100+', min: 100, max: 1000 },
                                    ].map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => setPriceRange([preset.min, preset.max])}
                                            className="px-2 py-1 bg-white border border-black/10 rounded text-xs text-black/60 hover:text-black transition-colors"
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden w-full flex justify-between items-center mb-6">
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black border border-black/10 px-4 py-2 rounded-lg bg-white"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                        <span className="text-2xl font-playfair">{filteredProducts.length} Items</span>
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-6">
                            <span className="hidden lg:block text-lg font-playfair">{filteredProducts.length} Results</span>

                            <div className="flex items-center gap-4 ml-auto">
                                {/* View Toggle */}
                                <div className="hidden md:flex items-center bg-black/5 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-white shadow text-black" : "text-black/40 hover:text-black")}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-white shadow text-black" : "text-black/40 hover:text-black")}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="h-4 w-px bg-black/10 hidden md:block"></div>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black hover:text-gold transition-colors"
                                    >
                                        <span>Sort By</span>
                                        <ChevronDown className={cn("w-4 h-4 transition-transform", isSortOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {isSortOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 top-full mt-4 w-56 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden z-20"
                                                >
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
                                                                className={cn(
                                                                    "w-full text-left px-5 py-3 text-sm transition-colors flex items-center justify-between",
                                                                    sortBy === option.value ? "text-black font-bold bg-gray-50" : "text-black/60 hover:bg-gray-50"
                                                                )}
                                                            >
                                                                {option.label}
                                                                {sortBy === option.value && <Check className="w-4 h-4 text-gold" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-2xl border border-black/5">
                                <Search className="w-12 h-12 text-black/20 mx-auto mb-4" />
                                <p className="text-black/40 mb-4">No match found.</p>
                                <button
                                    onClick={() => { setCategoryFilter('all'); setScentFilter('all'); setPriceRange([0, 1000]); }}
                                    className="text-gold hover:underline"
                                >
                                    Reset filters
                                </button>
                            </div>
                        ) : (
                            <div className={cn(
                                "grid gap-x-6 gap-y-12",
                                viewMode === 'grid' ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                            )}>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        viewMode={viewMode}
                                        onQuickAdd={() => openQuickAdd(product)}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {mobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-white shadow-2xl p-6 lg:hidden overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-playfair">Filters</h3>
                                <button onClick={() => setMobileFiltersOpen(false)}><X className="w-6 h-6" /></button>
                            </div>
                            {/* Duplicate logic from Desktop Sidebar but visually simplified if needed */}
                            {/* Note: In a real app I'd refactor the filter content into a distinct component to reuse */}
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-black/40 mb-4 text-xs">Categories</h4>
                                    <div className="flex flex-col gap-2">
                                        {['All', 'Candle', 'Diffuser', 'Spray', 'Soap'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => { setCategoryFilter(cat === 'All' ? 'all' : cat); setMobileFiltersOpen(false); }}
                                                className="text-left font-medium text-black/70 py-2 border-b border-black/5"
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Quick Add Drawer (Keep Existing Logic, Update Styles for Light Mode) */}
            <AnimatePresence>
                {drawerOpen && activeProduct && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDrawer}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        />
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-white border-l border-black/5 flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-black/5 flex items-center justify-between">
                                <h3 className="text-xl font-playfair text-black">Quick Add</h3>
                                <button onClick={closeDrawer} className="text-black/40 hover:text-black"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                                <div className="flex gap-5 mb-8">
                                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-black/5">
                                        <img src={activeProduct.images.default} alt={activeProduct.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-black font-playfair text-xl mb-1">{activeProduct.title}</h4>
                                        <p className="text-gold font-medium text-lg">{formatMoney(currentPrice)}</p>
                                    </div>
                                </div>

                                {activeProduct.variants.length > 0 && (
                                    <div className="mb-8">
                                        <label className="text-xs font-bold uppercase text-black/30 mb-3 block tracking-widest">Select Variant</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {activeProduct.variants.map((variant) => (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => setSelectedVariant(variant)}
                                                    className={cn(
                                                        "px-4 py-4 border rounded-xl text-left flex items-center justify-between transition-all duration-200",
                                                        selectedVariant?.id === variant.id
                                                            ? "border-gold bg-gold/5 ring-1 ring-gold shadow-sm"
                                                            : "border-black/10 hover:border-black/30 bg-gray-50"
                                                    )}
                                                >
                                                    <span className="font-medium text-black">{variant.label}</span>
                                                    <span className="text-sm font-semibold text-black/90">{formatMoney(variant.priceGHS)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="text-xs font-bold uppercase text-black/30 mb-3 block tracking-widest">Quantity</label>
                                    <div className="flex items-center w-32 h-12 border border-black/10 rounded-lg bg-gray-50">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full hover:bg-black/5 text-black/60 hover:text-black transition-colors">-</button>
                                        <span className="w-10 text-center font-medium text-black">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full hover:bg-black/5 text-black/60 hover:text-black transition-colors">+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-black/5 bg-gray-50">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-wider rounded-xl text-sm hover:bg-gold transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart — {formatMoney(currentPrice * quantity)}
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Refined Product Card (Light Mode) ---
const ProductCard = ({ product, viewMode, onQuickAdd }: { product: Product; viewMode: 'grid' | 'list'; onQuickAdd: () => void }) => {
    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group flex gap-6 p-4 bg-white border border-black/5 rounded-2xl hover:border-gold/30 hover:shadow-lg transition-all"
            >
                <Link to={`/product/${product.slug}`} className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-xl bg-gray-100 block">
                    <img src={product.images.default} alt={product.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link to={`/product/${product.slug}`} className="block">
                                <h3 className="text-xl font-playfair text-black mb-2 hover:text-black/70 transition-colors">{product.title}</h3>
                            </Link>
                            <p className="text-black/60 text-sm line-clamp-2 max-w-md">{product.shortDescription}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-medium text-black block mb-2">{formatMoney(product.basePrice)}</span>
                            <button onClick={onQuickAdd} className="text-xs font-bold uppercase tracking-widest border border-black/10 px-4 py-2 rounded hover:bg-black hover:text-white transition-colors">
                                Quick Add
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col gap-4"
        >
            <Link to={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-xl">
                    <img
                        src={product.images.default}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.featured && <span className="bg-white/90 backdrop-blur text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">New</span>}
                        {product.stock < 5 && product.stock > 0 && <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">Low Stock</span>}
                    </div>

                    {/* Wishlist */}
                    <button
                        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-black hover:bg-black hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            /* Add functionality */
                        }}
                    >
                        <Heart className="w-4 h-4" />
                    </button>
                    <div className="absolute inset-x-0 bottom-6 flex justify-center 
                                  translate-y-4 opacity-0 
                                  group-hover:translate-y-0 group-hover:opacity-100 
                                  transition-all duration-300 delay-75 z-20">
                        <span
                            className="px-8 py-3 bg-white text-black border border-black/10
                                       text-[10px] font-medium
                                       uppercase tracking-widest 
                                       hover:bg-champagne-200 hover:text-black 
                                       transition-colors duration-300 rounded-sm shadow-lg cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickAdd();
                            }}
                        >
                            Quick Add
                        </span>
                    </div>
                </div>
            </Link>

            <div>
                <div className="flex justify-between items-start mb-1">
                    <Link to={`/product/${product.slug}`} className="block">
                        <h3 className="text-sm uppercase tracking-[0.2em] font-playfair text-black 
                                 group-hover:text-black/70 transition-colors duration-300">{product.title}</h3>
                    </Link>
                    <span className="text-black font-semibold">{formatMoney(product.basePrice)}</span>
                </div>

                {/* Star Rating Stub */}
                <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'text-gray-300 stroke-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-xs text-black/40 font-medium">(12)</span>
                </div>
            </div>
        </motion.div>
    );
};
