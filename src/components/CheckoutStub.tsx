import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePayment, PaymentMethod } from '../hooks/usePayment';
import { useLocalCart } from '../hooks/useLocalCart';
import { Order } from '../types';
import { saveOrder } from '../lib/orders';
import { formatMoney } from '../utils/formatMoney';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    paymentMethod: Yup.string().required('Required'),
});

export const CheckoutStub = () => {
    const { items, getCartTotal, clearCart } = useLocalCart();
    const { processPayment, isProcessing, error } = usePayment();
    const navigate = useNavigate();
    const [orderCompleteId, setOrderCompleteId] = useState<string | null>(null);

    const total = getCartTotal();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            paymentMethod: 'mobile_money' as PaymentMethod,
            cardNumber: '',
            cardExpiry: '',
            cardCvc: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const result = await processPayment(values.paymentMethod, total, values);

            if (result.success) {
                const newOrder: Order = {
                    // eslint-disable-next-line react-hooks/purity
                    id: result.transactionId || Date.now().toString(),
                    items: items,
                    subtotal: total,
                    total: total, // Simplified (no tax logic here for stub)
                    contact: {
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        address: values.address,
                        city: values.city,
                        paymentMethod: values.paymentMethod
                    },
                    date: new Date().toISOString(),
                    status: 'paid',
                    paymentMethod: values.paymentMethod
                };

                await saveOrder(newOrder);
                setOrderCompleteId(newOrder.id);
                clearCart();
                // Don't navigate immediately so they see the success screen
            }
        },
    });

    if (orderCompleteId) {
        return (
            <div className="bg-white/5 border border-gold/20 p-8 text-center rounded animate-fade-in">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-black">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-playfair text-white mb-2">Order Confirmed</h2>
                <p className="text-gray-400 mb-6">Thank you, {formik.values.name.split(' ')[0]}. Your order #{orderCompleteId} has been received.</p>
                <button onClick={() => navigate('/')} className="px-8 py-3 bg-white text-black uppercase tracking-wider hover:bg-gold transition-colors">
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 mb-4">Your cart is empty.</p>
                <button onClick={() => navigate('/shop')} className="text-gold underline">Return to Shop</button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <h3 className="text-xl font-playfair text-white border-b border-white/10 pb-2">Shipping Information</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">Full Name</label>
                        <input
                            {...formik.getFieldProps('name')}
                            className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-gold outline-none"
                        />
                        {formik.touched.name && formik.errors.name && <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Email</label>
                            <input
                                {...formik.getFieldProps('email')}
                                className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-gold outline-none"
                            />
                            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Phone</label>
                            <input
                                {...formik.getFieldProps('phone')}
                                className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-gold outline-none"
                            />
                            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">Address</label>
                        <input
                            {...formik.getFieldProps('address')}
                            className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-gold outline-none"
                        />
                        {formik.touched.address && formik.errors.address && <div className="text-red-500 text-xs mt-1">{formik.errors.address}</div>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">City / Region</label>
                        <input
                            {...formik.getFieldProps('city')}
                            className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-gold outline-none"
                        />
                        {formik.touched.city && formik.errors.city && <div className="text-red-500 text-xs mt-1">{formik.errors.city}</div>}
                    </div>
                </div>

                <h3 className="text-xl font-playfair text-white border-b border-white/10 pb-2 pt-4">Payment Method</h3>
                <div className="space-y-3">
                    {['mobile_money', 'card', 'cod', 'whatsapp'].map((method) => (
                        <label key={method} className={cn(
                            "flex items-center p-4 border cursor-pointer transition-colors",
                            formik.values.paymentMethod === method ? "border-gold bg-gold/5" : "border-white/10 hover:border-gold/50"
                        )}>
                            <input
                                type="radio"
                                {...formik.getFieldProps('paymentMethod')}
                                value={method}
                                className="mr-3 text-gold focus:ring-gold"
                            />
                            <span className="capitalize text-sm font-medium text-white">{method.replace('_', ' ')}</span>
                        </label>
                    ))}
                </div>

                {/* Dynamic Payment Fields */}
                {formik.values.paymentMethod === 'card' && (
                    <div className="bg-white/5 p-4 rounded space-y-3 border border-white/10 animate-fade-in">
                        <input
                            placeholder="Card Number"
                            {...formik.getFieldProps('cardNumber')}
                            className="w-full bg-black border border-white/20 p-2 text-white outline-none focus:border-gold"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="MM/YY"
                                {...formik.getFieldProps('cardExpiry')}
                                className="w-full bg-black border border-white/20 p-2 text-white outline-none focus:border-gold"
                            />
                            <input
                                placeholder="CVC"
                                {...formik.getFieldProps('cardCvc')}
                                className="w-full bg-black border border-white/20 p-2 text-white outline-none focus:border-gold"
                            />
                        </div>
                    </div>
                )}

                {error && <div className="text-red-500 text-center bg-red-900/20 p-2">{error}</div>}

                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gold text-black py-4 uppercase tracking-widest font-bold hover:bg-white transition-colors disabled:opacity-50 mt-4"
                >
                    {isProcessing ? 'Processing...' : `Pay ${formatMoney(total)}`}
                </button>
            </form>

            {/* Order Summary */}
            <div className="bg-white/5 p-6 h-fit border border-gold/10">
                <h3 className="text-xl font-playfair text-white mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 mb-4 text-sm">
                            <div className="w-16 h-16 bg-black flex-shrink-0">
                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between text-white font-medium">
                                    <span>{item.productTitle}</span>
                                    <span>{formatMoney(item.price * item.quantity)}</span>
                                </div>
                                <p className="text-gray-500 text-xs">Qty: {item.quantity} | {item.variantLabel} {item.colorLabel && `| ${item.colorLabel}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-playfair text-gold">
                    <span>Total</span>
                    <span>{formatMoney(total)}</span>
                </div>
            </div>
        </div>
    );
};
