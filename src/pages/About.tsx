import React from "react";
import { IMAGES } from "@/assets";

type TeamMember = {
    id: number;
    name: string;
    role: string;
    bio?: string;
    photo?: string;
    linkedin?: string;
};

type AboutProps = {
    heroVideo?: string;
    heroImage?: string;
    team?: TeamMember[];
};

export const About: React.FC<AboutProps> = ({
    heroVideo,
    heroImage = IMAGES.hero,
    team = []
}) => {
    return (
        <main className="w-full text-gray-900 bg-white">
            {/* HERO */}
            <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden bg-black text-white">
                {heroVideo ? (
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        src={heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedMetadata={(e) => {
                            try {
                                (e.target as HTMLVideoElement).playbackRate = 0.6;
                            } catch { }
                        }}
                    />
                ) : (
                    <img
                        src={heroImage}
                        alt="Scented By DDSD - artisans at work"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                )}

                {/* subtle gold overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 container mx-auto px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-3xl">
                        <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4 font-bold">Our Story</p>
                        <h1 className="text-3xl md:text-5xl font-playfair leading-tight mb-6">
                            Hand-poured craft. <br />Ghanaian heart. <br /><span className="text-gold">Global standards.</span>
                        </h1>
                        <p className="text-gray-200 max-w-2xl mb-8 text-lg leading-relaxed font-light">
                            At Scented By DDSD we craft luxurious home fragrances — candles, diffusers, oils and care rituals — using premium ingredients and an artisanal process rooted in Ghanaian care.
                        </p>

                        <a
                            href="#mission"
                            className="inline-block px-8 py-3 bg-gold text-black font-semibold rounded hover:bg-white transition-colors duration-300"
                        >
                            Learn about our mission
                        </a>
                    </div>
                </div>
            </section>

            {/* MISSION / VISION */}
            <section id="mission" className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-playfair mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            To create meaningful scent experiences that awaken memories, calm the mind, and elevate everyday rituals — all while supporting local artisans and sustainable practices.
                        </p>

                        <h3 className="text-xl font-playfair mb-3">Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To be Ghana’s leading luxury fragrance house — recognized for craft, quality and social impact.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center font-bold text-xl text-gold shrink-0 border border-gold/20">01</div>
                            <div>
                                <h4 className="font-playfair text-xl mb-2">Craftsmanship</h4>
                                <p className="text-gray-600">Hand-poured batches, small-run quality control and aroma accuracy.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center font-bold text-xl text-gold shrink-0 border border-gold/20">02</div>
                            <div>
                                <h4 className="font-playfair text-xl mb-2">Sustainability</h4>
                                <p className="text-gray-600">Eco-friendly packaging, responsibly sourced waxes, and locally funded initiatives.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center font-bold text-xl text-gold shrink-0 border border-gold/20">03</div>
                            <div>
                                <h4 className="font-playfair text-xl mb-2">Community</h4>
                                <p className="text-gray-600">Training and fair wages for local makers — growing a sustainable craft economy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE / HISTORY */}
            <section className="py-20 bg-[#faf9f6]">
                <div className="container mx-auto px-6 lg:px-8">
                    <h3 className="text-center text-3xl font-playfair mb-12">Our Journey</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <span className="text-gold font-bold text-lg mb-2 block">2018</span>
                            <h4 className="font-playfair text-xl mb-3">Founded</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">A small kitchen atelier in Accra, experimenting with local wax blends and discovering the perfect scent combinations.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform lg:-translate-y-4">
                            <span className="text-gold font-bold text-lg mb-2 block">2019</span>
                            <h4 className="font-playfair text-xl mb-3">First Collection</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">Our first signature scents launched: Amber & Oud, Lavender Calm and Champagne Blossom, setting the standard for quality.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <span className="text-gold font-bold text-lg mb-2 block">2022</span>
                            <h4 className="font-playfair text-xl mb-3">Growth & Impact</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">Expanded to a dedicated studio, created community training programs and launched ethical sourcing policies.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section id="team" className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-gold text-xs uppercase tracking-widest font-bold mb-2">The People Behind The Brand</p>
                        <h3 className="text-3xl md:text-4xl font-playfair">Meet the Makers</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {team.length ? (
                            team.map((m) => (
                                <div key={m.id} className="text-center group">
                                    <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg">
                                        <img
                                            src={m.photo ?? "/images/about/team-placeholder.jpg"}
                                            alt={m.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <h4 className="font-playfair text-lg">{m.name}</h4>
                                    <p className="text-sm text-gold font-medium mb-2">{m.role}</p>
                                    {m.bio && <p className="text-gray-500 text-sm leading-relaxed">{m.bio}</p>}
                                </div>
                            ))
                        ) : (
                            <>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="text-center group">
                                        {/* Using a generic placeholder div since we don't have team photos yet */}
                                        <div className="mx-auto w-40 h-40 rounded-full bg-gray-100 mb-6 flex items-center justify-center text-gray-300 border border-gray-200">
                                            <span className="text-4xl font-playfair opacity-20">{i + 1}</span>
                                        </div>
                                        <h4 className="font-playfair text-lg">Team Member</h4>
                                        <p className="text-sm text-gold font-medium">Artisan Specialist</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* SUSTAINABILITY & SOCIAL IMPACT */}
            <section className="py-20 bg-[#faf9f6]">
                <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-gold text-xs uppercase tracking-widest font-bold mb-2 block">Our Commitment</span>
                        <h3 className="text-3xl md:text-4xl font-playfair mb-6">Sustainability & Impact</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                            We use a mix of 100% natural wax blends, recyclable packaging, and ethically sourced fragrance oils. A portion of each sale supports local artisan training and community projects.
                        </p>

                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✦</span>
                                Plant-based wax blends (soy / rapeseed / coconut mixes)
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✦</span>
                                Minimal plastic, recyclable boxes and soy-based inks
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-gold mt-1">✦</span>
                                Fair pay & craft training for local makers
                            </li>
                        </ul>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={IMAGES.soap}
                            alt="Sustainable packaging"
                            className="w-full h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white max-w-xs">
                            <p className="font-playfair italic text-lg">"Respecting nature in every pour."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-black text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <h4 className="text-3xl md:text-4xl font-playfair mb-6">Experience the Craft</h4>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">Explore our collections or act us to book a studio visit to see how our luxurious scents are made.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a className="px-8 py-3 bg-gold text-black rounded font-semibold hover:bg-white transition-colors duration-300" href="/shop">Shop Collections</a>
                        <a className="px-8 py-3 border border-white/30 text-white rounded hover:bg-white/10 transition-colors duration-300" href="/contact">Visit Studio</a>
                    </div>
                </div>
            </section>
        </main>
    );
};
