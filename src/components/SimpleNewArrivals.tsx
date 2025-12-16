import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets";
import { motion } from "motion/react";

export const SimpleNewArrivals = () => {
    const products = [
        {
            id: "candle-lavender",
            name: "Lavender Serenity Candle",
            price: "GHS 150.00",
            oldPrice: "GHS 200.00",
            image: IMAGES.scentedcandle,
            sale: "25% OFF"
        },
        {
            id: "diffuser-rose",
            name: "Royal Rose Diffuser",
            price: "GHS 280.00",
            oldPrice: "GHS 350.00",
            image: IMAGES.diffavent,
            sale: "20% OFF"
        },
        {
            id: "spray-ocean",
            name: "Ocean Breeze Room Spray",
            price: "GHS 120.00",
            oldPrice: "GHS 150.00",
            image: IMAGES.spray,
            sale: "20% OFF"
        },
        {
            id: "burner-ceramic",
            name: "Ceramic Oil Burner",
            price: "GHS 90.00",
            oldPrice: "GHS 120.00",
            image: IMAGES.candle2,
            sale: "25% OFF"
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="w-full py-16 md:py-24 bg-white text-black relative pb-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 px-4"
            >
                <p className="block text-black/60 text-[10px] uppercase tracking-[0.4em] mb-4 font-inter">
                    Customer Choice
                </p>
                <h2 className="text-4xl md:text-5xl font-playfair tracking-normal text-black mb-6">
                    Explore New Arrivals
                </h2>
                <div className="h-px w-24 bg-black/10 mx-auto" />
            </motion.div>

            {/* Products Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-12"
            >
                {products.map((product) => (
                    <motion.div variants={item} key={product.id}>
                        <Link to={`/shop?category=New`} className="group block">
                            {/* Image container */}
                            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                                />

                                {/* Sale Badge */}
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-none text-[10px] font-medium tracking-widest uppercase">
                                    {product.sale}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="mt-5 text-center px-2">
                                <h3 className="text-base font-medium font-inter text-black group-hover:text-black/70 transition-colors duration-300 leading-tight tracking-wide">
                                    {product.name}
                                </h3>

                                <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                                    <span className="text-black font-normal">{product.price}</span>
                                    <span className="text-black/40 line-through text-xs font-light">{product.oldPrice}</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Link */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mt-16"
            >
                <Link
                    to="/shop?category=New"
                    className="inline-block border-b border-black text-black hover:opacity-70 transition-opacity pb-1 text-xs uppercase tracking-[0.2em]"
                >
                    View All New Arrivals
                </Link>
            </motion.div>

            {/* Curved Bottom Edge - SVG Wave (Updated fill) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg
                    className="relative block w-full h-[40px] sm:h-[60px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,20 Q600,70 1200,20 L1200,120 L0,120 Z"
                        className="fill-champagne-50" // Matches next section background
                    />
                </svg>
            </div>
        </section>
    );
};