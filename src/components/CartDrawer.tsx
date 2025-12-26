import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalCart } from '../hooks/useLocalCart';
import { formatMoney } from '../utils/formatMoney';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import cn from 'classnames';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, removeItem, updateItemQuantity, getCartTotal } = useLocalCart();
    const navigate = useNavigate();
    const total = getCartTotal();
    const [isClosing, setIsClosing] = useState(false);

    // Handle ESC close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    const handleWhatsAppOrder = () => {
        const phone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '';
        let message = "Hi, I'd like to place an order from Scented by DDSD:\n\n";
        items.forEach(item => {
            message += `• ${item.quantity}x ${item.productTitle} (${item.variantLabel}${item.colorLabel ? `, ${item.colorLabel}` : ''}${item.scent ? `, ${item.scent}` : ''}) @ ${formatMoney(item.price)}\n`;
        });
        message += `\nTotal: ${formatMoney(total)}`;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#f9f9f9] shadow-2xl z-50 flex flex-col font-inter"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-playfair font-medium text-gray-900">Your Cart</h2>
                                <span className="text-sm font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                                        <p className="text-gray-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="mt-4 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item, idx) => (
                                    <motion.div
                                        key={`${item.productId}-${item.variantId}-${idx}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                                    >
                                        <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.productTitle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className="font-playfair text-gray-900 font-medium leading-tight">
                                                        {item.productTitle}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeItem(`${item.productId}-${item.variantId}-${item.colorId || 'nc'}-${item.scent || 'ns'}`)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="mt-1 space-y-1">
                                                    <p className="text-sm text-gray-500">
                                                        {item.variantLabel}
                                                        {item.colorLabel && ` • ${item.colorLabel}`}
                                                    </p>
                                                    {item.scent && (
                                                        <p className="text-xs text-gold font-medium bg-gold/5 px-2 py-0.5 rounded-full w-fit">
                                                            Scent: {item.scent}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end mt-3">
                                                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                    <button
                                                        onClick={() => updateItemQuantity(`${item.productId}-${item.variantId}-${item.colorId || 'nc'}-${item.scent || 'ns'}`, item.quantity - 1)}
                                                        className="p-1.5 hover:text-gray-900 text-gray-500 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateItemQuantity(`${item.productId}-${item.variantId}-${item.colorId || 'nc'}-${item.scent || 'ns'}`, item.quantity + 1)}
                                                        className="p-1.5 hover:text-gray-900 text-gray-500 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <p className="font-medium text-gray-900">
                                                    {formatMoney(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">{formatMoney(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-playfair font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span className="text-gold">{formatMoney(total)}</span>
                                    </div>
                                    <p className="text-xs text-center text-gray-400">
                                        Shipping & taxes calculated at checkout
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleWhatsAppOrder}
                                        className="flex items-center justify-center gap-2 py-3.5 px-4 border border-green-600 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors"
                                    >
                                        WhatsApp Order
                                    </button>
                                    <button
                                        onClick={() => { onClose(); navigate('/checkout'); }}
                                        className="py-3.5 px-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
