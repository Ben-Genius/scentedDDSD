import React from 'react';
import cn from 'classnames';
import { ColorVariant } from '../types';

interface ColorSwitcherProps {
    colors: ColorVariant[];
    selectedColorId?: string;
    onChange: (colorId: string) => void;
}

export const ColorSwitcher = ({ colors, selectedColorId, onChange }: ColorSwitcherProps) => {
    if (!colors || colors.length === 0) return null;

    return (
        <div className="flex gap-3">
            {colors.map((color) => {
                const isSelected = selectedColorId === color.colorId;
                return (
                    <button
                        key={color.colorId}
                        onClick={() => onChange(color.colorId)}
                        className={cn(
                            "group relative w-10 h-10 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black",
                            isSelected ? "border-gold scale-110" : "border-transparent hover:scale-105"
                        )}
                        aria-label={`Select color ${color.label}`}
                        title={color.label}
                    >
                        <img
                            src={color.image}
                            alt=""
                            className="w-full h-full object-cover rounded-full"
                        />
                        {isSelected && (
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap text-gold font-medium">
                                {color.label}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};
