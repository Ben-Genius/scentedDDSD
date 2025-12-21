import React, { useState } from 'react';
import { Product } from '../types';
import { useLocalCart } from '../hooks/useLocalCart';
import { formatMoney } from '../utils/formatMoney';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BundleBuilderProps {
    availableProducts: Product[];
}

export const BundleBuilder = ({ availableProducts }: BundleBuilderProps) => {
    const { addItem } = useLocalCart();
    const [bundleItems, setBundleItems] = useState<Product[]>([]);

    // Discount Logic
    const discount = bundleItems.length >= 5 ? 0.15 : bundleItems.length >= 3 ? 0.10 : 0;
    const nextTier = bundleItems.length < 3 ? 3 : bundleItems.length < 5 ? 5 : null;
    const itemsNeeded = nextTier ? nextTier - bundleItems.length : 0;

    const subtotal = bundleItems.reduce((sum, p) => sum + p.variants[0].priceGHS, 0);
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
        bundleItems.forEach(p => {
            addItem(p, p.variants[0], undefined, p.scents[0], undefined, 1);
        });
        setBundleItems([]);
        alert("Bundle added to cart!");
    };

    return (
        <div className="flex flex-col gap-12">

            {/* 1. Sticky "The Stage" - Visual representation of the box */}
            <div className="sticky top-4 z-40">
                <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl p-6 md:p-8 transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8">

                        {/* Box Visualizer */}
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-playfair font-medium">Your Collection</h3>
                                <div className="text-right">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/40 block mb-1">
                                        {bundleItems.length}/5 Items
                                    </span>
                                    {itemsNeeded > 0 ? (
                                        <p className="text-xs text-gold font-bold">Add {itemsNeeded} more for {nextTier === 3 ? '10%' : '15%'} OFF</p>
                                    ) : (
                                        <p className="text-xs text-green-600 font-bold">Max Discount Unlocked (15%)</p>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gold"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(bundleItems.length / 5) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                            </div>

                            {/* Slots */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-black/10 flex items-center justify-center relative overflow-hidden bg-gray-50/50">
                                        <AnimatePresence mode='popLayout'>
                                            {bundleItems[i] ? (
                                                <motion.div
                                                    layoutId={`item-${i}`}
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    className="absolute inset-0 z-10"
                                                >
                                                    <img src={bundleItems[i].images.default} alt="" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeFromBundle(i)}
                                                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <span className="text-xs text-black/20 font-bold">{i + 1}</span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary & Action */}
                        <div className="md:w-72 w-full flex flex-col gap-4 border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-8">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-black/50">Value</span>
                                    <span className="line-through text-black/50">{formatMoney(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-playfair items-baseline">
                                    <span>Total</span>
                                    <span>{formatMoney(total)}</span>
                                </div>
                                {discount > 0 && <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded inline-block">You save {formatMoney(subtotal - total)}</span>}
                            </div>

                            <button
                                onClick={handleAddBundleToCart}
                                disabled={bundleItems.length === 0}
                                className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. "The Market" - Scrollable product selection */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-playfair">Select Products</h3>
                    <div className="flex gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full text-black/60">Candles</span>
                        <span className="text-xs font-bold uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full text-black/60">Diffusers</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {availableProducts.map((product) => (
                        <motion.button
                            layout
                            key={product.id}
                            disabled={bundleItems.length >= 5}
                            onClick={() => addToBundle(product)}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group text-left"
                        >
                            <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                                <img src={product.images.default} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-playfair text-lg leading-tight mb-1 group-hover:underline decoration-gold underline-offset-4 decoration-1">{product.title}</h4>
                                <span className="text-sm font-medium text-black/50">{formatMoney(product.variants[0].priceGHS)}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

        </div>
    );
};
