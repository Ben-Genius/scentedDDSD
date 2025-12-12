
import React, { useEffect, useRef } from 'react';
import { Star, Quote, Package, Shield, Leaf, RotateCcw, Award, Heart } from 'lucide-react';

const customerStories = [
    {
        id: 1,
        name: 'Ama Mensah',
        location: 'East Legon, Accra',
        rating: 5,
        review: 'The Lavender Calm candle has become my nightly ritual. The scent is so pure and soothing - it helps me unwind after long days at work. I love that it\'s hand-poured right here in Ghana with such attention to detail.',
        image: '/api/placeholder/60/60',
        product: 'Lavender Calm Candle (Grande)',
        verified: true
    },
    {
        id: 2,
        name: 'Kwame Osei',
        location: 'Airport Residential, Accra',
        rating: 5,
        review: 'As someone who works from home, scent is everything to me. The Royal English Rose diffuser keeps my office smelling fresh and luxurious all day. Clients who visit always ask what fragrance I\'m using!',
        image: '/api/placeholder/60/60',
        product: 'Royal English Rose Diffuser',
        verified: true
    },
    {
        id: 3,
        name: 'Yaa Asantewaa',
        location: 'Cantonments, Accra',
        rating: 5,
        review: 'I ordered the Tropical Paradise bundle as a housewarming gift for my sister and she absolutely loved it! The packaging was beautiful and the scents are divine. Supporting local businesses has never felt so good.',
        image: '/api/placeholder/60/60',
        product: 'Tropical Paradise Bundle',
        verified: true
    },
    {
        id: 4,
        name: 'Nana Yaw Boateng',
        location: 'Roman Ridge, Accra',
        rating: 5,
        review: 'The quality is exceptional. I\'ve tried many candle brands and DDSD stands out. The burn time is incredible and the scent throw fills my entire living room. The Midnight Oud is my favorite - so rich and sophisticated.',
        image: '/api/placeholder/60/60',
        product: 'Midnight Oud Candle (Luxe)',
        verified: true
    },
    {
        id: 5,
        name: 'Adwoa Serwaa',
        location: 'Osu, Accra',
        rating: 5,
        review: 'I bought the essential oils collection and use them in my oil burner every evening. The therapeutic benefits are real - I sleep better and my apartment always smells amazing. The Vanilla oil is heavenly!',
        image: '/api/placeholder/60/60',
        product: 'Essential Oil Collection',
        verified: true
    },
    {
        id: 6,
        name: 'Kojo Ansah',
        location: 'Labone, Accra',
        rating: 5,
        review: 'DDSD has become my go-to for gifts. Whether it\'s birthdays, anniversaries, or corporate gifts, their products never disappoint. The presentation is always immaculate and delivery is prompt. Highly recommended!',
        image: '/api/placeholder/60/60',
        product: 'Signature Gift Set',
        verified: true
    },
    {
        id: 7,
        name: 'Efua Danso',
        location: 'Dzorwulu, Accra',
        rating: 5,
        review: 'The Champagne Blossom shower gel is pure luxury! It makes my morning shower feel like a spa experience. The scent lingers on my skin all day. I\'m so glad I discovered this brand.',
        image: '/api/placeholder/60/60',
        product: 'Champagne Blossom Shower Gel',
        verified: true
    },
    {
        id: 8,
        name: 'Kofi Mensah',
        location: 'Tema, Greater Accra',
        rating: 5,
        review: 'Ordered multiple items for my new apartment and couldn\'t be happier. The customer service was excellent - they helped me choose the perfect scents for each room. Everything arrived beautifully packaged.',
        image: '/api/placeholder/60/60',
        product: 'Multi-Room Collection',
        verified: true
    }
];

const guarantees = [
    {
        icon: <Package className="w-10 h-10" />,
        title: 'Free Shipping',
        description: 'Fast and free delivery on all orders over GHS 200 to your door across Greater Accra'
    },
    {
        icon: <Shield className="w-10 h-10" />,
        title: 'Your Happiness Rocks!',
        description: 'We strive every day to become even better and ensure your complete satisfaction'
    },
    {
        icon: <Leaf className="w-10 h-10" />,
        title: 'Natural Materials 100%',
        description: 'In production we use only natural, ethically sourced products and premium ingredients'
    },
    {
        icon: <RotateCcw className="w-10 h-10" />,
        title: 'Easy Returns',
        description: 'Returns extended to 30 days with hassle-free refund process for your peace of mind'
    }
];

