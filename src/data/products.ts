import { IMAGES } from '@/assets';
import { Product } from '@/types';


import candle1Hover from '../assets/collections/candles/1.1.png';
import candle2Hover from '../assets/collections/candles/2.2.png';
import candle3Hover from '../assets/collections/candles/3.3.png';
import candle4Hover from '../assets/collections/candles/4.4.png';
import candle5Hover from '../assets/collections/candles/5.5.png';
import candle6Hover from '../assets/collections/candles/6.6.png';
import candle7Hover from '../assets/collections/candles/2.2.png';
import candle8Hover from '../assets/collections/candles/3.3.png';

import wood1Hover from '../assets/collections/candles/wood/w11.png';
import wood2Hover from '../assets/collections/candles/wood/w22.png';
import wood3Hover from '../assets/collections/candles/wood/w33.png';
import wood4Hover from '../assets/collections/candles/wood/w44.png';


import oriental1Hover from '../assets/collections/candles/oriental/o11.png';
import oriental2Hover from '../assets/collections/candles/oriental/o22.png';
import oriental3Hover from '../assets/collections/candles/oriental/o33.png';
import oriental4Hover from '../assets/collections/candles/oriental/o44.png';
import oriental5Hover from '../assets/collections/candles/oriental/o55.png';
import oriental6Hover from '../assets/collections/candles/oriental/o66.png';
import oriental7Hover from '../assets/collections/candles/oriental/o77.png';

import gourmet1Hover from '../assets/collections/candles/gourmet/g11.png';
import gourmet2Hover from '../assets/collections/candles/gourmet/g22.png';
import gourmet3Hover from '../assets/collections/candles/gourmet/g33.png';
import gourmet4Hover from '../assets/collections/candles/gourmet/g33.png';
import gourmet5Hover from '../assets/collections/candles/gourmet/g55.png';
import gourmet6Hover from '../assets/collections/candles/gourmet/g66.png';
import gourmet7Hover from '../assets/collections/candles/gourmet/g77.png';

import fresh1Hover from '../assets/collections/candles/fresh/f11.png';
import fresh2Hover from '../assets/collections/candles/fresh/f22.png';
import fresh3Hover from '../assets/collections/candles/fresh/f33.png';
import fresh4Hover from '../assets/collections/candles/fresh/f44.png';
import fresh5Hover from '../assets/collections/candles/fresh/f55.png';
import fresh6Hover from '../assets/collections/candles/fresh/f66.png';
import fresh7Hover from '../assets/collections/candles/fresh/f77.png';




