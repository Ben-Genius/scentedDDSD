import React from 'react';
import { cn } from '@/lib/utils';
import { Flame, Wind, Droplets, Star, Sparkles, Gift } from 'lucide-react';

interface ShopCategoriesProps {
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export const ShopCategories = ({ activeCategory, onSelectCategory }: ShopCategoriesProps) => {
    const categories = [
        { id: 'all', label: 'All', icon: <Star className="w-5 h-5" /> },
        { id: 'Candle', label: 'Candles', icon: <Flame className="w-5 h-5" /> },
        { id: 'Diffuser', label: 'Diffusers', icon: <Wind className="w-5 h-5" /> },
        { id: 'Spray', label: 'Oils', icon: <Droplets className="w-5 h-5" /> },
        { id: 'Soap', label: 'Hand Gel', icon: <Sparkles className="w-5 h-5" /> },
        { id: 'Bundle', label: 'Shower Gel', icon: <Gift className="w-5 h-5" /> },
    ];

    return (
        <div className="w-full overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex justify-center min-w-max px-4 gap-8 md:gap-12">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className="group flex flex-col items-center gap-3 "
                    >
                        <div className={cn(
                            "w-24 h-24 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 border border-[#efece7]",
                            activeCategory === cat.id
                                ? "bg-champagne-200 "
                                : "bg-[#f9f5f0] hover:bg-champagne"
                        )}>
                            <div className={cn(
                                "text-black/60 transition-colors duration-300",
                                activeCategory === cat.id ? "text-black" : "group-hover:text-black"
                            )}>
                                {cat.icon}
                            </div>
                        </div>
                        <span className={cn(
                            "text-xs font-bold uppercase tracking-wider transition-colors",
                            activeCategory === cat.id ? "text-black" : "text-black/40 group-hover:text-black/70"
                        )}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};
