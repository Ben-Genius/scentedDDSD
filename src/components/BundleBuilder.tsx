import React, { useState } from 'react';
import { Product } from '../types';
import { useLocalCart } from '../hooks/useLocalCart';
import { formatMoney } from '../utils/formatMoney';

interface BundleBuilderProps {
    availableProducts: Product[];
}

export const BundleBuilder = ({ availableProducts }: BundleBuilderProps) => {
    const { addItem } = useLocalCart();
    const [bundleItems, setBundleItems] = useState<Product[]>([]);

    // Logic: 3 items = 10% off, 5 items = 15% off
    const discount = bundleItems.length >= 5 ? 0.15 : bundleItems.length >= 3 ? 0.10 : 0;

    const subtotal = bundleItems.reduce((sum, p) => sum + p.variants[0].priceGHS, 0); // Simplified: uses base/first variant
    const total = subtotal * (1 - discount);

    const addToBundle = (product: Product) => {
        if (bundleItems.length < 5) {
            setBundleItems([...bundleItems, product]);
        }
    };

    const removeFromBundle = (index: number) => {
        const newItems = [...bundleItems];
        newItems.splice(index, 1);
        setBundleItems(newItems);
    };

    const handleAddBundleToCart = () => {
        // Add each item to cart
        bundleItems.forEach(p => {
            addItem(p, p.variants[0], undefined, p.scents[0], undefined, 1);
        });
        setBundleItems([]);
        alert("Bundle added to cart!");
    };

    return (
        <div className="bg-white/5 border border-gold/20 rounded-lg p-6 lg:p-10">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair text-gold mb-2">Build Your Scent Collection</h2>
                <p className="text-gray-400">Select up to 5 items to create a custom box. Bundle 3+ for 10% off, 5 for 15% off.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Selection Area */}
                <div className="h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/20">
                    <h3 className="text-white font-medium mb-4 sticky top-0 bg-[#0F0F0F] py-2 z-10">Select Products</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {availableProducts.map(p => (
                            <button
                                key={p.id}
                                onClick={() => addToBundle(p)}
                                className="aspect-square bg-black border border-white/10 hover:border-gold transition-colors relative group"
                            >
                                <img src={p.images.default} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                                <span className="absolute bottom-1 left-1 text-[10px] bg-black/80 px-1 text-white truncate w-11/12 text-left">{p.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bundle State */}
                <div className="flex flex-col border-l border-white/10 pl-0 lg:pl-10">
                    <h3 className="text-gold font-playfair text-xl mb-4">Your Bundle ({bundleItems.length}/5)</h3>

                    <div className="flex-grow space-y-2 mb-4">
                        {bundleItems.length === 0 && <div className="text-gray-600 italic py-10 text-center">Empty box. Add items to start.</div>}
                        {bundleItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/5 animate-fade-in-up">
                                <div className="flex items-center gap-3">
                                    <img src={item.images.default} className="w-10 h-10 object-cover" alt="" />
                                    <span className="text-sm text-white">{item.title}</span>
                                </div>
                                <button onClick={() => removeFromBundle(idx)} className="text-gray-500 hover:text-red-500">×</button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto border-t border-white/20 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-400 text-sm">
                            <span>Subtotal</span>
                            <span>{formatMoney(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-gold text-sm">
                                <span>Bundle Discount ({(discount * 100)}%)</span>
                                <span>-{formatMoney(subtotal * discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl text-white font-playfair mt-2">
                            <span>Total</span>
                            <span>{formatMoney(total)}</span>
                        </div>

                        <button
                            onClick={handleAddBundleToCart}
                            disabled={bundleItems.length === 0}
                            className="w-full bg-gold text-black py-3 mt-4 font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                        >
                            Add Bundle to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