export const products: Product[] = [
    // --- Reed Diffusers (Split by Price Tier) ---
    {
        id: "p-diffuser-classic",
        title: "Reed Diffusers (Classic)",
        slug: "reed-diffuser-classic",
        category: "Reed Diffuser",
        shortDescription: "Signature fragrances to scent your space.",
        longDescription: "Elegant reed diffusers delivering continuous fragrance. Includes reeds.",
        basePrice: 100,
        stock: 50,
        featured: true,
        images: {
            default: IMAGES.difflover,
            gallery: [IMAGES.diffavent2, IMAGES.new3, IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [
            { id: "v-diff-classic", label: "Standard", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 100 }
        ],
        scents: ["Peach", "Encounter", "Hilton", "Miss Coco Chanel"]
    },
    {
        id: "p-diffuser-premium",
        title: "Reed Diffusers (Premium)",
        slug: "reed-diffuser-premium",
        category: "Reed Diffuser",
        shortDescription: "Complex botanical and luxury blends.",
        longDescription: "Premium collection of sophisticated fragrances for a refined atmosphere.",
        basePrice: 150,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.diffchannel,
            gallery: [IMAGES.new4, IMAGES.new5, IMAGES.new5],
            colorVariants: []
        },
        variants: [
            { id: "v-diff-premium", label: "Standard", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 150 }
        ],
        scents: [
            "Wood Sage and Sea Salt", "Roof Garden", "Strawberry Muse", "Amber Ebony",
            "Honeysuckle Jasmin", "Amour D'Osmanthus", "Fried Tea", "Royal English Rose"
        ]
    },
    {
        id: "p-diffuser-luxury",
        title: "Reed Diffusers (Luxury)",
        slug: "reed-diffuser-luxury",
        category: "Reed Diffuser",
        shortDescription: "Exclusive opulent fragrance.",
        longDescription: "Our most exclusive scent for a truly luxurious experience.",
        basePrice: 200,
        stock: 20,
        featured: true,
        images: {
            default: IMAGES.diffaventus,
            gallery: [IMAGES.new4, IMAGES.new5, IMAGES.new3],
            colorVariants: []
        },
        variants: [
            { id: "v-diff-luxury", label: "Standard", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 200 }
        ],
        scents: ["Champagne Cocktail"]
    },

    // --- REED DIFFUSERS - Floral Romance Collection ---
    {
        id: "p-freesia-english-pear-diffuser",
        title: "Freesia & English Pear Diffuser",
        slug: "freesia-english-pear-diffuser",
        category: "Floral Romance",
        shortDescription: "Delicate freesia and ripe pear.",
        longDescription: "The sensuous freshness of just-ripe pears is wrapped in a bouquet of white freesias.",
        basePrice: 120,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.collectionFloral,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-fep-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: ["Freesia", "Pear", "Patchouli"]
    },
    {
        id: "p-amour-d-osmanthus-diffuser",
        title: "Amour D'Osmanthus Diffuser",
        slug: "amour-d-osmanthus-diffuser",
        category: "Floral Romance",
        shortDescription: "Sweet apricot-like floral.",
        longDescription: "A loving bouquet of sweet osmanthus flowers with fruity undertones.",
        basePrice: 125,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.collectionFloral,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-ado-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Osmanthus", "Benzoin", "Orange"]
    },
    {
        id: "p-midnight-lavender-diffuser",
        title: "Midnight Lavender Diffuser",
        slug: "midnight-lavender-diffuser",
        category: "Floral Romance",
        shortDescription: "Calming night-blooming lavender.",
        longDescription: "A soothing blend of lavender, musk, and tonka bean for a restful atmosphere.",
        basePrice: 115,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.collectionFloral,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-ml-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 115 }],
        scents: ["Lavender", "Musk", "Tonka Bean"]
    },
    {
        id: "p-royal-rose-bloom-diffuser",
        title: "Royal Rose Bloom Diffuser",
        slug: "royal-rose-bloom-diffuser",
        category: "Floral Romance",
        shortDescription: "Majestic rose garden.",
        longDescription: "A regal scent of blooming red roses and soft peony petals.",
        basePrice: 130,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-rrb-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["Red Rose", "Peony", "Musk"]
    },

    // --- REED DIFFUSERS - Woody and Suede Collection ---
    {
        id: "p-tobacco-noir-diffuser",
        title: "Tobacco Noir Diffuser",
        slug: "tobacco-noir-diffuser",
        category: "Woody & Exotic",
        shortDescription: "Smoky and sweet tobacco.",
        longDescription: "Rich tobacco leaf spices with vanilla and cacao for a sophisticated aroma.",
        basePrice: 140,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.collectionWoody,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-tn-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 140 }],
        scents: ["Tobacco", "Vanilla", "Wood"]
    },
    {
        id: "p-black-oud-diffuser",
        title: "Black Oud Diffuser",
        slug: "black-oud-diffuser",
        category: "Woody & Exotic",
        shortDescription: "Intense black oud.",
        longDescription: "A deep, resinous scent of black oud wood, leather, and black pepper.",
        basePrice: 150,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.collectionWoody,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bo-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 150 }],
        scents: ["Oud", "Leather", "Pepper"]
    },
    {
        id: "p-wild-fig-diffuser",
        title: "Wild Fig Diffuser",
        slug: "wild-fig-diffuser",
        category: "Woody & Exotic",
        shortDescription: "Warm figs and cedar.",
        longDescription: "Plump, sun-warmed figs blended with cassis and cedarwood.",
        basePrice: 135,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.collectionWoody,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-wf-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 135 }],
        scents: ["Fig", "Cedarwood", "Cassis"]
    },

    // --- REED DIFFUSERS - Oriental Luxe Collection ---
    {
        id: "p-pomegranate-diffuser",
        title: "Pomegranate Diffuser",
        slug: "pomegranate-diffuser",
        category: "Oriental Luxe",
        shortDescription: "Dark enigmatic fruit.",
        longDescription: "Ruby-rich juices of pomegranate, raspberry and plum spiked with pink pepper.",
        basePrice: 145,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-pom-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 145 }],
        scents: ["Pomegranate", "Pink Pepper", "Lily"]
    },

    // --- REED DIFFUSERS - Gourmand Indulgence Collection ---
    {
        id: "p-champagne-cocktail-diffuser",
        title: "Champagne Cocktail Diffuser",
        slug: "champagne-cocktail-diffuser",
        category: "Gourmet Indulgence",
        shortDescription: "Celebratory fizzy scent.",
        longDescription: "Crisp champagne notes with a twist of citrus zest.",
        basePrice: 160,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-cc-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 160 }],
        scents: ["Champagne", "Citrus", "Grape"]
    },
    {
        id: "p-sugar-vanilla-diffuser",
        title: "Sugar Vanilla Diffuser",
        slug: "sugar-vanilla-diffuser",
        category: "Gourmet Indulgence",
        shortDescription: "Sweet vanilla warmth.",
        longDescription: "Sparkling sugar crystals over warm Madagascar vanilla beans.",
        basePrice: 115,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sv-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 115 }],
        scents: ["Vanilla", "Sugar", "Musk"]
    },
    {
        id: "p-peach-bellini-diffuser",
        title: "Peach Bellini Diffuser",
        slug: "peach-bellini-diffuser",
        category: "Gourmet Indulgence",
        shortDescription: "Fruity sparkling cocktail.",
        longDescription: "Juicy peaches mixed with sparkling prosecco.",
        basePrice: 125,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-pb-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Peach", "Prosecco", "Orange"]
    },

    // --- REED DIFFUSERS - Fresh Whisper Collection ---
    {
        id: "p-sage-sea-salt-diffuser",
        title: "Sage & Sea Salt Diffuser",
        slug: "sage-sea-salt-diffuser",
        category: "Fresh Whisper",
        shortDescription: "Coastal breeze.",
        longDescription: "The mineral scent of the rugged cliffs not far from the ocean.",
        basePrice: 130,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.collectionFresh,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sss-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["Sage", "Sea Salt", "Ambrette"]
    },
    {
        id: "p-lemongrass-diffuser",
        title: "Lemongrass Diffuser",
        slug: "lemongrass-diffuser",
        category: "Fresh Whisper",
        shortDescription: "Zesty and uplifting.",
        longDescription: "Bright lemongrass with a touch of ginger and lime.",
        basePrice: 110,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.collectionFresh,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-lg-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 110 }],
        scents: ["Lemongrass", "Ginger", "Lime"]
    },

    // --- ESSENTIAL OILS - Floral Romance Collection ---
    {
        id: "p-freesia-english-pear-oil",
        title: "Freesia & English Pear Oil",
        slug: "freesia-english-pear-oil",
        category: "Essential Oils",
        shortDescription: "Delicate floral concentrate.",
        longDescription: "Pure essential oil blend of freesia and English pear.",
        basePrice: 85,
        stock: 100,
        featured: false,
        images: {
            default: IMAGES.oil1,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-fep-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 85 }],
        scents: ["Freesia", "Pear"]
    },
    {
        id: "p-blush-peony-oil",
        title: "Blush Peony Oil",
        slug: "blush-peony-oil",
        category: "Essential Oils",
        shortDescription: "Soft pink floral oil.",
        longDescription: "Concentrated oil of blooming blush peonies.",
        basePrice: 90,
        stock: 80,
        featured: false,
        images: {
            default: IMAGES.oil2,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bp-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 90 }],
        scents: ["Peony", "Rose", "Honey"]
    },
    {
        id: "p-midnight-lavender-oil",
        title: "Midnight Lavender Oil",
        slug: "midnight-lavender-oil",
        category: "Essential Oils",
        shortDescription: "Relaxing lavender oil.",
        longDescription: "Pure lavender oil for relaxation and sleep.",
        basePrice: 80,
        stock: 120,
        featured: false,
        images: {
            default: IMAGES.oil15,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-ml-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 80 }],
        scents: ["Lavender"]
    },

    // --- ESSENTIAL OILS - Woody and Suede Collection ---
    {
        id: "p-tobacco-noir-oil",
        title: "Tobacco Noir Oil",
        slug: "tobacco-noir-oil",
        category: "Essential Oils",
        shortDescription: "Rich tobacco oil.",
        longDescription: "Warm and spicy tobacco leaf essential oil blend.",
        basePrice: 95,
        stock: 70,
        featured: false,
        images: {
            default: IMAGES.oil14,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-tn-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 95 }],
        scents: ["Tobacco", "Spice"]
    },
    {
        id: "p-black-oud-oil",
        title: "Black Oud Oil",
        slug: "black-oud-oil",
        category: "Essential Oils",
        shortDescription: "Potent oud oil.",
        longDescription: "Highly concentrated black oud oil for intense fragrance.",
        basePrice: 110,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.oil13,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bo-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 110 }],
        scents: ["Oud", "Wood"]
    },
    {
        id: "p-wild-fig-oil",
        title: "Wild Fig Oil",
        slug: "wild-fig-oil",
        category: "Essential Oils",
        shortDescription: "Green fig oil.",
        longDescription: "Fresh and green wild fig essential oil.",
        basePrice: 90,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.oil12,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-wf-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 90 }],
        scents: ["Fig", "Green Leaf"]
    },

    // --- ESSENTIAL OILS - Oriental Luxe Collection ---
    {
        id: "p-lovers-rock-oil",
        title: "Lovers Rock Oil",
        slug: "lovers-rock-oil",
        category: "Essential Oils",
        shortDescription: "Romantic blend.",
        longDescription: "A passionate blend of essential oils for a romantic atmosphere.",
        basePrice: 100,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.oil11,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-lr-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Rose", "Sandalwood", "Ylang Ylang"]
    },
    {
        id: "p-pomegranate-oil",
        title: "Pomegranate Oil",
        slug: "pomegranate-oil",
        category: "Essential Oils",
        shortDescription: "Fruity oil blend.",
        longDescription: "Sweet and tart pomegranate oil concentrate.",
        basePrice: 95,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.oil10,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-pom-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 95 }],
        scents: ["Pomegranate"]
    },

    // --- ESSENTIAL OILS - Gourmand Indulgence Collection ---
    {
        id: "p-champagne-cocktail-oil",
        title: "Champagne Cocktail Oil",
        slug: "champagne-cocktail-oil",
        category: "Essential Oils",
        shortDescription: "Sparkling citrus oil.",
        longDescription: "Effervescent champagne and citrus essential oil blend.",
        basePrice: 105,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.oil20,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-cc-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 105 }],
        scents: ["Champagne", "Grapefruit"]
    },
    {
        id: "p-sugar-vanilla-oil",
        title: "Sugar Vanilla Oil",
        slug: "sugar-vanilla-oil",
        category: "Essential Oils",
        shortDescription: "Sweet vanilla oil.",
        longDescription: "Pure vanilla essential oil with a sugary twist.",
        basePrice: 85,
        stock: 100,
        featured: false,
        images: {
            default: IMAGES.oil23,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sv-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 85 }],
        scents: ["Vanilla"]
    },
    {
        id: "p-peach-bellini-oil",
        title: "Peach Bellini Oil",
        slug: "peach-bellini-oil",
        category: "Essential Oils",
        shortDescription: "Juicy peach oil.",
        longDescription: "Fresh peach essential oil blend with prosecco notes.",
        basePrice: 90,
        stock: 75,
        featured: false,
        images: {
            default: IMAGES.oil5,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-pb-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 90 }],
        scents: ["Peach"]
    },

    // --- ESSENTIAL OILS - Fresh Whisper Collection ---
    {
        id: "p-sage-sea-salt-oil",
        title: "Sage & Sea Salt Oil",
        slug: "sage-sea-salt-oil",
        category: "Essential Oils",
        shortDescription: "Sea breeze oil.",
        longDescription: "Refreshing sage and sea salt essential oil blend.",
        basePrice: 90,
        stock: 80,
        featured: false,
        images: {
            default: IMAGES.oil4,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sss-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 90 }],
        scents: ["Sage", "Sea Salt"]
    },
    {
        id: "p-white-tea-oil",
        title: "White Tea Oil",
        slug: "white-tea-oil",
        category: "Essential Oils",
        shortDescription: "Delicate tea oil.",
        longDescription: "Soothing white tea essential oil with clean notes.",
        basePrice: 85,
        stock: 90,
        featured: false,
        images: {
            default: IMAGES.oil18,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-wt-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 85 }],
        scents: ["White Tea"]
    },
    {
        id: "p-sweet-bergamot-oil",
        title: "Sweet Bergamot Oil",
        slug: "sweet-bergamot-oil",
        category: "Essential Oils",
        shortDescription: "Citrus bergamot oil.",
        longDescription: "Uplifting sweet bergamot essential oil.",
        basePrice: 85,
        stock: 90,
        featured: false,
        images: {
            default: IMAGES.oil16,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sb-o", label: "Standard", sizeMl: "15ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 85 }],
        scents: ["Bergamot", "Citrus"]
    },

    // --- Essential Oils ---
    {
        id: "p-essential-oils",
        title: "Essential Oils (Concentrate)",
        slug: "essential-oils-concentrate",
        category: "Essential Oils",
        shortDescription: "Pure concentrated fragrance oils.",
        longDescription: "High-concentration essential oils perfect for diffusers and burners.",
        basePrice: 100,
        stock: 100,
        featured: false,
        images: {
            default: IMAGES.amberspray,
            gallery: [IMAGES.new3, IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [
            { id: "v-eo-std", label: "Standard", sizeMl: "", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }
        ],
        scents: [
            "Sweet Flowers", "Cocktail Toast", "Strawberry Muse", "Lovers Rock",
            "Citronella", "Oud", "Vanilla", "Melon Magnet", "Tropical Spice",
            "Orange", "Peach"
        ]
    },

    // --- Scented Candles ---
    {
        id: "p-scented-candles",
        title: "Scented Candles",
        slug: "scented-candles",
        category: "Candle",
        shortDescription: "Hand-poured luxury candles.",
        longDescription: "Create a warm glow and inviting scent with our premium hand-poured candles.",
        basePrice: 100,
        stock: 80,
        featured: true,
        images: {
            default: IMAGES.scentedcandle,
            gallery: [IMAGES.darkcandle, IMAGES.amberspray, IMAGES.candle, IMAGES.new3, IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [
            { id: "v-candle-med", label: "Medium", sizeMl: "", sizeLabel: "Medium", multiplier: 1, priceGHS: 100 },
            { id: "v-candle-lrg", label: "Large", sizeMl: "", sizeLabel: "Large", multiplier: 1.5, priceGHS: 150 }
        ],
        scents: [
            "Amber", "Lemon & Lime", "Orange", "Butterscotch", "Vanilla", "Scandalwood",
            "Citronella", "Champagne Cocktail", "Oud", "Marshmallow Cheesecake",
            "Cinnamon Latte", "Coffee Vanilla", "Hot Chocolate", "Cinnamon Peony",
            "Bubble Gum", "Into You", "Hawaii Sunset", "Peach", "Pumpkin Spice"
        ]
    },

    // --- Air Fresheners ---
    {
        id: "p-air-fresheners",
        title: "Air Fresheners",
        slug: "air-fresheners",
        category: "Air Fresheners",
        shortDescription: "Designer inspired room sprays.",
        longDescription: "Luxurious sprays to refresh any room instantly with designer-inspired scents.",
        basePrice: 200,
        stock: 60,
        featured: true,
        images: {
            default: IMAGES.spray,
            gallery: [IMAGES.amberspray, IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [
            { id: "v-af-std", label: "Standard", sizeMl: "", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }
        ],
        scents: [
            "Gucci Bloom", "Burberry", "English Pear & Freesia", "Sweet Flowers", "Amber Ebony"
        ]
    },

    // --- Gift Sets ---
    {
        id: "p-box-gift-set",
        title: "Box Gift Set",
        slug: "box-gift-set",
        category: "Bundle",
        shortDescription: "Premium curated gift box.",
        longDescription: "The perfect gift for any occasion, featuring our finest scents.",
        basePrice: 500,
        stock: 20,
        featured: true,
        images: {
            default: IMAGES.allprod1,
            gallery: [IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [
            { id: "v-gift-box", label: "Box Set", sizeMl: "", sizeLabel: "Standard", multiplier: 1, priceGHS: 500 }
        ],
        scents: ["Creed Aventus", "Rose & Oud", "Sweet Flowers"]
    },
    {
        id: "p-gift-box-candles",
        title: "Gift Box Candles",
        slug: "gift-box-candles",
        category: "Bundle",
        shortDescription: "Curated candle collection.",
        longDescription: "A selection of our finest candles in a beautiful gift box.",
        basePrice: 200,
        stock: 25,
        featured: true,
        images: {
            default: IMAGES.candle2,
            gallery: [IMAGES.new4, IMAGES.new3, IMAGES.new5],
            colorVariants: []
        },
        variants: [
            { id: "v-gift-candle", label: "Candle Set", sizeMl: "", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }
        ],
        scents: [
            "Wood Sage & Sea Salt", "Tuberose & Angel Grass", "Blackberry & Bay",
            "Peony & Blush Suede", "Amber & Moss", "Volupsa French Cade Lavendar"
        ]
    },

    // --- Remaining items from original list (that don't conflict) ---
    // Keeping only unique categories/items not covered above to maintain variety but cleaned up
    {
        id: "p15",
        title: "Scented Sachets",
        slug: "scented-sachets",
        category: "Potpourri",
        shortDescription: "For drawers and closets.",
        longDescription: "Keep your linens and clothes smelling fresh with these long-lasting scented sachets.",
        basePrice: 25,
        stock: 200,
        featured: false,
        images: {
            default: IMAGES.artifact7,
            gallery: [],
            colorVariants: []
        },
        variants: [
            { id: "v15-3pk", label: "3-Pack", sizeMl: "", sizeLabel: "Classic", multiplier: 1, priceGHS: 25 }
        ],
        scents: ["Lavender", "Rose", "Cedar"]
    },
    {
        id: "p12",
        title: "Electric Diffuser",
        slug: "electric-diffuser",
        category: "Oil Burner",
        shortDescription: "Ultrasonic mist diffuser.",
        longDescription: "Humidify and scent your air with ultrasonic technology.",
        basePrice: 250,
        stock: 20,
        featured: false,
        images: {
            default: IMAGES.artifact5,
            gallery: [],
            colorVariants: []
        },
        variants: [
            { id: "v12-std", label: "Standard", sizeMl: "300ml Tank", sizeLabel: "Classic", multiplier: 1, priceGHS: 250 }
        ],
        scents: []
    },
    {
        id: "p4",
        title: "Ceramic Oil Burner",
        slug: "ceramic-oil-burner",
        category: "Oil Burner",
        shortDescription: "Minimalist ceramic burner for essential oils.",
        longDescription: "Add a touch of elegance to any room with this handmade ceramic oil burner.",
        materials: "Ceramic",
        basePrice: 90,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.artifact1,
            gallery: [IMAGES.artifact2],
            colorVariants: [
                { colorId: "c-black", label: "Black", image: IMAGES.artifact1 },
                { colorId: "c-white", label: "White", image: IMAGES.artifact1 }
            ]
        },
        variants: [
            { id: "v4-std", label: "Standard", sizeMl: "", sizeLabel: "Classic", multiplier: 1, priceGHS: 90 }
        ],
        scents: []
    },
    // --- NEW COLLECTION: Floral Romance ---
    {
        id: "p-freesia-english-pear",
        title: "Freesia and English Pear",
        slug: "freesia-english-pear",
        category: "Floral Romance",
        shortDescription: "Orchard freshness.",
        longDescription: "The sensuous freshness of just-ripe pears is wrapped in a bouquet of white freesias, and mellowed by amber, patchouli and woods.",
        basePrice: 120,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.w_ref1,
            gallery: [candle1Hover],
            colorVariants: []
        },
        variants: [{ id: "v-freesia", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: ["King William Pear", "Freesia", "Patchouli"]
    },
    {
        id: "p-blush-peony",
        title: "Blush Peony",
        slug: "blush-peony",
        category: "Floral Romance",
        shortDescription: "Flirtatious floral.",
        longDescription: "Peonies in voluptuous bloom, exquisitely fragile. Flirting with the juicy bite of red apple and the opulence of jasmine, rose and gillyflower.",
        basePrice: 120,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.w_ref2,
            gallery: [candle7Hover],
            colorVariants: []
        },
        variants: [{ id: "v-blush", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: ["Red Apple", "Peony", "Suede"]
    },
    {
        id: "p-royal-rose-bloom",
        title: "Royal Rose Bloom",
        slug: "royal-rose-bloom",
        category: "Floral Romance",
        shortDescription: "A regal bouquet of red and pink roses.",
        longDescription: "Experience the romance of a blooming royal garden with notes of velvet red roses and soft peony.",
        basePrice: 120,
        stock: 50,
        featured: true,
        images: {
            default: IMAGES.w_ref3,
            gallery: [candle8Hover],
            colorVariants: []
        },
        variants: [{ id: "v-royal", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: ["Red Rose", "Peony", "Musk"]
    },
    {
        id: "p-midnight-lavender",
        title: "Midnight Lavender",
        slug: "midnight-lavender",
        category: "Floral Romance",
        shortDescription: "Midnight lavender fields.",
        longDescription: "A calming, deep lavender scent inspired by moonlit fields in Provence.",
        basePrice: 130,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.w_ref4,
            gallery: [candle2Hover],
            colorVariants: []
        },
        variants: [{ id: "v-lavande", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["Lavender", "Moonflower", "Amber"]
    },
    {
        id: "p-jasmin",
        title: "Jasmin",
        slug: "jasmin",
        category: "Floral Romance",
        shortDescription: "Pure classic jasmine.",
        longDescription: "The intoxicating, sweet scent of freshly picked jasmine flowers.",
        basePrice: 115,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.c6,
            gallery: [candle3Hover],
            colorVariants: []
        },
        variants: [{ id: "v-jasmine", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 115 }],
        scents: ["Jasmine", "Green Leaf"]
    },
    {
        id: "p-golden-ylang",
        title: "Golden Ylang",
        slug: "golden-ylang",
        category: "Floral Romance",
        shortDescription: "Exotic floral blend.",
        longDescription: "A unique blend of golden exotic flowers and warm spices.",
        basePrice: 140,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.c7,
            gallery: [candle4Hover],
            colorVariants: []
        },
        variants: [{ id: "v-golden", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 140 }],
        scents: ["Ylang Ylang", "Saffron", "Vanilla"]
    },
    {
        id: "p-lotus-veil",
        title: "Lotus Veil",
        slug: "lotus-veil",
        category: "Floral Romance",
        shortDescription: "Delicate aquatic floral.",
        longDescription: "A light, spiritual scent of white lotus sitting on calm waters.",
        basePrice: 125,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.c8,
            gallery: [candle5Hover],
            colorVariants: []
        },
        variants: [{ id: "v-lotus", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["White Lotus", "Water Lily", "Bamboo"]
    },
    {
        id: "p-amour-d-osmanthus",
        title: "Amour d'Osmanthus",
        slug: "amour-d-osmanthus",
        category: "Floral Romance",
        shortDescription: "Rare orchid elegance.",
        longDescription: "Sophisticated and rare, capturing the elusive scent of the black orchid.",
        basePrice: 150,
        stock: 20,
        featured: true,
        images: {
            default: IMAGES.w_ref4,
            gallery: [candle6Hover],
            colorVariants: []
        },
        variants: [{ id: "v-amour", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 150 }],
        scents: ["Black Orchid", "Dark Chocolate", "Patchouli"]
    },

    // --- NEW COLLECTION: Woody and Suede ---
    {
        id: "p-velvet-rose-oud",
        title: "Velvet Rose & Oud",
        slug: "velvet-rose-oud",
        category: "Woody and Suede",
        shortDescription: "Darkest Damask Rose wrapped in smoky Oud.",
        longDescription: "Rich and textural, wrapped with smoky oud wood. Spiked with clove, decadent with praline.",
        basePrice: 145,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [wood1Hover],
            colorVariants: []
        },
        variants: [{ id: "v-velvet", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 145 }],
        scents: ["Damask Rose", "Oud", "Clove"]
    },
    {
        id: "p-black-oud",
        title: "Black Oud",
        slug: "black-oud",
        category: "Woody and Suede",
        shortDescription: "Intense and mysterious.",
        longDescription: "A deep, resinous scent of black oud wood, leather, and black pepper.",
        basePrice: 160,
        stock: 15,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [wood2Hover],
            colorVariants: []
        },
        variants: [{ id: "v-black", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 160 }],
        scents: ["Oud", "Leather", "Black Pepper"]
    },
    {
        id: "p-wild-fig",
        title: "Wild Fig",
        slug: "wild-fig",
        category: "Woody and Suede",
        shortDescription: "Sun-drenched figs and woods.",
        longDescription: "Plump, sun-warmed figs blended with cassis and cedarwood.",
        basePrice: 125,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.c6,
            gallery: [wood3Hover],
            colorVariants: []
        },
        variants: [{ id: "v-fig", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Fig", "Cassis", "Cedarwood"]
    },
    {
        id: "p-sandalwood",
        title: "Sandalwood",
        slug: "sandalwood",
        category: "Woody and Suede",
        shortDescription: "Creamy, smooth wood.",
        longDescription: "The classic, creamy scent of Mysore sandalwood with a touch of spice.",
        basePrice: 135,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.c6,
            gallery: [wood4Hover],
            colorVariants: []
        },
        variants: [{ id: "v-sandal", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 135 }],
        scents: ["Sandalwood", "Cedar", "Vanilla"]
    },

    // --- NEW COLLECTION: Oriental Luxe ---
    {
        id: "p-tobacco-noir",
        title: "Tobacco Noir",
        slug: "tobacco-noir",
        category: "Oriental Luxe",
        shortDescription: "Opulent tobacco and spice.",
        longDescription: "Rich tobacco leaf spices with vanilla and cacao.",
        basePrice: 155,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.c7,
            gallery: [oriental1Hover],
            colorVariants: []
        },
        variants: [{ id: "v-tobacco", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 155 }],
        scents: ["Tobacco Leaf", "Vanilla", "Cacao"]
    },
    {
        id: "p-amber-luxe",
        title: "Amber Luxe",
        slug: "amber-luxe",
        category: "Oriental Luxe",
        shortDescription: "Warm, glowing amber.",
        longDescription: "A golden, warm blend of amber, patchouli, and sandalwood.",
        basePrice: 140,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.c8,
            gallery: [oriental2Hover],
            colorVariants: []
        },
        variants: [{ id: "v-amber", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 140 }],
        scents: ["Amber", "Patchouli", "Sandalwood"]
    },
    {
        id: "p-cedar-caress",
        title: "Cedar Caress",
        slug: "cedar-caress",
        category: "Oriental Luxe",
        shortDescription: "Majestic cedarwood.",
        longDescription: "The sharp, clean scent of cedarwood carved into elegance.",
        basePrice: 130,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.c8,
            gallery: [oriental3Hover],
            colorVariants: []
        },
        variants: [{ id: "v-cedar", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["Cedarwood", "Juniper", "Moss"]
    },
    {
        id: "p-myrrh-tonka",
        title: "Myrrh & Tonka",
        slug: "myrrh-tonka",
        category: "Oriental Luxe",
        shortDescription: "Namibian myrrh and tonka.",
        longDescription: "Rich, hand-harvested sap of the Namibian myrrh tree, mingling with warm almond and lush vanilla notes of tonka bean.",
        basePrice: 165,
        stock: 20,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [oriental4Hover],
            colorVariants: []
        },
        variants: [{ id: "v-myrrh", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 165 }],
        scents: ["Lavender", "Omumbiri Myrrh", "Tonka Bean"]
    },
    {
        id: "p-pomegranate-noir",
        title: "Pomegranate Noir",
        slug: "pomegranate-noir",
        category: "Oriental Luxe",
        shortDescription: "Dark and enigmatic fruits.",
        longDescription: "Ruby-rich juices of pomegranate, raspberry and plum are spiked with pink pepper and laced with Casablanca lily and spicy woods.",
        basePrice: 145,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.c6,
            gallery: [oriental5Hover],
            colorVariants: []
        },
        variants: [{ id: "v-pom", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 145 }],
        scents: ["Pomegranate", "Casablanca Lily", "Guaiacwood"]
    },
    {
        id: "p-lovers-rock",
        title: "Lovers Rock",
        slug: "lovers-rock",
        category: "Oriental Luxe",
        shortDescription: "Passionate and intense.",
        longDescription: "A rush of adrenaline and passion, captured in a bottle.",
        basePrice: 150,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.c7,
            gallery: [oriental6Hover],
            colorVariants: []
        },
        variants: [{ id: "v-lovers", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 150 }],
        scents: ["Red Berries", "Jasmine", "Musk"]
    },
    {
        id: "p-blackberry-bloom",
        title: "Blackberry Bloom",
        slug: "blackberry-bloom",
        category: "Oriental Luxe",
        shortDescription: "Sweet and tart blackberry.",
        longDescription: "A burst of deep, tart blackberry juice, blending with fresh bay and brambly woods.",
        basePrice: 135,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.c8,
            gallery: [oriental7Hover],
            colorVariants: []
        },
        variants: [{ id: "v-blackb", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 135 }],
        scents: ["Blackberry", "Bay Leaves", "Cedarwood"]
    },

    // --- NEW COLLECTION: Gourmand Indulgence ---
    {
        id: "p-creme-de-latte",
        title: "Crème de Latte",
        slug: "creme-de-latte",
        category: "Gourmand Indulgence",
        shortDescription: "Creamy coffee delight.",
        longDescription: "Rich espresso blended with steamed milk and vanilla syrup.",
        basePrice: 125,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [gourmet1Hover],
            colorVariants: []
        },
        variants: [{ id: "v-creme", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Coffee", "Milk", "Vanilla"]
    },
    {
        id: "p-marshmallow-cheesecake",
        title: "Marshmallow Cheesecake",
        slug: "marshmallow-cheesecake",
        category: "Gourmand Indulgence",
        shortDescription: "Sweet dessert bliss.",
        longDescription: "Fluffy marshmallows topping a creamy vanilla cheesecake.",
        basePrice: 135,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.c6,
            gallery: [gourmet2Hover],
            colorVariants: []
        },
        variants: [{ id: "v-marsh", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 135 }],
        scents: ["Marshmallow", "Cream Cheese", "Graham Cracker"]
    },
    {
        id: "p-butterscotch",
        title: "Butterscotch",
        slug: "butterscotch",
        category: "Gourmand Indulgence",
        shortDescription: "Golden buttery sweetness.",
        longDescription: "Rich, gooey butterscotch sauce with a hint of sea salt.",
        basePrice: 120,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.c7,
            gallery: [gourmet3Hover],
            colorVariants: []
        },
        variants: [{ id: "v-butter", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: ["Butterscotch", "Caramel", "Vanilla"]
    },
    {
        id: "p-sugar-vanilla",
        title: "Sugar Vanilla",
        slug: "sugar-vanilla",
        category: "Gourmand Indulgence",
        shortDescription: "Classic sweet warmth.",
        longDescription: "Sparkling sugar crystals over warm Madagascar vanilla beans.",
        basePrice: 115,
        stock: 55,
        featured: false,
        images: {
            default: IMAGES.c8,
            gallery: [gourmet4Hover],
            colorVariants: []
        },
        variants: [{ id: "v-sugar", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 115 }],
        scents: ["Sugar", "Vanilla Bean", "Musk"]
    },
    {
        id: "p-peach-bellini",
        title: "Peach Bellini",
        slug: "peach-bellini",
        category: "Gourmand Indulgence",
        shortDescription: "Fruity sparkling cocktail.",
        longDescription: "Juicy peaches mixed with sparkling prosecco.",
        basePrice: 140,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [gourmet5Hover],
            colorVariants: []
        },
        variants: [{ id: "v-peach", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 140 }],
        scents: ["Peach", "Prosecco", "Orange"]
    },
    {
        id: "p-pina-colada",
        title: "Piña Colada",
        slug: "pina-colada",
        category: "Gourmand Indulgence",
        shortDescription: "Tropical coconut treat.",
        longDescription: "Fresh pineapple juice blended with creamy coconut milk.",
        basePrice: 130,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.c6,
            gallery: [gourmet6Hover],
            colorVariants: []
        },
        variants: [{ id: "v-pina", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["Pineapple", "Coconut", "Rum"]
    },
    {
        id: "p-champagne-cocktail",
        title: "Champagne Cocktail",
        slug: "champagne-cocktail",
        category: "Gourmand Indulgence",
        shortDescription: "Celebratory fizzy scent.",
        longDescription: "Crisp champagne notes with a twist of citrus zest.",
        basePrice: 150,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.c7,
            gallery: [gourmet7Hover],
            colorVariants: []
        },
        variants: [{ id: "v-champagne", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 150 }],
        scents: ["Champagne", "Citrus", "Grape"]
    },

    // --- NEW COLLECTION: Fresh Whisper ---
    {
        id: "p-sage-sea-salt",
        title: "Sage & Sea Salt",
        slug: "sage-sea-salt",
        category: "Fresh Whisper",
        shortDescription: "Coastal breeze.",
        longDescription: "The mineral scent of the rugged cliffs not far from the ocean.",
        basePrice: 135,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.c14,
            gallery: [fresh1Hover],
            colorVariants: []
        },
        variants: [{ id: "v-sage", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 135 }],
        scents: ["Ambrette Seeds", "Sea Salt", "Sage"]
    },
    {
        id: "p-peppermint",
        title: "Peppermint",
        slug: "peppermint",
        category: "Fresh Whisper",
        shortDescription: "Cool and invigorating.",
        longDescription: "Sharp, cool peppermint to refresh your senses.",
        basePrice: 110,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.c15,
            gallery: [fresh2Hover],
            colorVariants: []
        },
        variants: [{ id: "v-pepper", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 110 }],
        scents: ["Peppermint", "Eucalyptus", "Snow"]
    },
    {
        id: "p-lemongrass",
        title: "Lemongrass",
        slug: "lemongrass",
        category: "Fresh Whisper",
        shortDescription: "Zesty citrus glow.",
        longDescription: "Bright lemongrass with a touch of ginger and lime.",
        basePrice: 125,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.c16,
            gallery: [fresh3Hover],
            colorVariants: []
        },
        variants: [{ id: "v-lemon", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Lemongrass", "Ginger", "Lime"]
    },
    {
        id: "p-white-tea",
        title: "White Tea",
        slug: "white-tea",
        category: "Fresh Whisper",
        shortDescription: "Pure spa tranquility.",
        longDescription: "Clean white tea leaves with a hint of jasmine and cedar.",
        basePrice: 130,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.c17,
            gallery: [fresh4Hover],
            colorVariants: []
        },
        variants: [{ id: "v-white", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["White Tea", "Jasmine", "Cedar"]
    },
    {
        id: "p-lemon-lime",
        title: "Lemon and Lime",
        slug: "lemon-lime",
        category: "Fresh Whisper",
        shortDescription: "Sharp citrus duo.",
        longDescription: "A punchy combination of sour lemon and zesty lime.",
        basePrice: 115,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.c18,
            gallery: [fresh5Hover],
            colorVariants: []
        },
        variants: [{ id: "v-lime", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 115 }],
        scents: ["Lemon", "Lime", "Bergamot"]
    },
    {
        id: "p-frosted-apple",
        title: "Frosted Apple",
        slug: "frosted-apple",
        category: "Fresh Whisper",
        shortDescription: "Crisp winter fruit.",
        longDescription: "Juicy red apples kissed by winter frost and cinnamon.",
        basePrice: 125,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.c8,
            gallery: [fresh6Hover],
            colorVariants: []
        },
        variants: [{ id: "v-apple", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Apple", "Cinnamon", "Vanilla"]
    },
    {
        id: "p-sweet-bergamot",
        title: "Sweet Bergamot",
        slug: "sweet-bergamot",
        category: "Fresh Whisper",
        shortDescription: "Citrus with floral notes.",
        longDescription: "Sweet, ripe bergamot rounded out with soft floral undertones.",
        basePrice: 140,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.c3,
            gallery: [fresh7Hover],
            colorVariants: []
        },
        variants: [{ id: "v-bergamot", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 140 }],
        scents: ["Bergamot", "Orange Blossom", "Musk"]
    },

    // --- NEW COLLECTION TO INCREASE DISPLAY VOLUME ---
    {
        id: "p-new-1",
        title: "Midnight Jasmine Diffuser",
        slug: "midnight-jasmine-diffuser",
        category: "Reed Diffuser",
        shortDescription: "Intoxicating floral elegance.",
        longDescription: "A deep, romantic Jasmine blend that transforms your evening atmosphere. Limited edition.",
        basePrice: 120,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.new3,
            gallery: [IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-1", label: "Standard", sizeMl: "150ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: ["Jasmine", "Dark Amber"]
    },
    {
        id: "p-new-2",
        title: "Ocean Mist Candle",
        slug: "ocean-mist-candle",
        category: "Candle",
        shortDescription: "Fresh saline breeze.",
        longDescription: "Bring the calming essence of the sea into your home with this clean, crisp scent.",
        basePrice: 110,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.new4,
            gallery: [IMAGES.new5, IMAGES.new5],
            colorVariants: []
        },
        variants: [{ id: "v-new-2", label: "Medium", sizeMl: "200g", sizeLabel: "Medium", multiplier: 1, priceGHS: 110 }],
        scents: ["Sea Salt", "Driftwood"]
    },
    {
        id: "p-new-3",
        title: "Lavender Dreams Oil",
        slug: "lavender-dreams-oil",
        category: "Essential Oils",
        shortDescription: "Pure relaxation concentrate.",
        longDescription: "High-grade lavender essential oil for deep sleep and relaxation.",
        basePrice: 85,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.new4,
            gallery: [IMAGES.new5, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-3", label: "10ml", sizeMl: "10ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 85 }],
        scents: ["Lavender", "Chamomile"]
    },
    {
        id: "p-new-4",
        title: "Golden Hour Spray",
        slug: "golden-hour-spray",
        category: "Air Fresheners",
        shortDescription: "Citrus sunset blend.",
        longDescription: "A vibrant burst of citrus and spices to energize your room.",
        basePrice: 180,
        stock: 30,
        featured: false,
        images: {
            default: '/images/products/air-fresheners/air-freshener-main.png',
            gallery: [IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-4", label: "Standard", sizeMl: "300ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 180 }],
        scents: ["Orange", "Ginger", "Turmeric"]
    },
    {
        id: "p-new-5",
        title: "Velvet Rose Candle",
        slug: "velvet-rose-candle",
        category: "Candle",
        shortDescription: "Rich and blooming.",
        longDescription: "A luxurious rose scent with velvety undertones of oud and praline.",
        basePrice: 130,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.new3,
            gallery: [IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-5", label: "Large", sizeMl: "300g", sizeLabel: "Large", multiplier: 1, priceGHS: 130 }],
        scents: ["Rose", "Oud", "Praline"]
    },
    {
        id: "p-new-6",
        title: "Nordic Pine Diffuser",
        slug: "nordic-pine-diffuser",
        category: "Reed Diffuser",
        shortDescription: "Crisp winter forest.",
        longDescription: "Fill your home with the scent of fresh pine needles and cool mountain air.",
        basePrice: 160,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.new3,
            gallery: [IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-6", label: "Standard", sizeMl: "150ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 160 }],
        scents: ["Pine", "Eucalyptus", "Cedarwood"]
    },
    {
        id: "p-new-7",
        title: "Vanilla Bean Luxe",
        slug: "vanilla-bean-luxe-candle",
        category: "Candle",
        shortDescription: "Warm comforting sweetness.",
        longDescription: "Authentic Madagascar vanilla bean scent for a cozy, inviting home.",
        basePrice: 115,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.new3,
            gallery: [IMAGES.new4, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-7", label: "Medium", sizeMl: "200g", sizeLabel: "Medium", multiplier: 1, priceGHS: 115 }],
        scents: ["Vanilla", "Cream"]
    },
    {
        id: "p-new-8",
        title: "Spiced Amber Joy",
        slug: "spiced-amber-joy",
        category: "Bundle",
        shortDescription: "Warmth in a box.",
        longDescription: "A curated set featuring our best amber-based scents.",
        basePrice: 280,
        stock: 15,
        featured: false,
        images: {
            default: IMAGES.new5,
            gallery: [IMAGES.new4, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-8", label: "Set", sizeMl: "", sizeLabel: "Standard", multiplier: 1, priceGHS: 280 }],
        scents: ["Amber", "Cinnamon", "Cardamom"]
    },
    {
        id: "p-new-9",
        title: "Citrus Basil Kitchen",
        slug: "citrus-basil-kitchen",
        category: "Reed Diffuser",
        shortDescription: "Clean and herbal.",
        longDescription: "Perfect for kitchens, this scent neutralizes odors with zest and herbs.",
        basePrice: 125,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.new5,
            gallery: [IMAGES.new3, IMAGES.new3],
            colorVariants: []
        },
        variants: [{ id: "v-new-9", label: "Standard", sizeMl: "150ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Lemon", "Basil", "Thyme"]
    },

    // --- NEW COLLECTION: Bath & Body ---
    {
        id: "p-body-wash-luxe",
        title: "Luxury Body Wash",
        slug: "luxury-body-wash",
        category: "Bath & Body",
        shortDescription: "Gentle cleansing gel.",
        longDescription: "A rich, foaming body wash that gently cleanses and scents the skin.",
        basePrice: 95,
        stock: 50,
        featured: false,
        images: {
            default: '/images/products/bath-body/body-main.png',
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bw-std", label: "Standard", sizeMl: "250ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 95 }],
        scents: ["Rose", "Oud"]
    },
    {
        id: "p-body-lotion-silk",
        title: "Silk Body Lotion",
        slug: "silk-body-lotion",
        category: "Bath & Body",
        shortDescription: "Hydrating smooth lotion.",
        longDescription: "Lightweight yet deeply hydrating body lotion for silky smooth skin.",
        basePrice: 110,
        stock: 40,
        featured: false,
        images: {
            default: '/images/products/bath-body/body-main.png',
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bl-std", label: "Standard", sizeMl: "250ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 110 }],
        scents: ["Vanilla", "Cocoa Butter"]
    },
    {
        id: "p-bath-soak",
        title: "Relaxing Bath Soak",
        slug: "relaxing-bath-soak",
        category: "Bath & Body",
        shortDescription: "Calming bath salts.",
        longDescription: "Mineral-rich bath salts infused with essential oils for a relaxing soak.",
        basePrice: 85,
        stock: 60,
        featured: false,
        images: {
            default: '/images/products/bath-body/body-main.png',
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bs-std", label: "Standard", sizeMl: "500g", sizeLabel: "Standard", multiplier: 1, priceGHS: 85 }],
        scents: ["Lavender", "Eucalyptus"]
    }
];
