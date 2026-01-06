import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocalCart } from '../hooks/useLocalCart';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets';
import { navigationData } from '@/data/navigation';
import { NavMenu } from './NavMenu';

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
                            className="md:hidden text-black hover:opacity-60 transition-opacity"
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
                                "hidden md:block text-[11px] uppercase tracking-[0.2em] font-medium font-inter transition-all duration-300",
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
                    <div className="col-span-3 flex items-center justify-end space-x-8">
                        <Link
                            to="/contact"
                            className="hidden md:flex items-center text-black hover:opacity-60 transition-opacity group"
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
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-champagne border-b border-black/10 py-8 px-8 flex flex-col space-y-6 shadow-lg animate-slide-in-right z-50 h-screen overflow-y-auto">
                        {navigationData.map((link) => (
                            <div key={link.name} className="border-b border-black/5 pb-4">
                                <Link
                                    to={link.path}
                                    className="text-black hover:opacity-60 uppercase tracking-[0.2em] text-sm font-medium block mb-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>

                                {/* Mobile Sub-menu */}
                                {link.sections && (
                                    <div className="pl-4 space-y-3">
                                        {link.sections.map((section) => (
                                            <div key={section.title} className="space-y-2">
                                                <h5 className="text-xs uppercase tracking-wider text-black/50 font-medium">
                                                    {section.title}
                                                </h5>
                                                <ul className="space-y-2">
                                                    {section.links.map((subLink) => (
                                                        <li key={subLink.path}>
                                                            <Link
                                                                to={subLink.path}
                                                                className="text-sm text-black/70 hover:text-black block"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                {subLink.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="pt-6">
                            <Link
                                to="/contact"
                                className="block text-black hover:opacity-60 uppercase tracking-[0.2em] text-sm mb-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};