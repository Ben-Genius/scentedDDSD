import React from 'react';
import { cn } from "@/lib/utils";
import { motion, Variants, HTMLMotionProps } from 'motion/react';
import { Truck, Leaf, ShieldCheck } from 'lucide-react';

// Icon component for contact details (Adapted to Lucide)
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: <Truck className="h-4 w-4 md:h-5 md:w-5 text-gold" />,
        phone: <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-gold" />,
        address: <Leaf className="h-4 w-4 md:h-5 md:w-5 text-gold" />,
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

interface HeroSectionProps extends Omit<HTMLMotionProps<"section">, 'title'> {
    logo?: {
        url: string;
        alt: string;
        text?: string;
    };
    slogan?: string;
    title: React.ReactNode;
    subtitle: string;
    callToAction: {
        text: string;
        href: string;
    };
    backgroundImage: string;
    contactInfo: {
        website: string;
        phone: string;
        address: string;
    };
}

const BundlesHero = React.forwardRef<HTMLDivElement, HeroSectionProps>(
    ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {

        const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                },
            },
        };

        const itemVariants: Variants = {
            hidden: { y: 20, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.5,
                    ease: "easeOut",
                },
            },
        };

        return (
            <motion.section
                ref={ref}
                className={cn(
                    "relative flex w-full flex-col overflow-hidden bg-champagne-50 text-black md:flex-row",
                    "min-h-screen md:min-h-[90vh] h-auto",
                    className
                )}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                {...props}
            >
                {/* Left Side: Content */}
                <div className="flex w-full flex-col justify-between p-6 sm:p-8 md:w-1/2 md:p-10 lg:w-2/5 lg:p-16 xl:p-20 relative z-10 order-2 md:order-1">
                    {/* Top Section: Logo & Main Content */}
                    <div>
                        <motion.header className="mb-6 sm:mb-8 md:mb-10 lg:mb-12" variants={itemVariants}>
                            {logo && (
                                <div className="flex items-center">
                                    {logo.url && <img src={logo.url} alt={logo.alt} className="mr-2 sm:mr-3 h-6 sm:h-7 md:h-8" />}
                                    <div>
                                        {logo.text && (
                                            <p className="text-base sm:text-lg font-bold text-black font-playfair">
                                                {logo.text}
                                            </p>
                                        )}
                                        {slogan && (
                                            <p className="text-[10px] sm:text-xs tracking-wider text-black/60 uppercase font-inter">
                                                {slogan}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.header>

                        <motion.main variants={containerVariants}>
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-medium leading-[1.1] text-black"
                                variants={itemVariants}
                            >
                                {title}
                            </motion.h1>
                            <motion.div
                                className="my-6 sm:my-7 md:my-8 h-0.5 sm:h-1 w-16 sm:w-20 bg-gold"
                                variants={itemVariants}
                            ></motion.div>
                            <motion.p
                                className="mb-8 sm:mb-9 md:mb-10 max-w-md text-base sm:text-lg text-black/70 font-light leading-relaxed"
                                variants={itemVariants}
                            >
                                {subtitle}
                            </motion.p>
                            <motion.a
                                href={callToAction.href}
                                className="inline-block text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black border-b border-black pb-1 transition-colors hover:text-gold hover:border-gold active:opacity-70"
                                variants={itemVariants}
                            >
                                {callToAction.text}
                            </motion.a>
                        </motion.main>
                    </div>

                    {/* Bottom Section: Footer Info */}
                    <motion.footer className="mt-8 sm:mt-10 md:mt-12 w-full" variants={itemVariants}>
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 text-[10px] sm:text-xs text-black/60 font-medium uppercase tracking-wider">
                            <div className="flex items-center">
                                <InfoIcon type="website" />
                                <span className="break-all">{contactInfo.website}</span>
                            </div>
                            <div className="flex items-center">
                                <InfoIcon type="phone" />
                                <span>{contactInfo.phone}</span>
                            </div>
                            <div className="flex items-center xs:col-span-2 sm:col-span-1">
                                <InfoIcon type="address" />
                                <span>{contactInfo.address}</span>
                            </div>
                        </div>
                    </motion.footer>
                </div>

                {/* Right Side: Image with Clip Path Animation */}
                <motion.div
                    className="w-full min-h-[40vh] sm:min-h-[45vh] md:min-h-full bg-cover bg-center md:w-1/2 lg:w-3/5 md:absolute md:right-0 md:top-0 md:bottom-0 lg:relative order-1 md:order-2"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPosition: 'center',
                    }}
                    initial={{
                        clipPath: window.innerWidth < 768
                            ? 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
                            : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                    }}
                    animate={{
                        clipPath: window.innerWidth < 768
                            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                            : 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                    }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Gradient overlay for better text contrast on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/5 md:hidden"></div>
                </motion.div>
            </motion.section>
        );
    }
);

BundlesHero.displayName = "BundlesHero";

export { BundlesHero };