import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { NavItem, navigationData } from '@/data/navigation';
import { ChevronRight, ChevronLeft, Plus, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState<NavItem | null>(null);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBack = () => {
        setActiveItem(null);
        setExpandedSections(new Set());
    };

    const toggleSection = (title: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(title)) {
            newExpanded.delete(title);
        } else {
            // Optional: Close others? Jo Malone keeps them open. Let's keep multiple open support.
            newExpanded.add(title);
        }
        setExpandedSections(newExpanded);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
        handleBack();
    };

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] lg:hidden transition-all duration-300 ease-in-out",
                isOpen ? "visible" : "invisible delay-300"
            )}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                className={cn(
                    "absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-[#FFFBF5] shadow-2xl transition-transform duration-300 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 bg-[#FFFBF5]">
                    {activeItem ? (
                        <button
                            onClick={handleBack}
                            className="flex text-black items-center text-xs tracking-[0.2em] uppercase font-medium hover:opacity-60 transition-opacity"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1 text-black" />
                            Menu
                        </button>
                    ) : (
                        <span className="text-xs tracking-[0.2em] uppercase font-medium text-black ">Menu</span>
                    )}

                    <button
                        onClick={onClose}
                        className="hover:opacity-60 transition-opacity p-2 -mr-2"
                    >
                        <X className="w-5 h-5 text-black" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
                    {/* Main Menu Layer */}
                    <div
                        className={cn(
                            "absolute inset-0 p-6 transition-all duration-300 ease-in-out w-full",
                            activeItem ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
                        )}
                    >
                        {/* Logo for brand presence */}
                        <div className="mb-8 flex justify-center">
                            <img src={IMAGES.logo} alt="Scented by DDSD" className="w-[250px] object-contain opacity-100" />
                        </div>

                        <div className="flex flex-col space-y-6">
                            {navigationData.map((item) => (
                                <div key={item.id} className="border-b border-black/5 pb-4 last:border-0">
                                    {item.sections ? (
                                        <button
                                            onClick={() => setActiveItem(item)}
                                            className="flex items-center justify-between w-full group py-1"
                                        >
                                            <span className="text-lg font-playfair font-medium text-black group-hover:opacity-70 transition-opacity text-left">
                                                {item.name}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleNavigate(item.path)}
                                            className="flex items-center justify-between w-full group py-1"
                                        >
                                            <span className="text-lg font-playfair font-medium text-black group-hover:opacity-70 transition-opacity text-left">
                                                {item.name}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                     
                    </div>

                    {/* Sub Menu Layer */}
                    <div
                        className={cn(
                            "absolute inset-0 p-6 transition-all duration-300 ease-in-out w-full bg-[#FFFBF5]",
                            activeItem ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                        )}
                    >
                        {activeItem && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-playfair mb-8 text-black">{activeItem.name}</h2>

                                {/* Explore Link */}
                                <button
                                    onClick={() => handleNavigate(activeItem.path)}
                                    className="text-sm text-black font-medium border-b border-black/20 pb-1 mb-8 w-fit hover:border-black transition-colors block text-left"
                                >
                                    Explore all {activeItem.name}
                                </button>

                                {/* Sections Accordion */}
                                <div className="space-y-6">
                                    {activeItem.sections?.map((section, idx) => (
                                        <div key={idx} className="border-b border-black/5 pb-4 last:border-0">
                                            <button
                                                onClick={() => toggleSection(section.title)}
                                                className="flex items-center justify-between w-full py-2 group"
                                            >
                                                <span className="text-base font-medium text-black/90 group-hover:text-black transition-colors text-left">
                                                    {section.title}
                                                </span>
                                                <span className="text-black/50 group-hover:text-black transition-colors">
                                                    {expandedSections.has(section.title) ? (
                                                        <Minus className="w-4 h-4" />
                                                    ) : (
                                                        <Plus className="w-4 h-4" />
                                                    )}
                                                </span>
                                            </button>

                                            {/* Accordion Content */}
                                            <div
                                                className={cn(
                                                    "grid transition-all duration-300 ease-in-out",
                                                    expandedSections.has(section.title)
                                                        ? "grid-rows-[1fr] opacity-100 mt-2"
                                                        : "grid-rows-[0fr] opacity-0 mt-0"
                                                )}
                                            >
                                                <div className="overflow-hidden">
                                                    <ul className="space-y-3 pl-2 pb-2 mt-2">
                                                        {/* Link to Section Main Page */}
                                                        {section.path && (
                                                            <li>
                                                                <button
                                                                    onClick={() => handleNavigate(section.path!)}
                                                                    className="text-sm text-black font-medium hover:opacity-70 transition-opacity flex items-center mb-2"
                                                                >
                                                                    View all {section.title}
                                                                </button>
                                                            </li>
                                                        )}

                                                        {section.links.map((link) => (
                                                            <li key={link.path}>
                                                                <button
                                                                    onClick={() => handleNavigate(link.path)}
                                                                    className="text-sm text-black/60 hover:text-black transition-colors py-1 flex items-center w-full text-left"
                                                                >
                                                                    {link.name}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
