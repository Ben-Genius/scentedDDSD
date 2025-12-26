import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePayment, PaymentMethod } from '../hooks/usePayment';
import { useLocalCart } from '../hooks/useLocalCart';
import { Order } from '../types';
import { saveOrder } from '../lib/orders';
import { formatMoney } from '../utils/formatMoney';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Check, CreditCard, Smartphone, Banknote, MessageCircle, ChevronRight, Loader2 } from 'lucide-react';

const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Delivery address is required'),
    city: Yup.string().required('City/Region is required'),
    paymentMethod: Yup.string().required('Please select a payment method'),
    cardNumber: Yup.string().when('paymentMethod', {
        is: 'card',
        then: (schema) => schema.required('Card number is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
    cardExpiry: Yup.string().when('paymentMethod', {
        is: 'card',
        then: (schema) => schema.required('Expiry date is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
    cardCvc: Yup.string().when('paymentMethod', {
        is: 'card',
        then: (schema) => schema.required('CVC is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

export const CheckoutStub = () => {
    const { items, getCartTotal, clearCart } = useLocalCart();
    const { processPayment, isProcessing, error } = usePayment();
    const navigate = useNavigate();
    const [orderCompleteId, setOrderCompleteId] = useState<string | null>(null);

    const total = getCartTotal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    total: total,
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
            }
        },
    });

    if (orderCompleteId) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-100 p-12 text-center rounded-2xl shadow-sm max-w-2xl mx-auto mt-8"
            >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-playfair text-gray-900 mb-4">Order Confirmed</h2>
                <p className="text-gray-600 mb-8 text-lg">
                    Thank you, {formik.values.name.split(' ')[0]}.<br />
                    Your order <span className="font-semibold text-gray-900">#{orderCompleteId}</span> has been received.
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => navigate('/')} className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        Return Home
                    </button>
                    <button onClick={() => navigate('/shop')} className="px-8 py-3 border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        Continue Shopping
                    </button>
                </div>
            </motion.div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-24 px-4">
                <h2 className="text-2xl font-playfair text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any scents to your collection yet.</p>
                <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-inter">
            {/* Form */}
            <div className="lg:col-span-7 space-y-8">
                <form onSubmit={formik.handleSubmit} className="space-y-8">
                    {/* Contact & Shipping */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-playfair text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">1</span>
                            Shipping Information
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    {...formik.getFieldProps('name')}
                                    className={cn(
                                        "w-full bg-gray-50 border p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all",
                                        formik.touched.name && formik.errors.name ? "border-red-300 bg-red-50" : "border-gray-200"
                                    )}
                                    placeholder="e.g. Ama Mensah"
                                />
                                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                    <input
                                        {...formik.getFieldProps('email')}
                                        className={cn(
                                            "w-full bg-gray-50 border p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all",
                                            formik.touched.email && formik.errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
                                        )}
                                        placeholder="email@example.com"
                                    />
                                    {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                    <input
                                        {...formik.getFieldProps('phone')}
                                        className={cn(
                                            "w-full bg-gray-50 border p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all",
                                            formik.touched.phone && formik.errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"
                                        )}
                                        placeholder="+233 XX XXX XXXX"
                                    />
                                    {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                                <input
                                    {...formik.getFieldProps('address')}
                                    className={cn(
                                        "w-full bg-gray-50 border p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all",
                                        formik.touched.address && formik.errors.address ? "border-red-300 bg-red-50" : "border-gray-200"
                                    )}
                                    placeholder="Street address, house number"
                                />
                                {formik.touched.address && formik.errors.address && <div className="text-red-500 text-xs mt-1">{formik.errors.address}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Region</label>
                                <input
                                    {...formik.getFieldProps('city')}
                                    className={cn(
                                        "w-full bg-gray-50 border p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all",
                                        formik.touched.city && formik.errors.city ? "border-red-300 bg-red-50" : "border-gray-200"
                                    )}
                                    placeholder="Accra, Kumasi, etc."
                                />
                                {formik.touched.city && formik.errors.city && <div className="text-red-500 text-xs mt-1">{formik.errors.city}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-playfair text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">2</span>
                            Payment Method
                        </h3>

                        <div className="space-y-3">
                            {[
                                { id: 'mobile_money', label: 'Mobile Money', icon: Smartphone, desc: 'MTN MoMo, Vodafone Cash, AirtelTigo' },
                                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard' },
                                { id: 'whatsapp', label: 'Pay via WhatsApp', icon: MessageCircle, desc: 'Coordinate payment manually' },
                                { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive your order' }
                            ].map((method) => (
                                <label key={method.id} className={cn(
                                    "flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden",
                                    formik.values.paymentMethod === method.id
                                        ? "border-gold bg-gold/5 ring-1 ring-gold"
                                        : "border-gray-200 hover:border-gold/50 hover:bg-gray-50"
                                )}>
                                    <input
                                        type="radio"
                                        {...formik.getFieldProps('paymentMethod')}
                                        value={method.id}
                                        className="mr-4 text-gold focus:ring-gold w-5 h-5 bg-gray-100 border-gray-300"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <method.icon size={18} className={formik.values.paymentMethod === method.id ? "text-gray-900" : "text-gray-500"} />
                                            <span className="font-semibold text-gray-900">{method.label}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">{method.desc}</p>
                                    </div>
                                    {formik.values.paymentMethod === method.id && (
                                        <motion.div layoutId="check" className="text-gold absolute right-4">
                                            <Check size={20} />
                                        </motion.div>
                                    )}
                                </label>
                            ))}
                        </div>

                        {/* Dynamic Payment Fields */}
                        <AnimatePresence>
                            {formik.values.paymentMethod === 'card' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4"
                                >
                                    <div>
                                        <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Card Number</label>
                                        <div className="relative">
                                            <input
                                                placeholder="0000 0000 0000 0000"
                                                {...formik.getFieldProps('cardNumber')}
                                                className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 outline-none focus:border-gold"
                                            />
                                            <CreditCard className="absolute right-3 top-3 text-gray-400" size={20} />
                                        </div>
                                        {formik.touched.cardNumber && formik.errors.cardNumber && <div className="text-red-500 text-xs mt-1">{formik.errors.cardNumber}</div>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Expiry</label>
                                            <input
                                                placeholder="MM/YY"
                                                {...formik.getFieldProps('cardExpiry')}
                                                className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 outline-none focus:border-gold"
                                            />
                                            {formik.touched.cardExpiry && formik.errors.cardExpiry && <div className="text-red-500 text-xs mt-1">{formik.errors.cardExpiry}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">CVC</label>
                                            <input
                                                placeholder="123"
                                                {...formik.getFieldProps('cardCvc')}
                                                className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 outline-none focus:border-gold"
                                            />
                                            {formik.touched.cardCvc && formik.errors.cardCvc && <div className="text-red-500 text-xs mt-1">{formik.errors.cardCvc}</div>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                                <span className="font-bold">Error:</span> {error}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" /> Processing Order...
                            </>
                        ) : (
                            <>
                                Pay {formatMoney(total)} <ChevronRight size={20} />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                        Secure 256-bit SSL Encrypted Payment
                    </p>
                </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 sticky top-24">
                    <h3 className="text-xl font-playfair text-gray-900 mb-6">Order Summary</h3>

                    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between text-gray-900 font-medium text-sm">
                                        <span className="line-clamp-1">{item.productTitle}</span>
                                        <span>{formatMoney(item.price * item.quantity)}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1">
                                        Qty: {item.quantity}
                                        {item.variantLabel && ` • ${item.variantLabel}`}
                                        {item.scent && <span className="block text-gold mt-0.5">{item.scent}</span>}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-gray-200 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatMoney(total)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-gray-400 italic">Calculated next</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax</span>
                            <span>{formatMoney(0)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
                        <span className="text-lg font-playfair font-bold text-gray-900">Total</span>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gold">{formatMoney(total)}</span>
                            <p className="text-[10px] text-gray-400">Including VAT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
