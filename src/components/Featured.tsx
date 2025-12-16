import { useRef } from "react";
import { IMAGES } from "@/assets";
import { motion, useScroll, useTransform } from "motion/react";
import { MarketingMarquee } from "./MarketingMarquee";

export const FeatureSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden">
            {/* Top Parallax Image Section */}
            <div className="h-[400px] md:h-[500px] w-full relative overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 w-full h-[120%]"
                >
                    <img
                        src={IMAGES.allprod3}
                        alt="Featured Collection"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Removed internal Marquee to avoid duplication since it's in Home.tsx now */}
        </section>
    );
};


export default FeatureSection;
