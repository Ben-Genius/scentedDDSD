import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import { useLocalCart } from '../hooks/useLocalCart';
import { Product, ProductVariant } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { X, ShoppingCart, Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import cn from 'classnames';

// New Components
import { ShopHero } from '../components/ShopHero';
import { ShopCategories } from '../components/shop/ShopCategories';
import { ShopSidebar } from '../components/shop/ShopSidebar';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { ShopProductCard } from '../components/shop/ShopProductCard';

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
    const [isLoading, setIsLoading] = useState(true);

    // Filters & UI State
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter State
    const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
    const [scentFilter, setScentFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    // Simulate loading for smoother transition
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Sync state to URL
    useEffect(() => {
        const params: Record<string, string> = {};
        if (categoryFilter && categoryFilter !== 'all') params.category = categoryFilter;
        setSearchParams(params);

        // Scroll to top of grid when category changes (optional)
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [categoryFilter, setSearchParams]);

    // Apply Filters
    const filteredProducts = useMemo(() => {
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
            // Handle variant prices vs base price
            const lowestPrice = p.variants.length > 0
                ? Math.min(...p.variants.map(v => v.priceGHS))
                : p.basePrice;
            return lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case 'newest':
                // Assuming newer products are at the end or have a date field, 
                // but defaulting to 'featured' or just original order for now if no date
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'price-asc':
                filtered.sort((a, b) => {
                    const priceA = a.variants.length ? Math.min(...a.variants.map(v => v.priceGHS)) : a.basePrice;
                    const priceB = b.variants.length ? Math.min(...b.variants.map(v => v.priceGHS)) : b.basePrice;
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                filtered.sort((a, b) => {
                    const priceA = a.variants.length ? Math.min(...a.variants.map(v => v.priceGHS)) : a.basePrice;
                    const priceB = b.variants.length ? Math.min(...b.variants.map(v => v.priceGHS)) : b.basePrice;
                    return priceB - priceA;
                });
                break;
            case 'popular':
                filtered.sort((a, b) => (b.stock < 5 ? 1 : 0) - (a.stock < 5 ? 1 : 0)); // Pseudo logic for popular
                break;
        }

        return filtered;
    }, [categoryFilter, scentFilter, sortBy, priceRange, products]);

    // Quick Add Handlers
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
        <div className="min-h-screen bg-[#fffcf8] text-black font-inter pb-32">

            {/* 1. Hero Section */}
            <ShopHero onCategorySelect={setCategoryFilter} />

            {/* 2. Circular Categories */}
            <div className="mb-12 border-b border-black/5 pb-8">
                <h2 className="text-center text-sm font-bold uppercase tracking-widest text-black/30 mb-8">Browse by Category</h2>
                <ShopCategories
                    activeCategory={categoryFilter}
                    onSelectCategory={setCategoryFilter}
                />
            </div>

            <div className="max-w-[105rem] mx-auto px-4 md:px-8">
                <div className="flex flex-col">
                    {/* 3. Toolbar & Expandable Filter Panel */}
                    <ShopToolbar
                        resultCount={filteredProducts.length}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        onToggleFilter={() => setFiltersOpen(!filtersOpen)}
                    />

                    <AnimatePresence>
                        {filtersOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden border-b border-black/5 mb-8"
                            >
                                <ShopSidebar
                                    className="w-full pb-8"
                                    categoryFilter={categoryFilter}
                                    setCategoryFilter={setCategoryFilter}
                                    scentFilter={scentFilter}
                                    setScentFilter={setScentFilter}
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                    onReset={() => { setCategoryFilter('all'); setScentFilter('all'); setPriceRange([0, 1000]); }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 4. Main Product Grid */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="flex justify-center py-24">
                                <Loader2 className="w-8 h-8 animate-spin text-black/20" />
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-sm border border-black/5">
                                <Search className="w-12 h-12 text-black/20 mx-auto mb-4" />
                                <p className="text-black/40 mb-4 font-playfair italic text-xl">No match found.</p>
                                <button
                                    onClick={() => { setCategoryFilter('all'); setScentFilter('all'); setPriceRange([0, 1000]); }}
                                    className="text-black font-bold uppercase tracking-widest text-xs hover:underline"
                                >
                                    Reset filters
                                </button>
                            </div>
                        ) : (
                            <div className={cn(
                                "grid gap-x-6 gap-y-10",
                                viewMode === 'grid' ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                            )}>
                                {filteredProducts.map((product) => (
                                    <ShopProductCard
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

            {/* Quick Add Drawer */}
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
                                <h3 className="text-2xl font-playfair text-black">Quick Add</h3>
                                <button onClick={closeDrawer} className="text-black/40 hover:text-black"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                                <div className="flex gap-5 mb-8">
                                    <div className="w-24 h-24 bg-gray-50 rounded-sm overflow-hidden border border-black/5">
                                        <img src={activeProduct.images.default} alt={activeProduct.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-black font-playfair text-xl mb-1">{activeProduct.title}</h4>
                                        <p className="text-black/60 font-medium text-lg">{formatMoney(currentPrice)}</p>
                                    </div>
                                </div>

                                {activeProduct.variants.length > 0 && (
                                    <div className="mb-8">
                                        <label className="text-[10px] font-bold uppercase text-black/30 mb-3 block tracking-widest">Select Variant</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {activeProduct.variants.map((variant) => (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => setSelectedVariant(variant)}
                                                    className={cn(
                                                        "px-4 py-4 border rounded-sm text-left flex items-center justify-between transition-all duration-200",
                                                        selectedVariant?.id === variant.id
                                                            ? "border-black bg-black text-white"
                                                            : "border-black/10 hover:border-black/30 bg-transparent text-black"
                                                    )}
                                                >
                                                    <span className="font-medium">{variant.label}</span>
                                                    <span className={cn("text-sm font-semibold", selectedVariant?.id === variant.id ? "text-white" : "text-black/90")}>
                                                        {formatMoney(variant.priceGHS)}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="text-[10px] font-bold uppercase text-black/30 mb-3 block tracking-widest">Quantity</label>
                                    <div className="flex items-center w-32 h-12 border border-black/10 rounded-sm bg-transparent">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full hover:bg-black/5 text-black/60 hover:text-black transition-colors">-</button>
                                        <span className="w-10 text-center font-medium text-black">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full hover:bg-black/5 text-black/60 hover:text-black transition-colors">+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-black/5 bg-gray-50">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-wider rounded-sm text-sm hover:bg-black/80 transition-all shadow-lg flex items-center justify-center gap-2"
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
