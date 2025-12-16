import React from "react";
import { IMAGES } from "@/assets";
import { Leaf, Award, Flame, Recycle } from 'lucide-react';
import { motion } from "motion/react";
import { MarketingMarquee } from "./MarketingMarquee";

export const FeatureSection = () => {
    return (
        <section className="relative w-full ">
            {/* Top Parallax Image Section */}
            <div
                className="h-[400px] md:h-[450px] w-full bg-fixed bg-center bg-cover relative"
                style={{ backgroundImage: `url(${IMAGES.allprod3})` }}
            >
                <div className="absolute inset-0 bg-black/20" /> {/* Slight overlay for depth */}
            </div>
            <br/>

            <MarketingMarquee />

        </section>
    );
};


export default FeatureSection;
