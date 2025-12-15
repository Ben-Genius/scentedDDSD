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
        <section className="w-full py-16 md:py-24 bg-champagne-200 text-white relative pb-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 px-4"
            >
                <p className="block text-gold text-xs uppercase tracking-[0.4em] mb-4 font-inter">
                    Customer Choice
                </p>
                <h2 className="text-4xl md:text-5xl font-playfair tracking-wide text-rose mb-6">
                    Explore New Arrivals
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto opacity-50" />
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
                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />

                                {/* Sale Badge */}
                                <div className="absolute top-4 left-4 bg-rose text-white px-3 py-1 rounded-sm text-[10px] font-bold tracking-wider uppercase shadow-md">
                                    {product.sale}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="mt-5 text-center px-2">
                                <h3 className="text-lg font-playfair text-gray-800 group-hover:text-rose transition-colors duration-300 leading-tight">
                                    {product.name}
                                </h3>

                                <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                                    <span className="text-gold font-bold">{product.price}</span>
                                    <span className="text-rose/60 line-through text-xs">{product.oldPrice}</span>
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
                    className="inline-block border-b-2 border-rose text-rose hover:text-rose/80 hover:border-rose/60 transition-colors pb-1 text-sm uppercase tracking-widest font-bold"
                >
                    View All New Arrivals
                </Link>
            </motion.div>

            {/* Curved Bottom Edge - SVG Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg
                    className="relative block w-full h-[40px] sm:h-[60px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,20 Q600,70 1200,20 L1200,120 L0,120 Z"
                        className="fill-champagne-100" // Matches next section background
                    />
                </svg>
            </div>
        </section>
    );
};