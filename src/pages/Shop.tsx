import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { getProducts } from '../lib/api';
import { Product } from '../types';

export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryFilter = searchParams.get('category');

    useEffect(() => {
        getProducts().then(allProducts => {
            setProducts(allProducts);
            setFilteredProducts(allProducts);
        });
    }, []);

    useEffect(() => {
        if (!products.length) return;

        let result = products;
        if (categoryFilter) {
            result = result.filter(p => p.category.toLowerCase().includes(categoryFilter.toLowerCase().replace('gels', 'gel'))); // Simple fuzzy match
        }

        setFilteredProducts(result);
    }, [categoryFilter, products]);

    const categories = ["Hand Gel", "Shower Gel", "Candle", "Oil Burner", "Reed Diffuser", "Essential Oils", "Air Fresheners", "Potpourri"];

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col md:flex-row gap-2">
                {/* Sidebar Filters */}
                <div className="w-full md:w-48 flex-shrink-0">
                    <h3 className="text-gold font-playfair text-xl mb-4">Categories</h3>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setSearchParams({})}
                                className={`text-sm hover:text-gold ${!categoryFilter ? 'text-white' : 'text-gray-400'}`}
                            >
                                All Products
                            </button>
                        </li>
                        {categories.map(cat => (
                            <li key={cat}>
                                <button
                                    onClick={() => setSearchParams({ category: cat })}
                                    className={`text-sm hover:text-gold text-left ${categoryFilter === cat ? 'text-white' : 'text-gray-400'}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Grid */}
                <div className="flex-grow">
                    <h1 className="text-3xl font-playfair text-white ">{categoryFilter || 'All Products'}</h1>
                    <ProductGrid products={filteredProducts} variant="shop" />
                </div>
            </div>
        </div>
    );
};