export const Testimonials = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marqueeContent = marqueeRef.current?.querySelector('.marquee-content');
        if (marqueeContent && marqueeRef.current) {
            // Duplicate content for seamless loop
            const clone = marqueeContent.cloneNode(true) as HTMLElement;
            marqueeRef.current.appendChild(clone);

            // Pause on hover
            marqueeRef.current.addEventListener('mouseenter', () => {
                marqueeRef.current?.classList.add('paused');
            });

            marqueeRef.current.addEventListener('mouseleave', () => {
                marqueeRef.current?.classList.remove('paused');
            });
        }
    }, []);

    return (
        <div className="bg-black text-white">
            {/* Guarantee Section */}
            <section className="bg-gradient-to-b from-[#d4c5b3] to-[#c9b9a6] py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-700 mb-3">
                            Your Satisfaction is Our Top Priority
                        </p>
                        <h2 className="text-4xl md:text-5xl font-playfair text-black">
                            That's What We Guarantee
                        </h2>
                    </div>

                    {/* Guarantees Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {guarantees.map((guarantee, index) => (
                            <div key={index} className="text-center group">
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-black transition-transform duration-300 group-hover:scale-110">
                                    {guarantee.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-playfair text-black mb-3 uppercase tracking-wide">
                                    {guarantee.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-700 leading-relaxed max-w-xs mx-auto">
                                    {guarantee.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Stories Section */}
            <section className="py-20 overflow-hidden bg-black">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-4">
                            <Heart className="w-4 h-4 text-gold" />
                            <span className="text-gold text-xs font-bold uppercase tracking-wider">
                                Customer Love
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">
                            Stories from Our <span className="text-gold">Community</span>
                        </h2>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Hear from our satisfied customers across Ghana who have transformed
                            their spaces with Scented by DDSD fragrances
                        </p>
                    </div>

                    {/* Trust Metrics */}
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                ))}
                            </div>
                            <p className="text-3xl font-bold text-gold mb-1">4.9/5.0</p>
                            <p className="text-gray-400 text-sm">Average Rating</p>
                        </div>

                        <div className="w-px bg-white/10"></div>

                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Award className="w-6 h-6 text-gold" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">500+</p>
                            <p className="text-gray-400 text-sm">Happy Customers</p>
                        </div>

                        <div className="w-px bg-white/10"></div>

                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Shield className="w-6 h-6 text-gold" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">100%</p>
                            <p className="text-gray-400 text-sm">Verified Reviews</p>
                        </div>
                    </div>

                    {/* Infinite Marquee */}
                    <div
                        ref={marqueeRef}
                        className="relative overflow-hidden testimonial-marquee"
                    >
                        <div className="marquee-content flex gap-6 animate-marquee">
                            {customerStories.map((story) => (
                                <div
                                    key={story.id}
                                    className="max-w-[320px] m-5 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-gold/50 hover:bg-white/10 transition-all duration-300 flex-shrink-0"
                                >
                                    {/* Header */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center text-black font-bold text-base flex-shrink-0 shadow-lg">
                                            {story.name.charAt(0)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-white text-sm truncate">
                                                {story.name}
                                            </h4>
                                            <p className="text-[10px] text-gray-400 truncate">{story.location}</p>
                                        </div>

                                        <Quote className="w-5 h-5 text-gold/20 flex-shrink-0" />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-0.5 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < story.rating ? 'fill-gold text-gold' : 'text-gray-700'}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Review */}
                                    <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3">
                                        "{story.review}"
                                    </p>

                                    {/* Product */}
                                    <div className="pt-3 border-t border-white/10">
                                        <p className="text-[10px] text-gray-500 mb-0.5">Purchased</p>
                                        <p className="text-xs text-gold font-medium truncate">{story.product}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center gap-3 text-sm text-gray-400 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-gold text-gold" />
                                <span className="font-semibold text-white">4.9</span>
                            </div>
                            <span className="text-white/20">•</span>
                            <span>500+ Happy Customers</span>
                            <span className="text-white/20">•</span>
                            <span>Across Ghana</span>
                            <span className="text-white/20">•</span>
                            <span className="text-gold">100% Verified Reviews</span>
                        </div>

                        <div className="mt-8">
                            <a
                                href="/reviews"
                                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
                            >
                                Read All Reviews
                                <span className="text-xl">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add this to your global CSS or tailwind config */}
            <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .testimonial-marquee.paused .animate-marquee {
          animation-play-state: paused;
        }

        .testimonial-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};
