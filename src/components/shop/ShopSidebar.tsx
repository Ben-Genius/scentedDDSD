import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, ChevronDown, Check, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShopSidebarProps {
    categoryFilter: string;
    setCategoryFilter: (val: string) => void;
    scentFilter: string;
    setScentFilter: (val: string) => void;
    priceRange: [number, number];
    setPriceRange: (val: [number, number]) => void;
    onReset?: () => void;
    className?: string;
}

const FilterSection = ({
    title,
    children,
    isOpenDefault = true
}: {
    title: string;
    children: React.ReactNode;
    isOpenDefault?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    return (
        <div className="border-b border-black/5 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left group"
            >
                <h3 className="text-xs font-bold uppercase tracking-widest text-black group-hover:text-black/70 transition-colors">{title}</h3>
                <ChevronDown className={cn("w-4 h-4 text-black/40 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ShopSidebar = ({
    categoryFilter,
    setCategoryFilter,
    scentFilter,
    setScentFilter,
    priceRange,
    setPriceRange,
    onReset,
    className
}: ShopSidebarProps) => {

    // Group categories
    const categoryGroups = [
        { label: 'All Products', id: 'all' },
        { label: 'Scented Candles', id: 'Candle' },
        { label: 'Reed Diffusers', id: 'Diffuser' },
        { label: 'Room Sprays', id: 'Spray' },
        { label: 'Shower Gels', id: 'Soap' },
    ];

    return (
        <aside className={cn("w-full bg-white", className)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-1">

                {/* Categories */}
                <FilterSection title="Category" isOpenDefault={true}>
                    <div className="space-y-3">
                        {categoryGroups.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoryFilter(cat.id)}
                                className="flex items-center gap-3 w-full group"
                            >
                                <div className={cn(
                                    "w-4 h-4 border rounded-sm flex items-center justify-center transition-all",
                                    categoryFilter === cat.id ? "bg-black border-black" : "border-black/20 bg-white group-hover:border-black/40"
                                )}>
                                    {categoryFilter === cat.id && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={cn(
                                    "text-sm transition-colors",
                                    categoryFilter === cat.id ? "font-medium text-black" : "text-black/60 group-hover:text-black"
                                )}>
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </FilterSection>

                {/* Scent Family */}
                <FilterSection title="Scent Family">
                    <div className="flex flex-wrap gap-2">
                        {['Floral', 'Citrus', 'Woody', 'Fresh', 'Oriental', 'Spicy'].map((scent) => {
                            const isSelected = scentFilter.toLowerCase() === scent.toLowerCase();
                            return (
                                <button
                                    key={scent}
                                    onClick={() => setScentFilter(isSelected ? 'all' : scent.toLowerCase())}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-xs font-medium transition-all border",
                                        isSelected
                                            ? "bg-black text-white border-black"
                                            : "bg-gray-50 text-black/60 border-transparent hover:border-black/10 hover:bg-gray-100"
                                    )}
                                >
                                    {scent}
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-xs">GHS</span>
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    className="w-full pl-10 pr-2 py-3 bg-gray-50 border border-transparent hover:border-black/10 focus:border-black rounded-sm text-sm outline-none transition-all font-medium text-center"
                                />
                                <label className="absolute -top-5 left-0 text-[10px] font-bold uppercase tracking-wider text-black/30">Min</label>
                            </div>
                            <Minus className="w-4 h-4 text-black/20" />
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-xs">GHS</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full pl-10 pr-2 py-3 bg-gray-50 border border-transparent hover:border-black/10 focus:border-black rounded-sm text-sm outline-none transition-all font-medium text-center"
                                />
                                <label className="absolute -top-5 left-0 text-[10px] font-bold uppercase tracking-wider text-black/30">Max</label>
                            </div>
                        </div>
                    </div>
                </FilterSection>
            </div>

            {onReset && (
                <div className="mt-8 border-t border-black/5 pt-4 flex justify-end">
                    <button onClick={onReset} className="text-xs font-bold uppercase tracking-widest text-black hover:text-black/70 underline">
                        Clear All Filters
                    </button>
                </div>
            )}
        </aside>
    );
};
