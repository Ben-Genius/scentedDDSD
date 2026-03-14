import React, { useState } from 'react';
import { Product } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { useLocalCart } from '../hooks/useLocalCart';
import { SizeSelector } from './SizeSelector';
import { ColorSwitcher } from './ColorSwitcher';
import cn from 'classnames';

interface ProductDetailProps {
    product: Product;
}

const overrideVariants = (product: Product) => {
    const titleLower = product.title.toLowerCase();
    const catLower = product.category.toLowerCase();

    const isDiffuser = titleLower.includes('diffuser') || catLower.includes('diffuser');
    const isOil = titleLower.includes('oil') || catLower === 'essential oils';
    const isRefill = titleLower.includes('refill');

    const candleCollections = [
        'floral romance', 'woody and suede', 'woody & exotic',
        'oriental luxe', 'gourmet indulgence', 'gourmand indulgence',
        'fresh whisper'
    ];

    const isCandle = catLower === 'candle' || titleLower.includes('candle') ||
        (candleCollections.includes(catLower) && !isDiffuser && !isOil && !isRefill);

    if (isCandle) {
        return [
            { id: `${product.id}-small`, label: 'Small', sizeLabel: '485g', multiplier: 1, priceGHS: 150 },
            { id: `${product.id}-medium`, label: 'Medium', sizeLabel: '695g', multiplier: 1, priceGHS: 200 },
            { id: `${product.id}-grand`, label: 'Grand', sizeLabel: '1525g', multiplier: 1, priceGHS: 600 },
        ];
    }

    if (isRefill) {
        return [
            { id: `${product.id}-300ml`, label: '300ml', sizeLabel: '300ml', multiplier: 1, priceGHS: 300 },
            { id: `${product.id}-500ml`, label: '500ml', sizeLabel: '500ml', multiplier: 1, priceGHS: 500 },
        ];
    }

    if (isDiffuser) {
        return [
            { id: `${product.id}-std`, label: 'Standard', sizeLabel: '230ml', multiplier: 1, priceGHS: product.basePrice || 200 },
        ];
    }

    return product.variants;
};

