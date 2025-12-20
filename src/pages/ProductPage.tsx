import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { useInventory } from '../hooks/useInventory';


export const ProductPage = () => {
    const { slug } = useParams();
    const { getProductBySlug } = useInventory();
    const product = slug ? getProductBySlug(slug) : null;

    if (!slug) return <div className="pt-32 text-center text-gray-500">Product not found.</div>;
    if (!product) return <div className="pt-32 text-center text-gray-500">Product not found.</div>;

    return (
        <div className="pt-16 bg-black min-h-screen">
            <ProductDetail product={product} />
        </div>
    );
};
