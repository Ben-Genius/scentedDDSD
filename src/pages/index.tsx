import React from 'react';
export * from './Home';
export * from './Shop';
export * from './ProductPage';
export * from './Bundles';
export * from './Checkout';
export * from './AdminInventory';

// Simple placeholders
export const Collections = () => <div className="pt-24 container mx-auto text-center text-gray-500">Collections Page (Coming Soon)</div>;
export const About = () => <div className="pt-24 container mx-auto text-center text-gray-400 max-w-2xl px-4"><h1 className="text-3xl font-playfair text-white mb-6">About Us</h1><p>Scented by DDSD is a luxury home fragrance brand...</p></div>;
export const Contact = () => <div className="pt-24 container mx-auto text-center text-gray-500">Contact Us</div>;
export const HowToOrder = () => <div className="pt-24 container mx-auto text-center text-gray-500">How To Order</div>;
export const BlogList = () => <div className="pt-24 container mx-auto text-center text-gray-500">Blog</div>;
export const BlogPost = () => <div className="pt-24 container mx-auto text-center text-gray-500">Blog Post</div>;
