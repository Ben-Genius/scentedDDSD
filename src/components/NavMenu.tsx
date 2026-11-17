import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationData } from '../data/navigation';

interface NavMenuProps {
    isScrolled: boolean;
    isHeaderHovered: boolean;
}

// Hover timing: a short pause before opening stops dropdowns flashing open when
// the mouse just passes over the menu; a short grace period before closing
// stops them snapping shut if the mouse overshoots an edge for a moment.
const OPEN_DELAY_MS = 90;
const CLOSE_DELAY_MS = 180;

export const NavMenu: React.FC<NavMenuProps> = ({ isScrolled, isHeaderHovered }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const openTimer = useRef<number | undefined>(undefined);
    const closeTimer = useRef<number | undefined>(undefined);

    const clearTimers = () => {
        window.clearTimeout(openTimer.current);
        window.clearTimeout(closeTimer.current);
    };

    const openMenu = useCallback((id: string, immediate = false) => {
        clearTimers();
        // Once a dropdown is showing, moving to another item switches instantly
        if (immediate || activeDropdown) {
            setActiveDropdown(id);
        } else {
            openTimer.current = window.setTimeout(() => setActiveDropdown(id), OPEN_DELAY_MS);
        }
    }, [activeDropdown]);

    const scheduleClose = () => {
        clearTimers();
        closeTimer.current = window.setTimeout(() => setActiveDropdown(null), CLOSE_DELAY_MS);
    };

    const closeNow = () => {
        clearTimers();
        setActiveDropdown(null);
    };

    useEffect(() => clearTimers, []);

    // The menu bar folds away while scrolled; never show a dropdown while it's folded
    const isCollapsed = isScrolled && !isHeaderHovered;
    const openDropdown = isCollapsed ? null : activeDropdown;

    return (
        <nav
            className={cn(
                "hidden lg:flex items-center justify-center w-full bg-champagne transition-all duration-300 ease-in-out relative",
                isCollapsed
                    ? "max-h-0 opacity-0 border-t-0 overflow-hidden"
                    : "max-h-20 opacity-100 border-t border-black/5"
            )}
            onMouseLeave={scheduleClose}
            onKeyDown={(e) => e.key === 'Escape' && closeNow()}
            onBlur={(e) => {
                // Close when keyboard focus moves out of the menu entirely
                if (!e.currentTarget.contains(e.relatedTarget as Node)) closeNow();
            }}
        >
            <div className="flex space-x-12 lg:space-x-16">
                {navigationData.filter(item => item.id !== 'home').map((item) => (
                    <div
                        key={item.id}
                        className="h-full flex items-center"
                        // The dropdown panel sits inside this element, so moving between
                        // the menu item and its panel never counts as leaving it
                        onMouseEnter={() => (item.sections ? openMenu(item.id) : scheduleClose())}
                        onFocus={() => item.sections && openMenu(item.id, true)}
                    >
                        <NavLink
                            to={item.path}
                            onClick={closeNow}
                            aria-haspopup={item.sections ? 'true' : undefined}
                            aria-expanded={item.sections ? openDropdown === item.id : undefined}
                            className={({ isActive }) => cn(
                                "nav-link text-[11px] uppercase tracking-[0.2em] font-medium font-inter transition-all duration-300 py-4",
                                isActive ? "text-black border-b-2 border-black" : "text-black/60 hover:text-black",
                                openDropdown === item.id ? "text-black" : ""
                            )}
                        >
                            {item.name}
                        </NavLink>

                        {/* Full-Width Dropdown Panel */}
                        {item.sections && openDropdown === item.id && (
                            <div className="dropdown-panel absolute top-full left-0 w-full z-50">
                                <div className="w-full bg-champagne shadow-2xl">
                                    {item.featuredImage ? (
                                        /* Featured Image Layout (Split) */
                                        <div className="flex w-full">
                                            {/* Left: Featured Image */}
                                            <div className="w-[30%] relative min-h-[400px]">
                                                <img
                                                    src={item.featuredImage}
                                                    alt={item.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/10" />
                                                <div className="absolute bottom-10 left-10 text-white z-10">
                                                    <h2 className="font-playfair text-4xl mb-4 italic text-white drop-shadow-md">{item.name}</h2>
                                                    <Link
                                                        to={item.path}
                                                        onClick={closeNow}
                                                        className="inline-block px-6 py-2 border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-[0.2em] backdrop-blur-sm"
                                                    >
                                                        View All
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Right: Sections List */}
                                            <div className="w-[70%] p-16 bg-gradient-to-br from-champagne to-champagne/50">
                                                <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                                                    {item.sections.map((section, idx) => (
                                                        <div key={idx} className="space-y-4">
                                                            <Link
                                                                to={section.path || section.links[0]?.path || item.path}
                                                                onClick={closeNow}
                                                                className="group block"
                                                            >
                                                                <h3 className="font-playfair text-xl text-black group-hover:text-black/70 transition-colors mb-2 flex items-center gap-3">
                                                                    {section.title}
                                                                    <span className="h-px flex-1 bg-black/10 group-hover:bg-black/20 transition-colors" />
                                                                </h3>
                                                            </Link>
                                                            <ul className="space-y-2.5">
                                                                {section.links.map((link) => (
                                                                    <li key={link.path}>
                                                                        <Link
                                                                            to={link.path}
                                                                            onClick={closeNow}
                                                                            className="text-[11px] uppercase tracking-[0.15em] font-medium text-black/50 hover:text-black hover:translate-x-1 transition-all duration-300 block py-0.5"
                                                                        >
                                                                            {link.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Standard Grid Layout (Candles etc) */
                                        <div className="container mx-auto px-8 lg:px-12 py-0">
                                            {/* Grid Layout - Jo Malone Style */}
                                            <div className={cn(
                                                "grid gap-x-8 lg:gap-x-12 gap-y-12",
                                                item.sections.length === 5 ? "grid-cols-5" :
                                                    item.sections.length === 4 ? "grid-cols-4" :
                                                        item.sections.length === 3 ? "grid-cols-3" :
                                                            "grid-cols-4"
                                            )}>
                                                {item.sections.map((section, idx) => (
                                                    <div key={idx} className="group/card flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-transparent hover:border-black/5 relative overflow-hidden">

                                                        {/* Decorative Background for Image - Subtle Glow */}
                                                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-champagne-dark/20 to-transparent rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                                        {/* Section Image */}
                                                        {section.image && (
                                                            <Link
                                                                to={section.path || section.links[0]?.path || item.path}
                                                                onClick={closeNow}
                                                                className="w-[180px] h-[220px] flex items-center justify-center relative mb-6 z-10"
                                                            >
                                                                <div className="absolute inset-x-4 bottom-0 h-4 bg-black/20 blur-xl rounded-[100%] opacity-0 group-hover/card:opacity-40 transition-opacity duration-500 translate-y-2" />
                                                                <img
                                                                    src={section.image}
                                                                    alt={section.title}
                                                                    className="h-full w-auto object-contain transition-transform duration-700 ease-out group-hover/card:scale-105 group-hover/card:-translate-y-2 drop-shadow-lg"
                                                                />
                                                            </Link>
                                                        )}

                                                        {/* Section Title */}
                                                        <div className="space-y-4 w-full max-w-[220px] relative z-10">
                                                            <Link
                                                                to={section.path || section.links[0]?.path || item.path}
                                                                onClick={closeNow}
                                                                className="block"
                                                            >
                                                                <h3 className="font-playfair text-xl font-medium text-black mb-1 group-hover/card:text-black/80 transition-colors">
                                                                    {section.title}
                                                                </h3>
                                                                {/* Animated Underline */}
                                                                <div className="h-px w-12 bg-black/10 mx-auto group-hover/card:w-24 group-hover/card:bg-black/30 transition-all duration-500 ease-out" />
                                                            </Link>

                                                            {/* Links */}
                                                            <ul className="flex flex-col space-y-2 items-center pt-2">
                                                                {section.links.map((link) => (
                                                                    <li key={link.path}>
                                                                        <Link
                                                                            to={link.path}
                                                                            onClick={closeNow}
                                                                            className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/50 hover:text-black transition-all duration-300 block py-1 hover:scale-105"
                                                                        >
                                                                            {link.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};  