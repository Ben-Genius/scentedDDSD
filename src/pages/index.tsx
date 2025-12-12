import React from 'react';
import { Blog } from './Blog';
export { Home } from './Home';
export { Shop } from './Shop';
export { ProductPage } from './ProductPage';
export { Bundles } from './Bundles';
export { Checkout } from './Checkout';
export { AdminInventory } from './AdminInventory';

// Simple placeholders
export const Collections = () => <div className=""><Blog/></div>;
export { About } from './About';
export const Contact = () => <div className="pt-24 container mx-auto text-center text-gray-500">Contact Us</div>;
export const HowToOrder = () => <div className="pt-24 container mx-auto text-center text-gray-500"></div>;
export const BlogList = () => <div className="pt-24  mx-auto text-center text-gray-500"> <Blog/> </div>;
export const BlogPost = () => <div className="pt-24 container mx-auto text-center text-gray-500">Blog Post</div>;
