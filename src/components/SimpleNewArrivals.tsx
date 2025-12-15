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
        <section className="w-full py-10 bg-champagne-200 text-white relative pb-24">
            {/* Header */}
            <div className="text-center mb-14">
                <p className="block text-gold text-xs uppercase tracking-[0.4em] mb-4 font-inter">
                    Customer Choice
                </p>
                <h2 className="text-4xl md:text-5xl font-playfair tracking-wide text-rose mb-6">
                    Explore New Arrivals
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto opacity-50" />
            </div>

            {/* Products Grid */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 xl:px-0">
                {products.map((item) => (
                    <Link key={item.id} to={`/shop?category=New`} className="group block">
                        {/* Image container */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-white/5">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-100"
                            />

                            {/* Sale Badge */}
                            <div className="absolute top-4 left-4 bg-rose text-white px-3 py-1 rounded text-[10px] font-medium tracking-wider uppercase shadow-lg">
                                {item.sale}
                            </div>
                        </div>

                        {/* Text */}
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-playfair text-gold group-hover:text-gold transition-colors duration-300">
                                {item.name}
                            </h3>

                            <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                                <span className="text-gold font-normal">{item.price}</span>
                                <span className="text-rose-600 line-through decoration-gray-600">{item.oldPrice}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
                <Link
                    to="/shop?category=New"
                    className="inline-block border-b border-gold text-gold hover:text-white hover:border-white transition-colors pb-1 text-sm uppercase tracking-widest font-medium"
                >
                    View All New Arrivals
                </Link>
            </div>

            {/* Curved Bottom Edge - SVG Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg
                    className="relative block w-full h-[40px] sm:h-[60px]"                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,20 Q600,70 1200,20 L1200,120 L0,120 Z"
                        className="fill-champagne-200"
                    />
                </svg>
            </div>
        </section>
    );
};