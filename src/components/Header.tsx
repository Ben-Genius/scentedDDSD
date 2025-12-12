import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocalCart } from '../hooks/useLocalCart';
import cn from 'classnames';
import { IMAGES } from '@/assets';

export const Header = () => {
    const { openDrawer, getItemCount } = useLocalCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const count = getItemCount();

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'Bundles', path: '/bundles' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-sm border-b border-gold/20 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gold p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>

                {/* Logo */}
                <Link to="/" className="text-2xl font-playfair font-bold text-gold tracking-wider hover:opacity-80 transition-opacity">
                    <img src={IMAGES.logo1} alt="Logo" className="w-30 h-24 mx-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => cn(
                                "text-sm uppercase tracking-widest transition-colors duration-200 hover:text-gold ",
                                isActive ? "text-gold font-medium" : "text-gray-300"
                            )}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="text-gold hover:text-white transition-colors" aria-label="Search">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    <button
                        onClick={openDrawer}
                        className="group relative flex items-center justify-center p-2 text-gold hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black group-hover:bg-white transition-colors">
                                {count}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-gold/20 py-4 px-4 flex flex-col space-y-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-white hover:text-gold uppercase tracking-widest text-sm"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};
