import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, ColorVariant } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { useLocalCart } from '../hooks/useLocalCart';
import { SizeSelector } from './SizeSelector';
import { ColorSwitcher } from './ColorSwitcher';
import cn from 'classnames';

interface ProductDetailProps {
    product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
    const { addItem } = useLocalCart();

    // State
    const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variants[0]?.id);
    const [selectedColorId, setSelectedColorId] = useState<string | undefined>(product.images.colorVariants[0]?.colorId);
    const [selectedScent, setSelectedScent] = useState<string | undefined>(product.scents[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(product.images.default);

    // Derived state
    const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
    const selectedColor = product.images.colorVariants.find(c => c.colorId === selectedColorId);

    // Effect: Update image when color changes
    useEffect(() => {
        if (selectedColor) {
            setActiveImage(selectedColor.image);
        } else {
            setActiveImage(product.images.default);
        }
    }, [selectedColor, product.images.default]);

    // Price Calculation
    const calculatePrice = () => {
        let price = selectedVariant.priceGHS;
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
        <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in">
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-[#111] overflow-hidden rounded-sm relative group">
                        <img
                            src={activeImage}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {[product.images.default, ...(product.images.gallery || [])].map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={cn(
                                    "w-20 h-20 flex-shrink-0 border bg-[#111]",
                                    activeImage === img ? "border-gold" : "border-transparent hover:border-gold/50"
                                )}
                            >
                                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info & Controls */}
                <div className="flex flex-col">
                    <p className="text-gold text-sm tracking-widest uppercase mb-2">{product.category}</p>
                    <h1 className="text-4xl md:text-5xl font-playfair text-white mb-4">{product.title}</h1>
                    <p className="text-2xl text-gold font-light mb-6 flex items-baseline gap-2">
                        {formatMoney(currentPrice)}
                        {selectedColor?.priceDelta ? <span className="text-xs text-gray-400 font-inter">(includes finish +{formatMoney(selectedColor.priceDelta)})</span> : null}
                    </p>

                    <div className="text-gray-300 leading-relaxed mb-8 border-b border-white/10 pb-8">
                        {product.longDescription}
                        {product.burnTime && <p className="mt-4 text-sm text-gray-400">Burn Time: {product.burnTime}</p>}
                        {product.materials && <p className="mt-1 text-sm text-gray-400">Material: {product.materials}</p>}
                    </div>

                    <div className="space-y-8 mb-8">
                        {/* Size Selector */}
                        {product.variants.length > 0 && (
                            <div>
                                <label className="block text-xs uppercase text-gray-500 tracking-wider mb-3">Size</label>
                                <SizeSelector
                                    options={product.variants}
                                    selectedId={selectedVariantId}
                                    onChange={setSelectedVariantId}
                                />
                            </div>
                        )}

                        {/* Color/Finish Selector */}
                        {product.images.colorVariants.length > 0 && (
                            <div>
                                <label className="block text-xs uppercase text-gray-500 tracking-wider mb-3">
                                    Finish: <span className="text-white ml-2">{selectedColor?.label}</span>
                                </label>
                                <ColorSwitcher
                                    colors={product.images.colorVariants}
                                    selectedColorId={selectedColorId}
                                    onChange={setSelectedColorId}
                                />
                            </div>
                        )}

                        {/* Scent Selector */}
                        {product.scents.length > 0 && (
                            <div>
                                <label className="block text-xs uppercase text-gray-500 tracking-wider mb-3">Scent</label>
                                <div className="flex flex-wrap gap-2">
                                    {product.scents.map(scent => (
                                        <button
                                            key={scent}
                                            onClick={() => setSelectedScent(scent)}
                                            className={cn(
                                                "px-4 py-2 text-sm border transition-colors",
                                                selectedScent === scent
                                                    ? "bg-white text-black border-white font-medium"
                                                    : "text-gray-400 border-white/20 hover:border-gold hover:text-gold"
                                            )}
                                        >
                                            {scent}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Add */}
                        <div className="flex items-end gap-4 pt-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-500 tracking-wider mb-3">Quantity</label>
                                <div className="flex items-center border border-white/20 h-12">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-400 hover:text-white h-full transition-colors">-</button>
                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-400 hover:text-white h-full transition-colors">+</button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-grow h-12 bg-gold text-black uppercase tracking-widest font-bold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                            </button>
                        </div>
                    </div>

                    {/* Bundle Upsell Stub */}
                    <div className="bg-white/5 p-4 border border-gold/20 rounded">
                        <p className="text-gold text-sm font-playfair mb-2">Complete the Experience</p>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                            <span>Add matching {product.category === 'Candle' ? 'Wick Trimmer' : 'Refill Oil'}?</span>
                            <button className="text-white underline hover:text-gold">Add to Bundle</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
