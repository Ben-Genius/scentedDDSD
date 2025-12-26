import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Truck, CreditCard } from 'lucide-react';

export const HowToOrder = () => {
    const steps = [
        {
            icon: ShoppingBag,
            title: "Browse & Select",
            description: "Explore our collection of premium scents, candles, and diffusers. Add your favorite items to the cart."
        },
        {
            icon: MessageCircle,
            title: "Confirm Order",
            description: "Once you've made your selection, proceed to checkout. You can also send us a screenshot of your cart via WhatsApp."
        },
        {
            icon: CreditCard,
            title: "Payment",
            description: "Payment can be made via Mobile Money or Bank Transfer. Details will be provided upon order confirmation."
        },
        {
            icon: Truck,
            title: "Delivery",
            description: "We deliver nationwide. Delivery fees vary based on location. Your package will be dispatched within 24-48 hours."
        }
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#fffcf8]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-playfair mb-6">How to Order</h1>
                    <p className="text-black/60 font-light">
                        Shopping with Scented by DDSD is simple. Follow these steps to bring our luxury fragrances into your home.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-sm border border-black/5 hover:border-black/20 transition-colors text-center group"
                        >
                            <div className="w-16 h-16 bg-champagne/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-champagne/40 transition-colors">
                                <step.icon className="w-8 h-8 text-black/80" />
                            </div>
                            <h3 className="text-xl font-playfair mb-4">{step.title}</h3>
                            <p className="text-black/60 text-sm leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 text-center bg-white p-12 max-w-3xl mx-auto border border-black/5 rounded-sm"
                >
                    <h3 className="text-2xl font-playfair mb-4">Need Assistance?</h3>
                    <p className="text-black/60 mb-8">
                        Our team is happy to help you select the perfect scent or answer any questions about your order.
                    </p>
                    <a
                        href="https://wa.me/233257087042"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
                    >
                        Chat on WhatsApp
                    </a>
                </motion.div>
            </div>
        </div>
    );
};
