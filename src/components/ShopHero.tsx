import React from 'react';
import { IMAGES } from '@/assets';

interface ShopHeroProps {
    onCategorySelect: (category: string) => void;
}

export const ShopHero = ({ onCategorySelect }: ShopHeroProps) => {
    return (
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
                        <button onClick={() => onCategorySelect('all')} className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
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
                        <button onClick={() => onCategorySelect('Diffuser')} className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
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
                        <button onClick={() => onCategorySelect('Bundle')} className="bg-champagne-100 text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                            Shop Gifts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
