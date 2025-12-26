import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, LayoutGrid, List, Check, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShopToolbarProps {
    resultCount: number;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    onToggleFilter: () => void;
}

export const ShopToolbar = ({
    resultCount,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    onToggleFilter
}: ShopToolbarProps) => {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortOptions = [
        { label: 'Newest Arrivals', value: 'newest' },
        { label: 'Best Sellers', value: 'popular' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
    ];

    const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Sort By';

    return (
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/5">
            {/* Left: Filter Toggle & View Mode */}
            <div className="flex items-center gap-6">
            


                <div className="hidden md:flex items-center bg-black/5 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black")}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black")}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
                <span className="hidden md:block text-xs font-medium text-black uppercase tracking-widest">
                    {resultCount} Items
                </span>
            </div>

            {/* Right: Sort Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:text-black/70 transition-colors"
                >
                    <span>{currentSortLabel}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isSortOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isSortOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-sm shadow-xl border border-black/5 overflow-hidden z-20"
                            >
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setIsSortOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between",
                                                sortBy === option.value ? "text-black font-bold bg-gray-50" : "text-black/60 hover:bg-gray-50"
                                            )}
                                        >
                                            {option.label}
                                            {sortBy === option.value && <Check className="w-3 h-3" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
