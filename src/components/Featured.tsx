import React from "react";
import { IMAGES } from "@/assets";
import { Leaf, Award, Flame, Recycle } from 'lucide-react';

export const FeatureSection = () => {
    return (
        <section className="relative w-full">
            {/* Top Parallax Image Section */}
            <div
                className="h-[400px] w-full bg-fixed bg-center bg-cover relative"
                style={{ backgroundImage: `url(${IMAGES.allprod3})` }}
            >
                {/* Optional dark overlay if text needs to go here later, but for now clean image */}

            </div>

            {/* Content Section - Mission Statement */}
            <div className="bg-champagne-100 py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-playfair text-rose mb-4">
                        The Scented Mission
                    </h2>

                    <p className="text-gold italic font-playfair text-lg mb-8">
                        Home of timeless, sustainable & eco conscious candles
                    </p>

                    <p className="text-[#6D5D53] leading-relaxed mb-20 max-w-3xl mx-auto font-light">
                        At Scented by DDSD, our mission is to illuminate lives by crafting exceptional candles that transcend the ordinary.
                        We are dedicated to creating moments of serenity, joy, and connection through the art of candle-making.
                        With a commitment to quality, sustainability, and the celebration of craftsmanship, we strive to enhance
                        the ambiance of everyday experiences and transform spaces into sanctuaries of tranquillity.
                    </p>

                    {/* Icons Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
                        <MissionItem
                            icon={<Recycle className="w-10 h-10 text-rose" strokeWidth={1} />}
                            label="Sustainable"
                        />
                        <MissionItem
                            icon={<Award className="w-10 h-10 text-rose" strokeWidth={1} />}
                            label="Handcrafted"
                        />
                        <MissionItem
                            icon={<Flame className="w-10 h-10 text-rose" strokeWidth={1} />}
                            label="Aromatic"
                        />
                        <MissionItem
                            icon={<Leaf className="w-10 h-10 text-rose" strokeWidth={1} />}
                            label="Eco-Friendly"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const MissionItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex flex-col items-center gap-4 group">
        <div className="p-4 rounded-full border border-rose group-hover:border-[#8C7B70] transition-colors duration-300">
            {icon}
        </div>
        <span className="text-gold text-sm uppercase tracking-widest font-thin">{label}</span>
    </div>
);

export default FeatureSection;
