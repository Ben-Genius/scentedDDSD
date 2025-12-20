import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
        {
            id: "candle-lavender-2",
            name: "Lavender Serenity Candle",
            price: "GHS 150.00",
            oldPrice: "GHS 200.00",
            image: IMAGES.scentedcandle,
            sale: "25% OFF"
        },
        {
            id: "diffuser-rose-2",
            name: "Royal Rose Diffuser",
            price: "GHS 280.00",
            oldPrice: "GHS 350.00",
            image: IMAGES.diffavent,
            sale: "20% OFF"
        },
        {
            id: "spray-ocean-2",
            name: "Ocean Breeze Room Spray",
            price: "GHS 120.00",
            oldPrice: "GHS 150.00",
            image: IMAGES.spray,
            sale: "20% OFF"
        },
        {
            id: "burner-ceramic-2",
            name: "Ceramic Oil Burner",
            price: "GHS 90.00",
            oldPrice: "GHS 120.00",
            image: IMAGES.candle2,
            sale: "25% OFF"
        },
        {
            id: "candle-lavender-3",
            name: "Lavender Serenity Candle",
            price: "GHS 150.00",
            oldPrice: "GHS 200.00",
            image: IMAGES.scentedcandle,
            sale: "25% OFF"
        },
        {
            id: "diffuser-rose-3",
            name: "Royal Rose Diffuser",
            price: "GHS 280.00",
            oldPrice: "GHS 350.00",
            image: IMAGES.diffavent,
            sale: "20% OFF"
        },
    ];

    const css = `
    .swiper {
      width: 100%;
      padding-bottom: 50px;
      padding-top: 50px;
    }
    
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 280px;
    }

    @media (min-width: 768px) {
      .swiper-slide {
        width: 350px;
      }
    }
    
    .swiper-3d .swiper-slide-shadow-left,
    .swiper-3d .swiper-slide-shadow-right {
      background-image: none !important;
    }
    `;

    return (
        <section className="w-full py-12 md:py-24 bg-white text-black relative pb-24 md:pb-32 overflow-hidden">
            <style>{css}</style>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-0 px-4"
            >

                <h2 className="text-2xl md:text-3xl font-playfair text-black mb-4 uppercase tracking-[0.1em]">
                    Explore New Arrivals
                </h2>
                <div className="h-px w-24 bg-black/10 mx-auto" />
            </motion.div>

            {/* Swiper Carousel */}
            <div className="w-full">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    pagination={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="w-full h-full group relative px-2 md:px-0">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm h-[400px] md:h-[550px] relative">
                                    <div className="w-full h-[65%] md:h-[70%] bg-gray-50 overflow-hidden relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-medium tracking-widest uppercase">
                                            {product.sale}
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-6 text-center h-[35%] md:h-[30%] flex flex-col justify-center bg-white relative z-10">
                                        <h3 className="text-sm font-medium font-inter text-black mb-2 line-clamp-1 uppercase tracking-wide">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-center gap-3 text-sm">
                                            <span className="text-black font-semibold">{product.price}</span>
                                            <span className="text-black/30 line-through text-xs">{product.oldPrice}</span>
                                        </div>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="mt-4 text-[10px] uppercase tracking-[0.2em] border-b border-black inline-block mx-auto hover:opacity-60 transition-opacity"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* View All Link */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mt-8"
            >
                <Link
                    to="/shop?category=New"
                    className="inline-block border-b border-black text-black hover:opacity-70 transition-opacity pb-1 text-xs uppercase tracking-[0.2em]"
                >
                    View All New Arrivals
                </Link>
            </motion.div>

        </section>
    );
};