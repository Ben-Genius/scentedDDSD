import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalCart } from '../hooks/useLocalCart';
import { formatMoney } from '../utils/formatMoney';
import cn from 'classnames';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, removeItem, updateItemQuantity, getCartTotal } = useLocalCart();
    const navigate = useNavigate();
    const total = getCartTotal();

    // Handle ESC close
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleWhatsAppOrder = () => {
        // Generate simplified WhatsApp message
        const phone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '';
        let message = "Hi, I'd like to place an order from Scented by DDSD:\n\n";
        items.forEach(item => {
            message += `• ${item.quantity}x ${item.productTitle} (${item.variantLabel}${item.colorLabel ? `, ${item.colorLabel}` : ''}${item.scent ? `, ${item.scent}` : ''}) @ ${formatMoney(item.price)}\n`;
        });
        message += `\nTotal: ${formatMoney(total)}`;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-champagne/200 backdrop-blur-xs z-50 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={cn(
                "fixed top-0 right-0 h-full w-full md:w-[450px] bg-champagne-50 border-l border-rose/10 z-50 transform transition-transform duration-300 ease-in-out font-inter",
                isOpen ? "translate-x-0 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]" : "translate-x-full"
            )}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-playfair text-rose font-medium">Your Cart</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-rose transition-colors p-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-rose/20 scrollbar-track-transparent">
                        {items.length === 0 ? (
                            <div className="text-center text-gray-500 mt-20">
                                <p className="text-lg mb-4 font-light">Your cart is empty.</p>
                                <button onClick={onClose} className="text-rose font-medium underline hover:text-rose/80">Coordinate your aesthetic</button>
                            </div>
                        ) : (
                            items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 bg-white p-4 rounded-xl border border-rose/10 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="w-20 h-20 bg-gray-100 overflow-hidden rounded-md flex-shrink-0">
                                        <img src={item.image} alt={item.productTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-playfair text-black font-semibold leading-tight">{item.productTitle}</h4>
                                            <button
                                                onClick={() => removeItem(`${item.productId}-${item.variantId}-${item.colorId || 'nc'}-${item.scent || 'ns'}`)}
                                                className="text-gray-400 hover:text-red-500 text-xs transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                                            <p>{item.variantLabel} {item.colorLabel && `• ${item.colorLabel}`}</p>
                                            {item.scent && <p className="text-rose/80 italic">{item.scent}</p>}
                                        </div>

                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex items-center border border-rose/20 rounded-full h-8 px-2">
                                                <button onClick={() => updateItemQuantity(`${item.productId}-${item.variantId}-${item.colorId || 'nc'}-${item.scent || 'ns'}`, item.quantity - 1)} className="px-2 text-gray-400 hover:text-rose transition-colors">-</button>
                                                <span className="text-sm w-6 text-center text-black font-medium">{item.quantity}</span>
                                                <button onClick={() => updateItemQuantity(`${item.productId}-${item.variantId}-${item.colorId || 'nc'}-${item.scent || 'ns'}`, item.quantity + 1)} className="px-2 text-gray-400 hover:text-rose transition-colors">+</button>
                                            </div>
                                            <p className="font-semibold text-rose">{formatMoney(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-6 border-t border-rose/10 mt-4 space-y-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium text-black">{formatMoney(total)}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="text" placeholder="Promo code" className="bg-transparent border-b border-rose/20 w-full py-1 text-sm text-black placeholder-gray-400 focus:border-rose outline-none transition-colors" />
                            <button className="text-xs uppercase text-rose font-semibold hover:text-rose/80">Apply</button>
                        </div>

                        <div className="flex justify-between text-xl font-playfair text-black mt-4 font-semibold">
                            <span>Total</span>
                            <span className="text-rose">{formatMoney(total)}</span>
                        </div>

                        <p className="text-xs text-center text-gray-500">Shipping calculated at checkout.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleWhatsAppOrder}
                                className="col-span-1 border border-green-600 text-green-600 py-3 text-sm uppercase tracking-wider hover:bg-green-50 transition-colors flex items-center justify-center gap-2 rounded-sm font-medium"
                            >
                                <span>WhatsApp</span>
                            </button>
                            <button
                                onClick={() => { onClose(); navigate('/checkout'); }}
                                className="col-span-1 bg-rose text-white py-3 text-sm uppercase tracking-wider font-semibold hover:bg-rose/90 transition-colors rounded-sm shadow-md hover:shadow-lg"
                                disabled={items.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
