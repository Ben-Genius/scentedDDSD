import React from 'react';
import { CheckoutStub } from '../components/CheckoutStub';

export const Checkout = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-playfair text-gray-900 mb-8">Checkout</h1>
                <CheckoutStub />
            </div>
        </div>
    );
};
