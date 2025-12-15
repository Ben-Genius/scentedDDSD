import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../lib/api';
import { Product, ProductVariant } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { ShopProductCard } from '../components/ShopProductCard';
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
    Star
} from 'lucide-react';

export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    // filteredProducts is now derived

    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const [showFilters, setShowFilters] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
    const [scentFilter, setScentFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);



    useEffect(() => {
        getProducts().then((prods) => {
            setProducts(prods);
            setProducts(prods);
            // setFilteredProducts removed

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
            case 'newest':
                // Assuming newer products are at the end or have timestamps, but for now default order
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
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-black via-[#111] to-black border-b border-gold/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="container mx-auto px-4 py-16 relative z-10 text-center">
                    <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block animate-fade-in-up">
                        Curated Collection
                    </span>
                    <h1 className="text-5xl md:text-6xl font-playfair text-white mb-6 animate-fade-in-up delay-100">
                        The <span className="text-gold">Shop</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg animate-fade-in-up delay-200">
                        Explore our full range of handcrafted fragrances and home accents.
                    </p>
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
                                <option value="New">New Arrivals</option>
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
                        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in-right duration-200">
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
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-playfair text-white mb-2">No products found</h3>
                        <p className="text-gray-400 text-sm mb-6">Try adjusting your filters or search criteria.</p>
                        <button
                            onClick={() => {
                                setCategoryFilter('all');
                                setScentFilter('all');
                                setPriceRange([0, 1000]);
                            }}
                            className="text-gold hover:underline font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            categoryFilter === 'New' ? (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onQuickAdd={() => openQuickAdd(product)}
                                />
                            ) : (
                                <ShopProductCard key={product.id} product={product} />
                            )
                        ))}
                    </div>
                )}
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                        Join Our Community
                    </span>
                    <h2 className="text-4xl md:text-5xl font-playfair text-white mb-4">
                        #ScentedByDDSD
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Follow us on social media for behind-the-scenes content, special offers, and inspiration
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">

                  <a
                    href="https://web.facebook.com/people/ScentedBy-Ddsd/pfbid02asCf1ubE6Pmmtxk2LVcLkSae1NivtRs6hnjuBLkDze2jYGbLPQ1upZ6f3mBNRkixl/?mibextid=2JQ9oc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square bg-gradient-to-br from-[#1877F2]/20 to-[#1877F2]/5 rounded-2xl overflow-hidden border border-[#1877F2]/30 hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300 hover:scale-105"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                        <Facebook className="w-14 h-14 text-[#1877F2] group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-white text-sm font-medium">Facebook</span>
                        <span className="text-gray-400 text-xs">Follow for updates</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1877F2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <span className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            Follow Us
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </a>

