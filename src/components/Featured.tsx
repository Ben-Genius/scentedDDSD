import React from "react";
import { IMAGES } from "@/assets";
import { Leaf, Award, Flame, Recycle } from 'lucide-react';
import { motion } from "motion/react";

export const FeatureSection = () => {
    return (
        <section className="relative w-full">
            {/* Top Parallax Image Section */}
            <div
                className="h-[300px] md:h-[400px] w-full bg-fixed bg-center bg-cover relative"
                style={{ backgroundImage: `url(${IMAGES.allprod3})` }}
            >
                <div className="absolute inset-0 bg-black/20" /> {/* Slight overlay for depth */}
            </div>

            {/* Content Section - Mission Statement */}
            <div className="bg-champagne-100 py-20 px-6 relative z-10 -mt-10 rounded-t-3xl md:rounded-none md:mt-0">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-playfair text-rose mb-4">
                            The Scented Mission
                        </h2>

                        <p className="text-gold italic font-playfair text-lg md:text-xl mb-8">
                            Home of timeless, sustainable & eco conscious candles
                        </p>

                        <p className="text-[#6D5D53] leading-relaxed mb-16 max-w-3xl mx-auto font-light text-base md:text-lg">
                            At Scented by DDSD, our mission is to illuminate lives by crafting exceptional candles that transcend the ordinary.
                            We are dedicated to creating moments of serenity, joy, and connection through the art of candle-making.
                            With a commitment to quality, sustainability, and the celebration of craftsmanship, we strive to enhance
                            the ambiance of everyday experiences and transform spaces into sanctuaries of tranquillity.
                        </p>
                    </motion.div>

                    {/* Icons Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
                        <MissionItem
                            icon={<Recycle className="w-8 h-8 md:w-10 md:h-10 text-rose" strokeWidth={1} />}
                            label="Sustainable"
                            delay={0}
                        />
                        <MissionItem
                            icon={<Award className="w-8 h-8 md:w-10 md:h-10 text-rose" strokeWidth={1} />}
                            label="Handcrafted"
                            delay={0.1}
                        />
                        <MissionItem
                            icon={<Flame className="w-8 h-8 md:w-10 md:h-10 text-rose" strokeWidth={1} />}
                            label="Aromatic"
                            delay={0.2}
                        />
                        <MissionItem
                            icon={<Leaf className="w-8 h-8 md:w-10 md:h-10 text-rose" strokeWidth={1} />}
                            label="Eco-Friendly"
                            delay={0.3}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const MissionItem = ({ icon, label, delay }: { icon: React.ReactNode; label: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, type: "spring" }}
        className="flex flex-col items-center gap-4 group"
    >
        <div className="p-4 rounded-full border border-rose/30 bg-white/50 group-hover:border-rose group-hover:bg-white transition-all duration-300 shadow-sm group-hover:shadow-md">
            {icon}
        </div>
        <span className="text-gold text-xs md:text-sm uppercase tracking-widest font-thin group-hover:text-rose transition-colors">{label}</span>
    </motion.div>
);

export default FeatureSection;
