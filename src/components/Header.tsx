import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocalCart } from '../hooks/useLocalCart';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets';

export const Header = () => {
    const { openDrawer, getItemCount } = useLocalCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const count = getItemCount();

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setIsScrolled((prev) => {
                        // Hysteresis: prevent flicker by adding a buffer
                        if (!prev && currentScrollY > 100) return true; // Higher threshold to collapse
                        if (prev && currentScrollY < 20) return false; // Must scroll near top to expand
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

    const navLinks = [
        { name: 'Home', path: '/' },

        { name: 'Shop', path: '/shop' },
        { name: 'Bundles', path: '/bundles' },
        // { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
    ];

    return (
        <>
            {/* Placeholder to prevent layout shift */}
            <div className="h-[80px] md:h-[144px] w-full" />

            <header
                className="fixed top-0 z-50 w-full bg-champagne border-b border-black/5 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="container mx-auto px-6 h-auto py-2 grid grid-cols-12 items-center">

                    {/* Left: Mobile Menu & Search */}
                    <div className="col-span-3 flex items-center justify-start space-x-6">
                        <button
                            className="md:hidden text-black hover:opacity-60 transition-opacity"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                        <button className="hidden md:flex text-black hover:opacity-60 transition-opacity">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className="col-span-6 flex justify-center">
                        <Link to="/" className="text-3xl font-playfair font-medium text-black tracking-widest hover:opacity-80 transition-opacity uppercase">
                            <img src={IMAGES.logo} alt="Scented by DDSD" className="h-16 md:h-20 object-contain block" />
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="col-span-3 flex items-center justify-end space-x-8">
                        <button className="hidden md:block text-black hover:opacity-60 transition-opacity">
                            <span className="text-xs uppercase tracking-widest font-inter hidden lg:inline-block mr-2">Log In</span>
                            <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </button>

                        <button
                            onClick={openDrawer}
                            className="group relative flex items-center justify-center text-black hover:opacity-60 transition-opacity"
                        >
                            <span className="text-xs uppercase tracking-widest font-inter hidden lg:inline-block mr-2">Cart</span>
                            <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>

                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center bg-black text-white text-[9px] font-medium rounded-none">
                                    {count}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Nav - Centered Below Logo with Hairline Borders */}
                <nav
                    className={cn(
                        "hidden md:flex items-center justify-center py-3.5 bg-champagne overflow-hidden transition-all duration-300 ease-in-out",
                        isScrolled && !isHovered ? "max-h-0 py-0 opacity-0 border-t-0" : "max-h-20 opacity-100 border-t border-black/5"
                    )}
                >
                    <div className="flex space-x-16">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => cn(
                                    "text-[11px] uppercase tracking-[0.2em] font-medium font-inter transition-all duration-300",
                                    isActive ? "text-black border-b border-black" : "text-black/60 hover:text-black"
                                )}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-champagne border-b border-black/10 py-8 px-8 flex flex-col space-y-6 shadow-none animate-slide-in-right z-50 h-screen">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-black hover:opacity-60 uppercase tracking-[0.2em] text-sm font-medium border-b border-black/5 pb-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-6">
                            <Link to="/account" className="block text-black hover:opacity-60 uppercase tracking-[0.2em] text-sm mb-4">My Account</Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};
