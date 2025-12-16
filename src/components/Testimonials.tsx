import React, { useState, useRef } from "react";

const Testimonials = () => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        text: "",
    });
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const testimonials = [
        {
            name: "Sarah Jenkins",
            title: "Verified Buyer",
            message:
                "The Lavender Serenity candle completely transformed my evening routine. It's the perfect balance of calm and luxury. Highly recommended!",
            image:
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
        },
        {
            name: "Michael Chen",
            title: "Interior Designer",
            message:
                "I've never found a diffuser that lasts this long and smells this natural. The Royal Rose is absolutely divine and fits my aesthetic perfectly.",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
        },
        {
            name: "Emma Wilson",
            title: "Lifestyle Blogger",
            message:
                "Scented by DDSD captures the essence of luxury. The packaging, the scent, the whole experience is 10/10. My new favorite brand!",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
        },
    ];

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        const bounds = cardRefs.current[index]?.getBoundingClientRect();
        if (!bounds) return;
        setTooltip({
            visible: true,
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
            text: testimonials[index].name,
        });
    };

    const handleMouseLeave = () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-24 px-6 md:px-12 bg-white">
            {/* Title and description */}
            <div className="text-center max-w-3xl ">
                <h2 className="text-2xl md:text-3xl font-playfair text-black mb-4 uppercase tracking-[0.1em]">
                    What Our Clients Say
                </h2>
                <div className="h-px w-24 bg-black/10 mx-auto" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        ref={(el) => { cardRefs.current[index] = el }}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={handleMouseLeave}
                        className="relative border border-black/5 bg-white rounded-2xl overflow-hidden max-w-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        {tooltip.visible && tooltip.text === testimonial.name && (
                            <span
                                className="absolute px-3 py-1 text-xs font-medium uppercase tracking-widest rounded-full text-nowrap bg-black text-white pointer-events-none z-20"
                                style={{
                                    top: tooltip.y + 12,
                                    left: tooltip.x + 12,
                                    transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                                    animationDelay: "0.1s",
                                }}
                            >
                                {tooltip.text}
                            </span>
                        )}

                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="mb-8 text-black/80">
                                <h3 className="text-lg font-playfair font-medium text-black mb-4">
                                    "Truly Exceptional"
                                </h3>
                                <p className="text-sm leading-relaxed font-inter font-light text-black/70">
                                    {testimonial.message}
                                </p>
                            </div>
                            <div className="flex items-center justify-center border-t border-black/5 pt-6 w-full">
                                <img
                                    className="rounded-full w-10 h-10 object-cover border border-black/10"
                                    src={testimonial.image}
                                    alt={`${testimonial.name} profile`}
                                />
                                <div className="space-y-0.5 text-left ml-3">
                                    <p className="font-playfair font-medium text-black">{testimonial.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-black/50 font-medium">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
