import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';

// --- Types ---
interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// --- Data ---
const customerStories: Testimonial[] = [
    {
        text: 'The Lavender Calm candle has become my nightly ritual. The scent is so pure and soothing - it helps me unwind after long days at work. I love that it\'s hand-poured right here in Ghana with such attention to detail.',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        name: 'Ama Mensah',
        role: 'Lavender Calm Candle (Grande)',
    },
    {
        text: 'As someone who works from home, scent is everything to me. The Royal English Rose diffuser keeps my office smelling fresh and luxurious all day. Clients who visit always ask what fragrance I\'m using!',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        name: 'Kwame Osei',
        role: 'Royal English Rose Diffuser',
    },
    {
        text: 'I ordered the Tropical Paradise bundle as a housewarming gift for my sister and she absolutely loved it! The packaging was beautiful and the scents are divine. Supporting local businesses has never felt so good.',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        name: 'Yaa Asantewaa',
        role: 'Tropical Paradise Bundle',
    },
    {
        text: 'The quality is exceptional. I\'ve tried many candle brands and DDSD stands out. The burn time is incredible and the scent throw fills my entire living room. The Midnight Oud is my favorite - so rich and sophisticated.',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        name: 'Nana Yaw Boateng',
        role: 'Midnight Oud Candle (Luxe)',
    },
    {
        text: 'I bought the essential oils collection and use them in my oil burner every evening. The therapeutic benefits are real - I sleep better and my apartment always smells amazing. The Vanilla oil is heavenly!',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        name: 'Adwoa Serwaa',
        role: 'Essential Oil Collection',
    },
    {
        text: 'DDSD has become my go-to for gifts. Whether it\'s birthdays, anniversaries, or corporate gifts, their products never disappoint. The presentation is always immaculate and delivery is prompt. Highly recommended!',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        name: 'Kojo Ansah',
        role: 'Signature Gift Set',
    },
    {
        text: 'The Champagne Blossom shower gel is pure luxury! It makes my morning shower feel like a spa experience. The scent lingers on my skin all day. I\'m so glad I discovered this brand.',
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        name: 'Efua Danso',
        role: 'Champagne Blossom Shower Gel',
    },
    {
        text: 'Ordered multiple items for my new apartment and couldn\'t be happier. The customer service was excellent - they helped me choose the perfect scents for each room. Everything arrived beautifully packaged.',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        name: 'Kofi Mensah',
        role: 'Multi-Room Collection',
    },
    {
        text: 'Absolutely in love with the Sandalwood Diffuser. It adds such a warm, inviting atmosphere to my living space. The design is sleek and modern too.',
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
        name: 'Abena Ofori',
        role: 'Sandalwood Diffuser',
    }
];

const firstColumn = customerStories.slice(0, 3);
const secondColumn = customerStories.slice(3, 6);
const thirdColumn = customerStories.slice(6, 9);

// --- Components ---

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
        <div className="bg-black/40 backdrop-blur-md border border-gold/30 text-white font-playfair text-3xl md:text-5xl font-bold w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-lg">
            {String(value).padStart(2, '0')}
        </div>
        <span className="text-gold text-xs uppercase tracking-widest mt-2">{label}</span>
    </div>
);



export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-8 rounded-xl border border-rose/10 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 max-w-xs w-full" key={i}>
                                    <div className="text-gray-600 font-light leading-relaxed italic">"{text}"</div>
                                    <div className="flex items-center gap-3 mt-6">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            className="h-10 w-10 rounded-full border border-gold/30 object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-playfair font-bold text-rose tracking-wide leading-5">{name}</div>
                                            <div className="leading-5 text-gold text-xs uppercase tracking-wider mt-1">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};

export const Testimonials = () => {
    return (
        <div className="bg-champagne-200">
           

            {/* Testimonials Section */}
            <section className="bg-champagne-50 py-14 relative overflow-hidden">
                <div className="container z-10 mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16"
                    >
                        <div className="flex justify-center ">
                            <div className="block text-gold text-xs uppercase tracking-[0.4em] mb-2 font-inter">
                                Testimonials
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-playfair text-rose mb-2 leading-tight">
                            What our users say
                        </h2>
                        <p className="text-center text-black font-light text-lg">
                            See what our customers have to say about the ambiance we create.
                        </p>
                    </motion.div>

                    <div className="flex justify-center gap-6  max-h-[640px] overflow-hidden">
                        <TestimonialsColumn testimonials={firstColumn} duration={15} />
                        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={15} />

                    </div>
                </div>
            </section>
        </div>
    );
};