export const ProductDetail = ({ product }: ProductDetailProps) => {
    const { addItem } = useLocalCart();

    const actualVariants = React.useMemo(() => overrideVariants(product), [product]);

    // State
    const [selectedVariantId, setSelectedVariantId] = useState<string>(actualVariants[0]?.id);
    const [selectedColorId, setSelectedColorId] = useState<string | undefined>(product.images.colorVariants[0]?.colorId);
    const [selectedScent, setSelectedScent] = useState<string | undefined>(product.scents[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(product.images.default);
    const [isHovered, setIsHovered] = useState(false);
    const [prevProductId, setPrevProductId] = useState(product.id);

    // Update state if product changes
    if (product.id !== prevProductId) {
        setPrevProductId(product.id);
        setSelectedVariantId(actualVariants[0]?.id);
        setSelectedColorId(product.images.colorVariants[0]?.colorId);
        setSelectedScent(product.scents[0]);
        setActiveImage(product.images.default);
        setQuantity(1);
    }

    // Derived state
    const selectedVariant = actualVariants.find(v => v.id === selectedVariantId) || actualVariants[0];
    const selectedColor = product.images.colorVariants.find(c => c.colorId === selectedColorId);

    const handleColorChange = (colorId: string) => {
        setSelectedColorId(colorId);
        const color = product.images.colorVariants.find(c => c.colorId === colorId);
        if (color) {
            setActiveImage(color.image);
        } else {
            setActiveImage(product.images.default);
        }
    };

    // Price Calculation
    const calculatePrice = () => {
        let price = selectedVariant?.priceGHS || product.basePrice;
        if (selectedColor && selectedColor.priceDelta) {
            price += selectedColor.priceDelta;
        }
        return price;
    };

    const currentPrice = calculatePrice();

    const handleAddToCart = () => {
        addItem(
            product,
            selectedVariant,
            selectedColorId,
            selectedScent,
            selectedColor?.label,
            quantity
        );
        // Optional: open drawer via context? (Hook already does it if we configured it to)
        // In our hook: set({ items: [...], isDrawerOpen: true });
    };

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.images.default,
        "description": product.shortDescription,
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "GHS",
            "price": currentPrice,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in text-white selection:bg-gold/30">
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                {/* Left: Sticky Image Gallery */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-32 space-y-6">
                    <div
                        className="aspect-[4/5] bg-[#0c0c0c] rounded-xl overflow-hidden relative group border border-white/5 shadow-2xl"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={activeImage}
                            alt={product.title}
                            className={cn(
                                "w-full h-full object-cover transition-transform duration-700 ease-out",
                                isHovered ? "scale-105" : "scale-100"
                            )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Thumbnail Gallery */}
                    {(product.images.gallery?.length > 0 || product.images.colorVariants?.length > 0) && (
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                            <button
                                onClick={() => setActiveImage(product.images.default)}
                                className={cn(
                                    "w-24 h-24 snap-start flex-shrink-0 bg-[#111] rounded-lg overflow-hidden border-2 transition-all duration-300",
                                    activeImage === product.images.default
                                        ? "border-gold shadow-[0_0_15px_rgba(183,133,43,0.3)]"
                                        : "border-transparent opacity-60 hover:opacity-100 transform hover:-translate-y-1"
                                )}
                            >
                                <img src={product.images.default} alt="Default" className="w-full h-full object-cover" />
                            </button>
                            {product.images.gallery?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={cn(
                                        "w-24 h-24 snap-start flex-shrink-0 bg-[#111] rounded-lg overflow-hidden border-2 transition-all duration-300",
                                        activeImage === img
                                            ? "border-gold shadow-[0_0_15px_rgba(183,133,43,0.3)]"
                                            : "border-transparent opacity-60 hover:opacity-100 transform hover:-translate-y-1"
                                    )}
                                >
                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Info & Controls */}
                <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-10">
                    <div className="mb-8">
                        <p className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs tracking-[0.2em] uppercase mb-4 rounded-full border border-gold/20">
                            {product.category}
                        </p>
                        <h1 className="text-4xl lg:text-5xl lg:leading-tight font-playfair text-white mb-4">
                            {product.title}
                        </h1>
                        <p className="text-3xl text-gold font-light mb-6 flex items-baseline gap-3">
                            {formatMoney(currentPrice)}
                            {selectedColor?.priceDelta ? <span className="text-sm text-gray-400 font-inter tracking-wide">(includes finish +{formatMoney(selectedColor.priceDelta)})</span> : null}
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 mb-10 shadow-xl">
                        <div className="text-gray-300 leading-relaxed font-light text-sm lg:text-base">
                            {product.longDescription}
                        </div>

                        {(product.burnTime || product.materials) && (
                            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                                {product.burnTime && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Burn Time</p>
                                        <p className="text-sm text-gray-200">{product.burnTime}</p>
                                    </div>
                                )}
                                {product.materials && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Materials</p>
                                        <p className="text-sm text-gray-200">{product.materials}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-8 mb-10">
                        {/* Size Selector */}
                        {actualVariants.length > 0 && (
                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 tracking-[0.15em] mb-4">
                                    <span className="w-4 h-[1px] bg-gold/50"></span> Select Size
                                </label>
                                <SizeSelector
                                    options={actualVariants}
                                    selectedId={selectedVariantId}
                                    onChange={setSelectedVariantId}
                                />
                            </div>
                        )}

                        {/* Color/Finish Selector */}
                        {product.images.colorVariants.length > 0 && (
                            <div>
                                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400 tracking-[0.15em] mb-4">
                                    <span className="w-4 h-[1px] bg-gold/50"></span> Finish: <span className="text-white ml-1">{selectedColor?.label}</span>
                                </label>
                                <ColorSwitcher
                                    colors={product.images.colorVariants}
                                    selectedColorId={selectedColorId}
                                    onChange={handleColorChange}
                                />
                            </div>
                        )}


                        {/* Custom Scent Selection Stub (If applicable in future) */}
                        {/* {product.scents.length > 0 && ... } */}

                        {/* Quantity & Add */}
                        <div className="flex flex-col sm:flex-row items-end gap-4 pt-6 border-t border-white/10">
                            <div className="w-full sm:w-auto">
                                <label className="block text-xs font-semibold uppercase text-gray-400 tracking-[0.15em] mb-3">Quantity</label>
                                <div className="flex items-center bg-[#111] border border-white/20 rounded-lg h-14 overflow-hidden">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 text-gray-400 hover:text-white hover:bg-white/5 h-full transition-colors text-lg font-light">-</button>
                                    <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-5 text-gray-400 hover:text-white hover:bg-white/5 h-full transition-colors text-lg font-light">+</button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={cn(
                                    "w-full flex-grow h-14 rounded-lg uppercase tracking-[0.2em] font-bold text-sm transition-all duration-300 transform",
                                    product.stock > 0
                                        ? "bg-gradient-to-r from-gold to-[#cfa043] text-black hover:shadow-[0_0_20px_rgba(183,133,43,0.4)] hover:-translate-y-1 active:translate-y-0"
                                        : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
                                )}
                            >
                                {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                            </button>
                        </div>
                    </div>

                    {/* Bundle Upsell / Perks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gradient-to-br from-white/5 to-transparent p-5 border border-white/10 rounded-xl hover:border-gold/30 transition-colors group">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-gold mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <div>
                                    <p className="text-white text-sm font-medium mb-1">Premium Packaging</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">Arrives in our signature unboxing experience, perfect for gifting.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-white/5 to-transparent p-5 border border-white/10 rounded-xl hover:border-gold/30 transition-colors group">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-gold mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                                <div>
                                    <p className="text-white text-sm font-medium mb-1">Complete the Set</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">Add a matching {product.category === 'Candle' ? 'Wick Trimmer' : 'Refill Oil'} at checkout.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
