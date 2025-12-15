import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { MarketingMarquee } from '../components/MarketingMarquee';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import FeatureSection from '@/components/Featured';
import { SimpleNewArrivals } from '../components/SimpleNewArrivals';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(products => {
            setFeaturedProducts(products.filter(p => p.featured));
        });
    }, []);


    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="bg-black/40 backdrop-blur-md border border-gold/30 text-white font-playfair text-3xl md:text-5xl font-bold w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-lg">
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-gold text-xs uppercase tracking-widest mt-2">{label}</span>
        </div>
    );
    
    const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
        const calculateTimeLeft = (): TimeLeft => {
            const difference = +targetDate - +new Date();
            let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

        useEffect(() => {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearTimeout(timer);
        });

        return (
            <div className="flex flex-wrap justify-center mt-8 mb-10">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
        );
    };
    return (
        <>
            <Hero />
            <div className="bg-champagne-100  relative z-10">
                <ProductGrid products={featuredProducts} title="Featured Collections" />
                <div className='flex flex-col items-center justify-center text-center '>
                    <span className="block text-gold text-xs uppercase tracking-[0.4em]  font-inter">
                        Holiday Exclusive
                    </span>

                    <h2 className="text-4xl md:text-5xl font-playfair text-rose mb-2 leading-tight">
                        Christmas Sale  <br />

                        <span className="mt-3 block text-gold text-sm uppercase tracking-[0.4em] mb-4 font-inter">Ends In</span>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />

                    </h2>

                </div>
                {/* Christmas Sale Section */}
                <section className="relative py-32 overflow-hidden mb-9">
                    <div className="absolute inset-0">
                        <img
                            src={IMAGES.allprod3}
                            alt="Christmas Sale Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 " />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <span className="block text-gold text-sm uppercase tracking-[0.4em] mb-4 font-inter">Ends In</span>

                        <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed animate-fade-in-up delay-200 drop-shadow-md">
                            Discover the perfect gift for your loved ones. Elevate your holiday season with our handcrafted fragrances,
                            now available at exclusive prices for a limited time.
                        </p>

                        <div className="animate-fade-in-up delay-300">
                            <CountdownTimer targetDate={new Date(`December 25, ${new Date().getFullYear()} 00:00:00`)} />
                        </div>

                        <div className="animate-fade-in-up delay-500">
                            <Link
                                to="/shop"
                                className="inline-block px-10 py-4 bg-rose text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-rose transition-colors duration-300 rounded-sm"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </section>
                <MarketingMarquee />

                <SimpleNewArrivals />

            
                <FeatureSection />
                <Testimonials />

            </div>
        </>
    );
};