<a
            
                href="https://api.whatsapp.com/send/?phone=233257087042&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 rounded-2xl overflow-hidden border border-[#25D366]/30 hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300 hover:scale-105"
                >
                        
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                    <MessageCircle className="w-14 h-14 text-[#25D366] group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white text-sm font-medium">WhatsApp</span>
                    <span className="text-gray-400 text-xs">Chat with us</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#25D366] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <span className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        Message Us
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </a>


            <a
                href="https://www.instagram.com/scented_by_ddsd_/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square bg-gradient-to-br from-[#E4405F]/20 via-[#C13584]/20 to-[#833AB4]/20 rounded-2xl overflow-hidden border border-[#E4405F]/30 hover:border-[#E4405F] hover:shadow-lg hover:shadow-[#E4405F]/20 transition-all duration-300 hover:scale-105"
                >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                <Instagram className="w-14 h-14 text-[#E4405F] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white text-sm font-medium">Instagram</span>
                <span className="text-gray-400 text-xs">See our gallery</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#E4405F] via-[#C13584] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    Follow Us
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </a>

                
                <a
                    href = "https://www.tiktok.com/@scentedbyddsd?is_from_webapp=1&sender_device=pc"
    target = "_blank"
    rel = "noopener noreferrer"
    className = "group relative aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/30 hover:border-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105"
        >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                        <Music className="w-14 h-14 text-white group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-white text-sm font-medium">TikTok</span>
                        <span className="text-gray-400 text-xs">Watch videos</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00f2ea] via-[#ff0050] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <span className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            Watch Now
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </a >
            </div >

    <div className="text-center mt-12">
        <p className="text-gray-400 text-sm">
            Tag us in your photos with <span className="text-gold font-semibold">#ScentedByDDSD</span> for a chance to be featured
        </p>
    </div>
        </div >



    {/* Quick Add Drawer */ }
{
    drawerOpen && activeProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={closeDrawer}
            />
            <aside className="relative w-full md:w-[480px] bg-[#0a0a0a] border-l border-white/10 overflow-y-auto animate-slide-in-right shadow-2xl shadow-black">
                <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 p-6 flex items-center justify-between z-10">
                    <h3 className="text-xl font-playfair text-gold">Quick Add</h3>
                    <button onClick={closeDrawer} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-8">
                    {/* Product Header */}
                    <div className="flex gap-5">
                        <div className="w-32 h-32 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                            <img
                                src={activeProduct.images.default}
                                alt={activeProduct.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            {activeProduct.featured && (
                                <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
                                    Best Seller
                                </span>
                            )}
                            <h4 className="text-white font-playfair text-xl mb-2 leading-tight">
                                {activeProduct.title}
                            </h4>
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2 font-light">
                                {activeProduct.description}
                            </p>
                            <div className="flex items-center gap-1 text-gold text-xs">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                                <span className="text-gray-500 ml-2">4.8 (24 reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex items-center justify-between">
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Total Price</span>
                        <span className="text-3xl font-playfair text-gold">
                            {formatMoney(currentPrice * quantity)}
                        </span>
                    </div>

                    {/* Variants */}
                    {activeProduct.variants.length > 0 && (
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                                Select Option
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {activeProduct.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`p-4 rounded-xl border transition-all text-left relative overflow-hidden ${selectedVariant?.id === variant.id
                                            ? 'border-gold bg-gold/10'
                                            : 'border-white/10 bg-white/5 hover:border-gold/50'
                                            }`}
                                    >
                                        <div className="font-semibold text-white mb-1 text-sm">
                                            {variant.label}
                                        </div>
                                        <div className="text-gold text-xs font-bold">
                                            {formatMoney(variant.priceGHS)}
                                        </div>
                                        {selectedVariant?.id === variant.id && (
                                            <div className="absolute top-2 right-2 text-gold">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                            Quantity
                        </label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-xl"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 bg-transparent border-b border-white/20 text-white text-center py-2 text-xl font-playfair outline-none focus:border-gold"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-xl"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="col-span-2 bg-gold text-black py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-lg shadow-gold/20"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Order
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    )
}
        </div >
    );
};

// Product Card Component (Same as NewArrivals but refined styles if needed)
const ProductCard = ({ product, index, onQuickAdd }: { product: Product; index: number; onQuickAdd: () => void }) => {
    return (
        <article
            className="group relative bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="relative aspect-square overflow-hidden bg-gray-900">
                <img
                    src={product.images.default}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                        <span className="bg-gold text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg">
                            New
                        </span>
                    )}
                    {product.stock < 5 && product.stock > 0 && (
                        <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg">
                            Low Stock
                        </span>
                    )}
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent pt-10">
                    <button
                        onClick={onQuickAdd}
                        className="w-full bg-white text-black py-3 rounded font-bold uppercase tracking-wider text-xs hover:bg-gold transition-colors"
                    >
                        Quick Add
                    </button>
                </div>
            </div>

            <div className="p-5">
                <p className="text-gold/80 text-[10px] uppercase tracking-widest font-bold mb-2">
                    {product.category}
                </p>
                <h3 className="text-white font-playfair text-lg mb-2 leading-tight group-hover:text-gold transition-colors">
                    {product.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-white font-medium">
                        {formatMoney(product.basePrice)}
                    </span>
                    <button onClick={onQuickAdd} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </article>
    );
};
