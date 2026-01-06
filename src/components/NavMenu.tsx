import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationData } from '../data/navigation';

interface NavMenuProps {
    isScrolled: boolean;
    isHeaderHovered: boolean;
}

export const NavMenu: React.FC<NavMenuProps> = ({ isScrolled, isHeaderHovered }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <nav
            className={cn(
                "hidden md:flex items-center justify-center w-full bg-champagne transition-all duration-300 ease-in-out relative",
                isScrolled && !isHeaderHovered
                    ? "max-h-0 opacity-0 border-t-0 overflow-hidden"
                    : "max-h-20 opacity-100 border-t border-black/5"
            )}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="flex space-x-12 lg:space-x-16">
                {navigationData.filter(item => item.id !== 'home').map((item) => (
                    <div
                        key={item.id}
                        className="h-full flex items-center"
                        onMouseEnter={() => item.sections && setActiveDropdown(item.id)}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => cn(
                                "nav-link text-[11px] uppercase tracking-[0.2em] font-medium font-inter transition-all duration-300 py-4",
                                isActive ? "text-black border-b-2 border-black" : "text-black/60 hover:text-black",
                                activeDropdown === item.id ? "text-black" : ""
                            )}
                        >
                            {item.name}
                        </NavLink>

                        {/* Full-Width Dropdown Panel */}
                        {item.sections && activeDropdown === item.id && (
                            <div
                                className="dropdown-panel absolute top-full left-0 w-full z-50"
                                onMouseEnter={() => setActiveDropdown(item.id)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <div className="w-full bg-champagne shadow-2xl">
                                    <div className="container mx-auto px-8 lg:px-12 py-16">
                                        {/* Grid Layout - Jo Malone Style */}
                                        <div className={cn(
                                            "grid gap-x-8 lg:gap-x-12 gap-y-12",
                                            item.sections.length === 5 ? "grid-cols-5" :
                                                item.sections.length === 4 ? "grid-cols-4" :
                                                    item.sections.length === 3 ? "grid-cols-3" :
                                                        "grid-cols-4"
                                        )}>
                                            {item.sections.map((section, idx) => (
                                                <div key={idx} className="flex flex-col space-y-6 group/section">
                                                    {/* Section Image */}
                                                    {section.image && (
                                                        <Link
                                                            to={section.path || section.links[0]?.path || item.path}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="w-[200px] h-[200px] object-contain overflow-hidden bg-gray-50 relative"
                                                        >
                                                            <img
                                                                src={section.image}
                                                                alt={section.title}
                                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/section:scale-105"
                                                            />
                                                            {/* Subtle overlay on hover */}
                                                            <div className="absolute inset-0 bg-black/0 group-hover/section:bg-black/5 transition-all duration-300" />
                                                        </Link>
                                                    )}

                                                    {/* Section Title */}
                                                    <div className="space-y-4 w-[200px]">
                                                        <Link
                                                            to={section.path || section.links[0]?.path || item.path}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="font-inter text-base font-medium text-black hover:opacity-70 transition-opacity block border-b border-black/10 pb-2"
                                                        >
                                                            {section.title}
                                                        </Link>

                                                        {/* Links */}
                                                        <ul className="flex flex-col space-y-1">
                                                            {section.links.map((link) => (
                                                                <li key={link.path}>
                                                                    <Link
                                                                        to={link.path}
                                                                        onClick={() => setActiveDropdown(null)}
                                                                        className="text-sm font-normal text-black/70 hover:text-black transition-all duration-200 block py-1 hover:translate-x-1"
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
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};  