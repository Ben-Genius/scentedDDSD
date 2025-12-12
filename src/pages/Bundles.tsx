import React, { useEffect, useState } from 'react';
import { BundleBuilder } from '../components/BundleBuilder';
import { getProducts } from '../lib/api';
import { Product } from '../types';

export const Bundles = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-4xl font-playfair text-white mb-2 text-center">Curate Your Gift Box</h1>
            <p className="text-center text-gray-400 mb-12">Select your favorites and save.</p>

            <BundleBuilder availableProducts={products} />

            {/* Prebuilt Bundles Stub */}
            <div className="mt-20">
                <h2 className="text-2xl font-playfair text-white mb-8 text-center">Or Choose a Signature Set</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-500">
                    <div className="bg-white/5 p-8 border border-white/5 rounded">
                        <div className="h-48 bg-black mb-4"></div>
                        <h3 className="text-white font-playfair text-lg">The Relaxation Set</h3>
                        <p className="text-sm my-2">Diffuser + Candle + Oil</p>
                        <p className="text-gold">GHS 250.00</p>
                    </div>
                    {/* ... more ... */}
                </div>
            </div>
        </div>
    );
};
