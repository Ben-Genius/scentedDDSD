import React, { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// Define the type for individual logo props
interface Logo {
    src?: string;
    alt: string;
    gradient: {
        from: string;
        via: string;
        to: string;
    };
    href?: string;
    icon?: LucideIcon | ElementType;
}

// Define the props for the main component
interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    logos: Logo[];
    speed?: 'normal' | 'slow' | 'fast';
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component.
 */
const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
    ({ title, description, logos, speed = 'normal', className, ...props }, ref) => {
        // Map speed prop to animation duration
        const durationMap = {
            normal: '40s',
            slow: '80s',
            fast: '20s',
        };
        const animationDuration = durationMap[speed];

        return (
            <>
                {/* The @keyframes for the marquee animation are defined directly here for robustness. */}
                <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

                <section
                    ref={ref}
                    aria-label={title}
                    className={cn(
                        'w-full overflow-hidden',
                        className
                    )}
                    {...props}
                >
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-playfair text-black mb-2">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-gray-500 text-sm max-w-lg mx-auto font-light">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Marquee Section */}
                    <div
                        className="w-full overflow-hidden relative"
                        style={{
                            maskImage:
                                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        }}
                    >
                        <div
                            className="flex w-max items-center gap-16 py-8 hover:[animation-play-state:paused] transition-all duration-300 ease-in-out"
                            style={{
                                animation: `marquee ${animationDuration} linear infinite`,
                            }}
                        >
                            {/* Render logos twice to create a seamless loop */}
                            {[...logos, ...logos].map((logo, index) => {
                                const Content = () => (
                                    <div className="flex flex-col items-center justify-center gap-4 group/icon">
                                        {/* Logo Icon or Image */}
                                        <div className="relative z-10 flex flex-col items-center justify-center">
                                            {logo.icon ? (
                                                <logo.icon className="w-12 h-12 text-gray-300 group-hover/icon:text-black transition-colors duration-500" />
                                            ) : logo.src ? (
                                                <img
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    className="h-10 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                )

                                const Wrapper = logo.href ? 'a' : 'div';
                                const wrapperProps = logo.href ? {
                                    href: logo.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                } : {};

                                return (
                                    <Wrapper
                                        key={index}
                                        className="shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
                                        {...wrapperProps}
                                    >
                                        <Content />
                                    </Wrapper>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </>
        );
    }
);

MarqueeLogoScroller.displayName = 'MarqueeLogoScroller';

export { MarqueeLogoScroller };
