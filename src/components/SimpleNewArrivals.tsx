import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets";

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

    return (
        <section className="w-full py-20 bg-[#0F0F0F] text-white">
            <div className="text-center mb-14">
                <p className="block text-gold text-xs uppercase tracking-[0.4em] mb-4 font-inter">Customer Choice</p>
                <h2 className="text-4xl md:text-5xl font-playfair tracking-wide text-white">
                    Explore New <span className="text-gold">Arrivals</span>
                </h2>
            </div>

            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 xl:px-0">
                {products.map((item) => (
                    <Link key={item.id} to={`/shop?category=New`} className="group block">
                        {/* Image container */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-white/5">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />

                            {/* Sale Badge */}
                            <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-lg">
                                {item.sale}
                            </div>
                        </div>

                        {/* Text */}
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-playfair text-white group-hover:text-gold transition-colors duration-300">
                                {item.name}
                            </h3>

                            <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                                <span className="text-gold font-bold">{item.price}</span>
                                <span className="text-gray-600 line-through decoration-gray-600">{item.oldPrice}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/shop?category=New" className="inline-block border-b border-gold text-gold hover:text-white hover:border-white transition-colors pb-1 text-sm uppercase tracking-widest font-medium">
                    View All New Arrivals
                </Link>
            </div>
        </section>
    );
};
