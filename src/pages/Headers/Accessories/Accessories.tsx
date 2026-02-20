"use client";

import { navigationData } from '@/data/navigation';
import { products } from '@/data/products';
import { motion } from "framer-motion";
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { useLocalCart } from '@/hooks/useLocalCart';
import toast from 'react-hot-toast';

export const Accessories = () => {
    // 1. Find the Accessories navigation item (id: 'shop')
    const accessoriesNav = navigationData.find(item => item.id === 'shop');
    const addItem = useLocalCart((state) => state.addItem);

    if (!accessoriesNav || !accessoriesNav.sections) {
        return <div className="p-10 text-center">Accessories collection not found.</div>;
    }

    return (
        <div className="w-full relative max-w-full px-2 mx-auto min-h-screen py-24 bg-champagne-100">
            <motion.section
                className="w-full px-4 mb-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight font-playfair"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <span className="bg-gradient-to-r from-black via-black/90 to-black/70 bg-clip-text text-transparent font-inter">
                            Accessories
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-base md:text-lg text-black/60 max-w-2xl mx-auto leading-relaxed font-inter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                        Enhance your fragrance experience with our curated collection of luxury burners, decorative pieces, and lifestyle accessories.
                    </motion.p>
                </div>
            </motion.section>

            <div className="max-w-[100rem] mx-auto">
                {accessoriesNav.sections.map((section) => {
                    const sectionProducts = section.links.map(link => {
                        const slug = link.path.split('/').pop();
                        return products.find(p => p.slug === slug);
                    }).filter((p): p is typeof products[0] => p !== null);

                    if (sectionProducts.length === 0) return null;

                    return (
                        <div key={section.title} className="mb-24">
                            <motion.h2
                                className="text-2xl md:text-3xl font-playfair mb-12 text-center text-black/80 tracking-wide uppercase italic"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {section.title}
                            </motion.h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                                {sectionProducts.map((product) => (
                                    <ShopProductCard
                                        key={product.id}
                                        product={product}
                                        onQuickAdd={() => {
                                            if (product.variants.length > 0) {
                                                addItem(product, product.variants[0]);
                                                toast.success(`Added ${product.title} to cart`);
                                            }
                                        }}
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
