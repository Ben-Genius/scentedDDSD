import React from 'react';
import cn from 'classnames';

interface SizeSelectorProps {
    options: { id: string; label: string; sizeLabel?: string }[];
    selectedId: string;
    onChange: (id: string) => void;
}

export const SizeSelector = ({ options, selectedId, onChange }: SizeSelectorProps) => {
    return (
        <div
            role="radiogroup"
            aria-label="Product Size"
            className="flex flex-wrap gap-2"
        >
            {options.map((option) => {
                const isSelected = selectedId === option.id;
                return (
                    <button
                        key={option.id}
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => onChange(option.id)}
                        className={cn(
                            "relative px-4 py-2 border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold",
                            isSelected
                                ? "border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(183,133,43,0.2)]"
                                : "border-white/20 text-gray-400 hover:border-gold/50"
                        )}
                    >
                        <span className="block font-medium">{option.label}</span>
                        {option.sizeLabel && (
                            <span className="block text-[10px] uppercase tracking-wider opacity-60 mt-0.5">{option.sizeLabel}</span>
                        )}

                        {isSelected && (
                            <span className="absolute inset-0 border border-gold pointer-events-none" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
