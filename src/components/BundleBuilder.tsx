import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Plus,
    ShoppingBag,
    Gift,
    Sparkles,
    Check,
    Trash2,
    Send,
    Wand2,
    Activity,
    PenTool,
    Info,
    X,
    ChevronUp
} from 'lucide-react';
import { Product } from '../types';
import { useLocalCart } from '../hooks/useLocalCart';

const formatMoney = (amount: number) => new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS'
}).format(amount);

interface BundleBuilderProps {
    availableProducts: Product[];
}

interface BundleItem extends Product {
    uniqueId: number;
}

const RewardTrack = ({ count }: { count: number }) => {
    const tiers = [{ threshold: 3, discount: '10%' }, { threshold: 5, discount: '15%' }];
    return (
        <div className="relative pt-6 pb-2">
            <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden flex">
                <motion.div
                    animate={{ width: `${(count / 5) * 100}%` }}
                    className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                />
            </div>
            <div className="flex justify-between mt-2 px-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className={`w-1 h-1 rounded-full mb-1 ${i <= count ? 'bg-amber-500' : 'bg-stone-300'}`} />
                        {tiers.find(t => t.threshold === i) && (
                            <span className={`text-[10px] font-bold tracking-tighter ${i <= count ? 'text-amber-600' : 'text-stone-400'}`}>
                                {tiers.find(t => t.threshold === i)?.discount} OFF
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const BundleBuilder = ({ availableProducts }: BundleBuilderProps) => {
    const { addItem } = useLocalCart();
    const [bundleItems, setBundleItems] = useState<BundleItem[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isMobileTrayOpen, setIsMobileTrayOpen] = useState(false);

    // Local "AI" State
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiMessage, setAiMessage] = useState("");
    const [harmonyReport, setHarmonyReport] = useState<string | null>(null);
    const [isHarmonyLoading, setIsHarmonyLoading] = useState(false);
    const [chatInput, setChatInput] = useState("");

    const discount = bundleItems.length >= 5 ? 0.15 : bundleItems.length >= 3 ? 0.10 : 0;
    const subtotal = bundleItems.reduce((sum, p) => sum + p.variants[0].priceGHS, 0);
    const total = subtotal * (1 - discount);

    const toggleProductSelection = (product: Product) => {
        const isSelected = bundleItems.some(item => item.id === product.id);

        if (isSelected) {
            // Unselect: Remove all instances of this product
            setBundleItems(bundleItems.filter(item => item.id !== product.id));
        } else {
            // Select: Add item if space permits
            if (bundleItems.length >= 5) {
                alert("Your curator tray is full! Remove an item to add more.");
                return;
            }
            setBundleItems([...bundleItems, { ...product, uniqueId: Math.random() }]);
        }
    };

    const removeFromBundle = (uniqueId: number) => {
        setBundleItems(bundleItems.filter(item => item.uniqueId !== uniqueId));
    };

    /**
     * LOCAL AI SIMULATION: Smart Scent Curator
     * Uses keyword matching and weighting to simulate an AI curator.
     */
    const curateWithLocalIntelligence = async (input: string) => {
        if (!input.trim()) return;
        setIsAiLoading(true);
        setAiMessage("Analyzing your mood...");

        // Simulate "thinking" time
        await new Promise(resolve => setTimeout(resolve, 1500));

        const keywords = input.toLowerCase().split(/[\s,.]+/).filter(w => w.length > 2);

        // Scoring system: +3 for direct hit in title, +2 in scents, +1 in category
        const scoredProducts = availableProducts.map(product => {
            let score = Math.random() * 0.5; // Slight randomness to keep it fresh

            keywords.forEach(word => {
                if (product.title.toLowerCase().includes(word)) score += 3;
                if (product.scents.some(s => s.toLowerCase().includes(word))) score += 2;
                if (product.category.toLowerCase().includes(word)) score += 1;

                // Semantic adjustments (simple thesaurus)
                if (word === 'relax' || word === 'calm' || word === 'sleep') {
                    if (product.scents.some(s => /lavender|chamomile|vanilla|sandalwood/i.test(s))) score += 2;
                }
                if (word === 'fresh' || word === 'morning' || word === 'clean') {
                    if (product.scents.some(s => /lemon|citrus|mint|cotton|ocean|sea/i.test(s))) score += 2;
                }
                if (word === 'romantic' || word === 'date' || word === 'love') {
                    if (product.scents.some(s => /rose|jasmine|amber|musk|oud/i.test(s))) score += 2;
                }
            });

            return { product, score };
        });

        // Sort by score desc, then pick top 5
        scoredProducts.sort((a, b) => b.score - a.score);

        const selected = scoredProducts.slice(0, 5).map(item => ({
            ...item.product,
            uniqueId: Math.random()
        }));

        // If we didn't get 5 good matches (low scores), fill with random favorites
        while (selected.length < 5) {
            const random = availableProducts[Math.floor(Math.random() * availableProducts.length)];
            if (!selected.find(p => p.id === random.id)) {
                selected.push({ ...random, uniqueId: Math.random() });
            }
        }

        setBundleItems(selected);

        // Dynamic Curator Note
        const bestMatchWord = keywords.length > 0 ? keywords[0] : 'your vibe';
        const notes = [
            `I've selected these scents to perfectly match the "${bestMatchWord}" mood you're looking for.`,
            `A curated collection inspired by your request for "${bestMatchWord}".`,
            `This selection balances notes that evoke "${bestMatchWord}" with complementary undertones.`,
        ];
        setAiMessage(notes[Math.floor(Math.random() * notes.length)]);
        setChatInput("");
        setIsAiLoading(false);
    };

    /**
     * LOCAL AI SIMULATION: Harmony Analysis
     * Analyzes the composition of the bundle locally.
     */
    const analyzeHarmonyLocal = async () => {
        if (bundleItems.length < 2) return;
        setIsHarmonyLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Gather stats
        const allScents = bundleItems.flatMap(i => i.scents);
        const categories = bundleItems.map(i => i.category);
        const textDesc = bundleItems.map(i => i.title).join(' ');

        let critique = "A beautiful selection.";

        // Logic Rules
        const uniqueCategories = new Set(categories);
        const hasOud = allScents.some(s => /oud/i.test(s));
        const hasCitrus = allScents.some(s => /lemon|lime|bergamot/i.test(s));
        const hasFloral = allScents.some(s => /rose|jasmine|lavender/i.test(s));

        if (uniqueCategories.size === 1) {
            critique = "A highly focused collection. Using the same product type ensures a consistent fragrance throw throughout your space.";
        } else if (uniqueCategories.size >= 3) {
            critique = "A versatile assortment! This multi-format bundle allows you to layer scents across different rooms for a fully immersive experience.";
        } else if (hasOud && hasCitrus) {
            critique = "An intriguing contrast! The depth of Oud balances beautifully with the brightness of citrus notes for a sophisticated profile.";
        } else if (hasFloral && hasOud) {
            critique = "Classic elegance. The floral top notes will lift the rich, woody base of the Oud for a timeless and romantic atmosphere.";
        } else {
            critique = "This selection offers a harmonious blend of notes that will create a welcoming and refined ambiance in any home.";
        }

        setHarmonyReport(critique);
        setIsHarmonyLoading(false);
    };

    const handleCheckout = () => {
        bundleItems.forEach(p => {
            addItem(p, p.variants[0], undefined, p.scents[0], undefined, 1);
        });
        setBundleItems([]);
        alert("Bundle added to cart successfully!");
    }

    const categoriesFiltered = ['All', ...Array.from(new Set(availableProducts.map(p => p.category)))];

    // Reusable Tray Content
    const CuratorTrayContent = () => (
        <div className="bg-white lg:rounded-3xl p-8 border-stone-100 lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden h-full lg:h-auto overflow-y-auto">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Gift size={120} />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-serif">Your Curator Tray</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${bundleItems.length === 5 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {bundleItems.length} / 5 Slots
                    </span>
                </div>

                <RewardTrack count={bundleItems.length} />

                {/* Slots Grid */}
                <div className="grid grid-cols-5 gap-3 mt-8">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="aspect-square relative">
                            <AnimatePresence mode="popLayout">
                                {bundleItems[i] ? (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        <div className="w-full h-full rounded-xl overflow-hidden shadow-md border border-stone-100 group relative">
                                            <img src={bundleItems[i].images.default} className="w-full h-full object-cover" alt="" />
                                            <button
                                                onClick={() => removeFromBundle(bundleItems[i].uniqueId)}
                                                className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity z-20"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="w-full h-full rounded-xl border-2 border-dashed border-stone-100 bg-stone-50/50 flex items-center justify-center text-stone-200">
                                        <Sparkles size={14} />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* AI Harmony Checker */}
                {bundleItems.length >= 2 && (
                    <div className="mt-8 border-t border-stone-100 pt-6">
                        <button
                            onClick={analyzeHarmonyLocal}
                            disabled={isHarmonyLoading}
                            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-xs font-bold uppercase tracking-widest mb-3"
                        >
                            <Activity size={14} className={isHarmonyLoading ? 'animate-pulse' : ''} />
                            {isHarmonyLoading ? 'Analyzing Composition...' : '✨ Harmony Check'}
                        </button>
                        {harmonyReport && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-sm italic text-stone-600 leading-relaxed"
                            >
                                "{harmonyReport}"
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Empty State Help */}
                {bundleItems.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 text-stone-400 text-sm italic"
                    >
                        Select scents from the library to fill your tray...
                    </motion.p>
                )}

                {/* Calculation Table */}
                <div className="mt-10 pt-8 border-t border-stone-100 space-y-3">
                    <div className="flex justify-between text-stone-400 text-sm">
                        <span>Subtotal</span>
                        <span>{formatMoney(subtotal)}</span>
                    </div>

                    <AnimatePresence>
                        {discount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex justify-between text-green-600 text-sm font-bold bg-green-50 px-3 py-2 rounded-lg"
                            >
                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    {discount * 100}% Bundle Discount
                                </span>
                                <span>-{formatMoney(subtotal * discount)}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-between items-baseline pt-4">
                        <span className="text-lg font-serif">Bundle Total</span>
                        <div className="text-right">
                            <span className="text-3xl font-serif text-stone-900 block">
                                {formatMoney(total)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8 pb-8 lg:pb-0">
                    <button
                        disabled={bundleItems.length === 0}
                        className={`
                      group flex items-center justify-center gap-2 py-4 rounded-full transition-all active:scale-[0.98] border
                      ${bundleItems.length === 0
                                ? 'bg-stone-50 border-stone-100 text-stone-300'
                                : 'bg-white border-stone-200 text-stone-900 hover:bg-stone-50'}
                    `}
                    >
                        <PenTool size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.1em]">✨ Gift Note</span>
                    </button>
                    <button
                        onClick={handleCheckout}
                        disabled={bundleItems.length === 0}
                        className={`
                      group flex items-center justify-center gap-2 py-4 rounded-full transition-all active:scale-[0.98]
                      ${bundleItems.length === 0
                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                : 'bg-stone-900 text-white shadow-xl hover:bg-black'}
                    `}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.1em]">Checkout</span>
                        <ShoppingBag size={14} />
                    </button>
                </div>

                <p className="mt-4 text-[10px] text-center text-stone-400 uppercase tracking-widest font-bold">
                    Free Premium Packaging Included
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-amber-100 pb-20 rounded-3xl">



            <main className="max-w-full mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Desktop Sidebar (Reference Reusable Content) */}
                    <aside className="lg:col-span-5 lg:order-2 sticky top-14 pt-10 mt-8 z-30 hidden lg:block border border-stone-100 rounded-3xl shadow-sm">
                        <CuratorTrayContent />
                    </aside>

                    {/* Mobile Floating Button */}
                    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                        <button
                            onClick={() => setIsMobileTrayOpen(true)}
                            className="bg-stone-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 active:scale-95 transition-transform"
                        >
                            <Gift size={20} />
                            <span className="font-bold text-xs uppercase tracking-widest">
                                Tray
                            </span>
                            <span className="bg-amber-400 text-black w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold">
                                {bundleItems.length}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Drawer Overlay */}
                    <AnimatePresence>
                        {isMobileTrayOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                                    onClick={() => setIsMobileTrayOpen(false)}
                                />
                                <motion.div
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[2rem] z-50 lg:hidden overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.2)]"
                                >
                                    <div className="absolute top-4 right-4 z-20">
                                        <button
                                            onClick={() => setIsMobileTrayOpen(false)}
                                            className="p-2 bg-stone-100 rounded-full hover:bg-stone-200"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mt-4 mb-2" />
                                    <CuratorTrayContent />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>


                    {/* Library of Products */}
                    <div className="lg:col-span-7 lg:order-1">
                        {/* AI Mood Input Box */}
                        <div className="mb-12 bg-stone-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <Wand2 size={80} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-serif mb-2">✨ Scent Mood Assistant</h3>
                                <p className="text-stone-400 text-sm mb-6 max-w-md">Tell us how you want your home to feel (e.g., "A rainy morning in a library" or "Tropical sunset cocktail party") and let AI curate your tray.</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Describe your mood..."
                                        className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-400/50 placeholder:text-stone-500"
                                        onKeyDown={(e) => e.key === 'Enter' && curateWithLocalIntelligence(chatInput)}
                                    />
                                    <button
                                        onClick={() => curateWithLocalIntelligence(chatInput)}
                                        disabled={isAiLoading}
                                        className="bg-amber-400 text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors disabled:opacity-50"
                                    >
                                        {isAiLoading ? 'Analyzing...' : <Send size={18} />}
                                    </button>
                                </div>
                                {aiMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 flex gap-3"
                                    >
                                        <Sparkles className="text-amber-400 shrink-0" size={18} />
                                        <p className="text-sm italic leading-relaxed text-stone-300">{aiMessage}</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {availableProducts.filter(p => activeCategory === 'All' || p.category === activeCategory).map((product, idx) => {
                                const isSelected = bundleItems.some(i => i.id === product.id);

                                return (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group"
                                    >
                                        <div className={`relative aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden mb-4 shadow-sm transition-all duration-300 ${isSelected ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}>
                                            <img
                                                src={product.images.default}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                            />

                                            {isSelected && (
                                                <div className="absolute top-2 right-2 z-10 bg-amber-400 text-black px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1">
                                                    <Check size={10} /> Added
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                <button
                                                    onClick={() => toggleProductSelection(product)}
                                                    className={`
                                                    p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform hover:scale-110 active:scale-95
                                                    ${isSelected ? 'bg-amber-400 text-black' : 'bg-white text-stone-900'}
                                                `}
                                                >
                                                    {isSelected ? <Check size={24} /> : (bundleItems.length >= 5 ? <Info size={24} /> : <Plus size={24} />)}
                                                </button>
                                            </div>

                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-start px-1 mt-4 text-center">
                                            <div className="w-full space-y-2">
                                                {/* Product Title - Matches ProductCard */}
                                                <h4 className="text-sm uppercase tracking-[0.2em] font-playfair text-black 
                                  group-hover:text-black/70 transition-colors duration-300">
                                                    {product.title}
                                                </h4>

                                                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-widest mb-1 truncate max-w-full mx-auto">{product.scents.join(', ')}</p>

                                                {/* Price - Matches ProductCard */}
                                                <p className="text-black/60 text-xs font-inter tracking-widest font-medium">
                                                    {formatMoney(product.variants[0].priceGHS)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
