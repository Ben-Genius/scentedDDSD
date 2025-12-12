import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { getProductBySlug } from '../lib/api';
import { Product } from '../types';

export const ProductPage = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(true);
            getProductBySlug(slug).then(p => {
                setProduct(p || null);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) return <div className="pt-32 text-center text-gray-500">Loading...</div>;
    if (!product) return <div className="pt-32 text-center text-gray-500">Product not found.</div>;

    return (
        <div className="pt-16 bg-black min-h-screen">
            <ProductDetail product={product} />
        </div>
    );
};
