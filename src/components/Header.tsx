import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocalCart } from '../hooks/useLocalCart';
import { useCurrency, CURRENCIES } from '../hooks/useCurrency';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets';
import { Globe, ChevronDown, Check } from 'lucide-react';

import { NavMenu } from './NavMenu';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
    const { openDrawer, getItemCount } = useLocalCart();
    const { currency, setCurrency } = useCurrency();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const currencyRef = useRef<HTMLDivElement>(null);
    const count = getItemCount();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
                setIsCurrencyOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsCurrencyOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setIsScrolled((prev) => {
                        if (!prev && currentScrollY > 100) return true;
                        if (prev && currentScrollY < 20) return false;
                        return prev;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Placeholder to prevent layout shift */}
            <div className="h-[80px] md:h-[144px] w-full" />

            <header
                className="fixed top-0 z-50 w-full bg-champagne border-b border-black/5 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Top Bar - Logo and Actions */}
                <div className="container mx-auto px-6 h-auto py-2 grid grid-cols-12 items-center">
                    {/* Left: Mobile Menu & Home */}
                    <div className="col-span-3 flex items-center justify-start space-x-6">
                        <button
                            className="lg:hidden text-black hover:opacity-60 transition-opacity"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <NavLink
                            to='/'
                            className={({ isActive }) => cn(
                                "hidden lg:block text-[11px] uppercase tracking-[0.2em] font-medium font-inter transition-all duration-300",
                                isActive ? "text-black border-b border-black" : "text-black/60 hover:text-black"
                            )}
                        >
                            Home 🏠
                        </NavLink>
                    </div>

                    {/* Center: Logo */}
                    <div className="col-span-6 flex justify-center">
                        <Link
                            to="/"
                            className="text-3xl font-playfair font-medium text-black tracking-widest hover:opacity-80 transition-opacity uppercase"
                        >
                            <img
                                src={IMAGES.logo}
                                alt="Scented by DDSD"
                                className="h-16 md:h-20 object-contain block"
                            />
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="col-span-3 flex items-center justify-end space-x-4 md:space-x-8">
                        {/* Currency Selector */}
                        <div className="relative" ref={currencyRef}>
                            <button
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                className="flex items-center text-black hover:opacity-60 transition-opacity gap-1 py-1"
                                title="Change currency"
                                aria-expanded={isCurrencyOpen}
                                aria-haspopup="listbox"
                            >
                                <Globe className="w-4 h-4 opacity-70" strokeWidth={1.5} />
                                <span className="text-[10px] md:text-xs uppercase tracking-widest font-inter font-medium">
                                    {currency}
                                </span>
                                <ChevronDown className={cn("w-3 h-3 opacity-60 transition-transform duration-200", isCurrencyOpen && "rotate-180")} />
                            </button>

                            {isCurrencyOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#FFFBF5] border border-black/10 rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 font-inter">
                                    <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-black/40 font-semibold border-b border-black/5">
                                        Select Currency
                                    </div>
                                    {(Object.keys(CURRENCIES) as Array<keyof typeof CURRENCIES>).map((code) => {
                                        const c = CURRENCIES[code];
                                        return (
                                            <button
                                                key={c.code}
                                                onClick={() => {
                                                    setCurrency(c.code);
                                                    setIsCurrencyOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-black/5 transition-colors",
                                                    currency === c.code ? "text-black font-semibold bg-black/[0.04]" : "text-black/70"
                                                )}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className="text-sm leading-none">{c.flag}</span>
                                                    <span className="font-medium">{c.code}</span>
                                                    <span className="text-black/40">({c.symbol})</span>
                                                </span>
                                                {currency === c.code && <Check className="w-3.5 h-3.5 text-black" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <Link
                            to="/contact"
                            className="hidden lg:flex items-center text-black hover:opacity-60 transition-opacity group"
                        >
                            <span className="text-xs uppercase tracking-widest font-inter hidden lg:inline-block mr-2">
                                Help
                            </span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>

                        <button
                            onClick={openDrawer}
                            className="group relative flex items-center justify-center text-black hover:opacity-60 transition-opacity"
                            aria-label="Shopping cart"
                        >
                            <span className="text-xs uppercase tracking-widest font-inter hidden lg:inline-block mr-2">
                                Cart
                            </span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>

                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center bg-black text-white text-[9px] font-medium rounded-none">
                                    {count}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation Menu with Dropdown */}
                <NavMenu isScrolled={isScrolled} isHeaderHovered={isHovered} />

                {/* Mobile Nav Drawer */}
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </header>
        </>
    );
};