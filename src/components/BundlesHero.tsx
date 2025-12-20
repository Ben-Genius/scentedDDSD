import React from 'react';
import { cn } from "@/lib/utils";
import { motion, Variants, HTMLMotionProps } from 'motion/react';
import { Truck, Leaf, ShieldCheck } from 'lucide-react';

// Icon component for contact details (Adapted to Lucide)
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: <Truck className="h-5 w-5 text-gold" />,
        phone: <ShieldCheck className="h-5 w-5 text-gold" />,
        address: <Leaf className="h-5 w-5 text-gold" />,
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
                    "relative flex w-full flex-col overflow-hidden bg-champagne-50 text-black md:flex-row h-[90vh]",
                    className
                )}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                {...props}
            >
                {/* Left Side: Content */}
                <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-2/5 lg:p-16 relative z-10">
                    {/* Top Section: Logo & Main Content */}
                    <div>
                        <motion.header className="mb-12" variants={itemVariants}>
                            {logo && (
                                <div className="flex items-center">
                                    {logo.url && <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />}
                                    <div>
                                        {logo.text && <p className="text-lg font-bold text-black font-playfair">{logo.text}</p>}
                                        {slogan && <p className="text-xs tracking-wider text-black/60 uppercase font-inter">{slogan}</p>}
                                    </div>
                                </div>
                            )}
                        </motion.header>

                        <motion.main variants={containerVariants}>
                            <motion.h1 className="text-5xl font-playfair font-medium leading-[1.1] text-black md:text-7xl" variants={itemVariants}>
                                {title}
                            </motion.h1>
                            <motion.div className="my-8 h-1 w-20 bg-gold" variants={itemVariants}></motion.div>
                            <motion.p className="mb-10 max-w-md text-lg text-black/70 font-light leading-relaxed" variants={itemVariants}>
                                {subtitle}
                            </motion.p>
                            <motion.a
                                href={callToAction.href}
                                className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-1 transition-colors hover:text-gold hover:border-gold"
                                variants={itemVariants}
                            >
                                {callToAction.text}
                            </motion.a>
                        </motion.main>
                    </div>

                    {/* Bottom Section: Footer Info */}
                    <motion.footer className="mt-12 w-full" variants={itemVariants}>
                        <div className="grid grid-cols-1 gap-6 text-xs text-black/60 sm:grid-cols-3 font-medium uppercase tracking-wider">
                            <div className="flex items-center">
                                <InfoIcon type="website" />
                                <span>{contactInfo.website}</span>
                            </div>
                            <div className="flex items-center">
                                <InfoIcon type="phone" />
                                <span>{contactInfo.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <InfoIcon type="address" />
                                <span>{contactInfo.address}</span>
                            </div>
                        </div>
                    </motion.footer>
                </div>

                {/* Right Side: Image with Clip Path Animation */}
                <motion.div
                    className="w-full min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-3/5 absolute right-0 top-0 bottom-0 md:relative"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                    initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
                    animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Elegant easing
                >
                    <div className="absolute inset-0 bg-black/10 md:hidden"></div> {/* Overlay for mobile text readability */}
                </motion.div>
            </motion.section>
        );
    }
);

BundlesHero.displayName = "BundlesHero";

export { BundlesHero };
