import { IMAGES } from '@/assets';
import { Product } from '@/types';


import candle2Hover from '../assets/collections/candles/2.2.png';
import candle3Hover from '../assets/collections/candles/3.3.png';
import candle5Hover from '../assets/collections/candles/5.5.png';
import candle6Hover from '../assets/collections/candles/6.6.png';
import wood1Hover from '../assets/collections/candles/wood/w11.png';
import wood2Hover from '../assets/collections/candles/wood/w22.png';
import wood3Hover from '../assets/collections/candles/wood/w33.png';
import wood4Hover from '../assets/collections/candles/wood/w44.png';


import oriental1Hover from '../assets/collections/candles/oriental/o11.png';
import oriental2Hover from '../assets/collections/candles/oriental/o22.png';
import oriental3Hover from '../assets/collections/candles/oriental/o33.png';
import oriental4Hover from '../assets/collections/candles/oriental/o44.png';
import oriental5Hover from '../assets/collections/candles/oriental/o55.png';
import oriental7Hover from '../assets/collections/candles/oriental/o77.png';

import gourmet1Hover from '../assets/collections/candles/gourmet/g11.png';
import gourmet2Hover from '../assets/collections/candles/gourmet/g22.png';
import gourmet3Hover from '../assets/collections/candles/gourmet/g33.png';
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

import scentedCandle from '../assets/collections/candles/Candlesss/ChatGPT Image Feb 17, 2026, 08_35_17 PM.png'


export const products: Product[] = [
    // --- Reed Diffusers (Split by Price Tier) ---

    // --- REED DIFFUSERS - Replacement ---
    {
        id: "p-sage-sea-salt-diffuser",
        title: "Sage & Sea Salt Diffuser",
        slug: "sage-sea-salt-diffuser",
        category: "Fresh Whisper",
        shortDescription: "Coastal breeze.",
        longDescription: "The mineral scent of the rugged cliffs not far from the ocean.",
        basePrice: 200,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.collectionFresh,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sss-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Sage", "Sea Salt", "Ambrette"]
    },
    {
        id: "p-lemongrass-diffuser",
        title: "Lemongrass Diffuser",
        slug: "lemongrass-diffuser",
        category: "Fresh Whisper",
        shortDescription: "Zesty and uplifting.",
        longDescription: "Bright lemongrass with a touch of ginger and lime.",
        basePrice: 200,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.collectionFresh,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-lg-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Lemongrass", "Ginger", "Lime"]
    },

    {
        id: "p-pomegranate-diffuser",
        title: "Pomegranate Diffuser",
        slug: "pomegranate-diffuser",
        category: "Oriental Luxe",
        shortDescription: "Dark enigmatic fruit.",
        longDescription: "Ruby-rich juices of pomegranate, raspberry and plum spiked with pink pepper.",
        basePrice: 200,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-pom-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
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
        basePrice: 200,
        stock: 25,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-cc-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Champagne", "Citrus", "Grape"]
    },
    {
        id: "p-sugar-vanilla-diffuser",
        title: "Sugar Vanilla Diffuser",
        slug: "sugar-vanilla-diffuser",
        category: "Gourmet Indulgence",
        shortDescription: "Sweet vanilla warmth.",
        longDescription: "Sparkling sugar crystals over warm Madagascar vanilla beans.",
        basePrice: 200,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-sv-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Vanilla", "Sugar", "Musk"]
    },
    {
        id: "p-peach-bellini-diffuser",
        title: "Peach Bellini Diffuser",
        slug: "peach-bellini-diffuser",
        category: "Gourmet Indulgence",
        shortDescription: "Fruity sparkling cocktail.",
        longDescription: "Juicy peaches mixed with sparkling prosecco.",
        basePrice: 200,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.collectionOriental,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-pb-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Peach", "Prosecco", "Orange"]
    },

    {
        id: "p-freesia-english-pear-diffuser",
        title: "Freesia & English Pear Diffuser",
        slug: "freesia-english-pear-diffuser",
        category: "Floral Romance",
        shortDescription: "Delicate freesia and ripe pear.",
        longDescription: "The sensuous freshness of just-ripe pears is wrapped in a bouquet of white freesias.",
        basePrice: 200,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.collectionFloral,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-fep-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Freesia", "Pear", "Patchouli"]
    },
    {
        id: "p-amour-d-osmanthus-diffuser",
        title: "Amour D'Osmanthus Diffuser",
        slug: "amour-d-osmanthus-diffuser",
        category: "Floral Romance",
        shortDescription: "Sweet apricot-like floral.",
        longDescription: "A loving bouquet of sweet osmanthus flowers with fruity undertones.",
        basePrice: 200,
        stock: 45,
        featured: false,
        images: {
            default: IMAGES.collectionFloral,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-ado-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Osmanthus", "Benzoin", "Orange"]
    },
    {
        id: "p-midnight-lavender-diffuser",
        title: "Midnight Lavender Diffuser",
        slug: "midnight-lavender-diffuser",
        category: "Floral Romance",
        shortDescription: "Calming night-blooming lavender.",
        longDescription: "A soothing blend of lavender, musk, and tonka bean for a restful atmosphere.",
        basePrice: 200,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.collectionFloral,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-ml-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Lavender", "Musk", "Tonka Bean"]
    },


    // --- REED DIFFUSERS - Woody and Suede Collection ---
    {
        id: "p-tobacco-noir-diffuser",
        title: "Tobacco Noir Diffuser",
        slug: "tobacco-noir-diffuser",
        category: "Woody & Exotic",
        shortDescription: "Smoky and sweet tobacco.",
        longDescription: "Rich tobacco leaf spices with vanilla and cacao for a sophisticated aroma.",
        basePrice: 200,
        stock: 35,
        featured: false,
        images: {
            default: IMAGES.collectionWoody,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-tn-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Tobacco", "Vanilla", "Wood"]
    },
    {
        id: "p-black-oud-diffuser",
        title: "Black Oud Diffuser",
        slug: "black-oud-diffuser",
        category: "Woody & Exotic",
        shortDescription: "Intense black oud.",
        longDescription: "A deep, resinous scent of black oud wood, leather, and black pepper.",
        basePrice: 200,
        stock: 30,
        featured: false,
        images: {
            default: IMAGES.collectionWoody,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-bo-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Oud", "Leather", "Pepper"]
    },
    {
        id: "p-wild-fig-diffuser",
        title: "Wild Fig Diffuser",
        slug: "wild-fig-diffuser",
        category: "Woody & Exotic",
        shortDescription: "Warm figs and cedar.",
        longDescription: "Plump, sun-warmed figs blended with cassis and cedarwood.",
        basePrice: 200,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.collectionWoody,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-wf-d", label: "Standard", sizeMl: "100ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 200 }],
        scents: ["Fig", "Cedarwood", "Cassis"]
    },

    // --- REED DIFFUSERS - Oriental Luxe Collection ---


    // --- REED DIFFUSERS - Fresh Whisper Collection ---


    // --- ESSENTIAL OILS - Floral Romance Collection ---
    {
        id: "p-freesia-english-pear-oil",
        title: "Freesia & English Pear ",
        slug: "freesia-english-pear-oil",
        category: "Essential Oils",
        shortDescription: "Delicate floral concentrate.",
        longDescription: "Pure essential oil blend of freesia and English pear.",
        basePrice: 100,
        stock: 100,
        featured: false,
        images: {
            default: IMAGES.oil1,
            gallery: [IMAGES.oilFreesiaHover],
            colorVariants: []
        },
        variants: [{ id: "v-fep-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Freesia", "Pear"]
    },
    {
        id: "p-blush-peony-oil",
        title: "Blush Peony ",
        slug: "blush-peony-oil",
        category: "Essential Oils",
        shortDescription: "Soft pink floral oil.",
        longDescription: "Concentrated oil of blooming blush peonies.",
        basePrice: 100,
        stock: 80,
        featured: false,
        images: {
            default: IMAGES.oil2,
            gallery: [IMAGES.oilBlushPeonyHover],
            colorVariants: []
        },
        variants: [{ id: "v-bp-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Peony", "Rose", "Honey"]
    },
    {
        id: "p-midnight-lavender-oil",
        title: "Midnight Lavender ",
        slug: "midnight-lavender-oil",
        category: "Essential Oils",
        shortDescription: "Relaxing lavender oil.",
        longDescription: "Pure lavender oil for relaxation and sleep.",
        basePrice: 100,
        stock: 120,
        featured: false,
        images: {
            default: IMAGES.oil15,
            gallery: [IMAGES.oilMidnightLavenderHover],
            colorVariants: []
        },
        variants: [{ id: "v-ml-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Lavender"]
    },

    // --- ESSENTIAL OILS - Woody and Suede Collection ---
    {
        id: "p-tobacco-noir-oil",
        title: "Tobacco Noir  ",
        slug: "tobacco-noir-oil",
        category: "Essential Oils",
        shortDescription: "Rich tobacco oil.",
        longDescription: "Warm and spicy tobacco leaf essential oil blend.",
        basePrice: 100,
        stock: 70,
        featured: false,
        images: {
            default: IMAGES.oil14,
            gallery: [IMAGES.oilTobaccoNoirHover],
            colorVariants: []
        },
        variants: [{ id: "v-tn-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Tobacco", "Spice"]
    },
    {
        id: "p-black-oud-oil",
        title: "Black Oud ",
        slug: "black-oud-oil",
        category: "Essential Oils",
        shortDescription: "Potent oud oil.",
        longDescription: "Highly concentrated black oud oil for intense fragrance.",
        basePrice: 100,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.oil13,
            gallery: [IMAGES.oilBlackOudHover],
            colorVariants: []
        },
        variants: [{ id: "v-bo-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Oud", "Wood"]
    },
    {
        id: "p-wild-fig-oil",
        title: "Wild Fig ",
        slug: "wild-fig-oil",
        category: "Essential Oils",
        shortDescription: "Green fig oil.",
        longDescription: "Fresh and green wild fig essential oil.",
        basePrice: 100,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.oil12,
            gallery: [IMAGES.oilWildFigHover],
            colorVariants: []
        },
        variants: [{ id: "v-wf-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Fig", "Green Leaf"]
    },

    // --- ESSENTIAL OILS - Oriental Luxe Collection ---
    {
        id: "p-lovers-rock-oil",
        title: "Lovers Rock ",
        slug: "lovers-rock-oil",
        category: "Essential Oils",
        shortDescription: "Romantic blend.",
        longDescription: "A passionate blend of essential oils for a romantic atmosphere.",
        basePrice: 100,
        stock: 50,
        featured: false,
        images: {
            default: IMAGES.oil11,
            gallery: [IMAGES.oilLoversRockHover],
            colorVariants: []
        },
        variants: [{ id: "v-lr-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Rose", "Sandalwood", "Ylang Ylang"]
    },
    {
        id: "p-pomegranate-oil",
        title: "Pomegranate ",
        slug: "pomegranate-oil",
        category: "Essential Oils",
        shortDescription: "Fruity oil blend.",
        longDescription: "Sweet and tart pomegranate oil concentrate.",
        basePrice: 100,
        stock: 60,
        featured: false,
        images: {
            default: IMAGES.oil10,
            gallery: [IMAGES.oilPomegranateHover],
            colorVariants: []
        },
        variants: [{ id: "v-pom-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Pomegranate"]
    },

    // --- ESSENTIAL OILS - Gourmand Indulgence Collection ---
    {
        id: "p-champagne-cocktail-oil",
        title: "Champagne Cocktail ",
        slug: "champagne-cocktail-oil",
        category: "Essential Oils",
        shortDescription: "Sparkling citrus oil.",
        longDescription: "Effervescent champagne and citrus essential oil blend.",
        basePrice: 100,
        stock: 40,
        featured: false,
        images: {
            default: IMAGES.oil20,
            gallery: [IMAGES.oilChampagneHover],
            colorVariants: []
        },
        variants: [{ id: "v-cc-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Champagne", "Grapefruit"]
    },
    {
        id: "p-sugar-vanilla-oil",
        title: "Sugar Vanilla ",
        slug: "sugar-vanilla-oil",
        category: "Essential Oils",
        shortDescription: "Sweet vanilla oil.",
        longDescription: "Pure vanilla essential oil with a sugary twist.",
        basePrice: 100,
        stock: 100,
        featured: false,
        images: {
            default: IMAGES.oil23,
            gallery: [IMAGES.oilSugarVanillaHover],
            colorVariants: []
        },
        variants: [{ id: "v-sv-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Vanilla"]
    },
    {
        id: "p-peach-bellini-oil",
        title: "Peach Bellini ",
        slug: "peach-bellini-oil",
        category: "Essential Oils",
        shortDescription: "Juicy peach oil.",
        longDescription: "Fresh peach essential oil blend with prosecco notes.",
        basePrice: 100,
        stock: 75,
        featured: false,
        images: {
            default: IMAGES.oil5,
            gallery: [IMAGES.oilPeachBelliniHover],
            colorVariants: []
        },
        variants: [{ id: "v-pb-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Peach"]
    },

    // --- ESSENTIAL OILS - Fresh Whisper Collection ---
    {
        id: "p-sage-sea-salt-oil",
        title: "Sage & Sea Salt ",
        slug: "sage-sea-salt-oil",
        category: "Essential Oils",
        shortDescription: "Sea breeze oil.",
        longDescription: "Refreshing sage and sea salt essential oil blend.",
        basePrice: 100,
        stock: 80,
        featured: true,
        images: {
            default: IMAGES.oil4,
            gallery: [IMAGES.oilSageHover],
            colorVariants: []
        },
        variants: [{ id: "v-sss-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Sage", "Sea Salt"]
    },
    {
        id: "p-white-tea-oil",
        title: "White Tea ",
        slug: "white-tea-oil",
        category: "Essential Oils",
        shortDescription: "Delicate tea oil.",
        longDescription: "Soothing white tea essential oil with clean notes.",
        basePrice: 100,
        stock: 90,
        featured: false,
        images: {
            default: IMAGES.oil18,
            gallery: [IMAGES.oilWhiteTeaHover],
            colorVariants: []
        },
        variants: [{ id: "v-wt-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["White Tea"]
    },
    {
        id: "p-sweet-bergamot-oil",
        title: "Sweet Bergamot ",
        slug: "sweet-bergamot-oil",
        category: "Essential Oils",
        shortDescription: "Citrus bergamot oil.",
        longDescription: "Uplifting sweet bergamot essential oil.",
        basePrice: 100,
        stock: 90,
        featured: false,
        images: {
            default: IMAGES.oil16,
            gallery: [IMAGES.oilSweetBergamotHover],
            colorVariants: []
        },
        variants: [{ id: "v-sb-o", label: "Standard", sizeMl: "30ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 100 }],
        scents: ["Bergamot", "Citrus"]
    },

    // --- Essential Oils ---




    // --- Air Fresheners ---

    // --- Gift Sets ---



    // --- Remaining items from original list (that don't conflict) ---
    // Keeping only unique categories/items not covered above to maintain variety but cleaned up


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
            gallery: [IMAGES.freesiaPearHover],
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
            gallery: [IMAGES.blushPeonyHover],
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
            gallery: [IMAGES.royalRoseHover],
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
        featured: true,
        images: {
            default: IMAGES.c1,
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
            default: IMAGES.c2,
            gallery: [IMAGES.ylangHover],
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
            default: IMAGES.c4,
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
        featured: false,
        images: {
            default: IMAGES.c5,
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
            default: IMAGES.c6,
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
            default: IMAGES.c7,
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
            default: IMAGES.c8,
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
            default: IMAGES.c9,
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
            default: IMAGES.c10,
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
            default: IMAGES.c11,
            gallery: [oriental3Hover],
            colorVariants: []
        },
        variants: [{ id: "v-cedar", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 130 }],
        scents: ["Cedarwood", "Juniper", "Moss"]
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
            default: IMAGES.c13,
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
            default: IMAGES.c14,
            gallery: [IMAGES.loversRockHover],
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
            default: IMAGES.c15,
            gallery: [oriental7Hover],
            colorVariants: []
        },
        variants: [{ id: "v-blackb", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 135 }],
        scents: ["Blackberry", "Bay Leaves", "Cedarwood"]
    },

    // --- NEW COLLECTION: Gourmand Indulgence ---

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
            default: IMAGES.c17,
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
            default: IMAGES.c18,
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
            default: IMAGES.c1,
            gallery: [IMAGES.sugarVanillaHover],
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
            default: IMAGES.c2,
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
            default: IMAGES.c4,
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
            default: IMAGES.c5,
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
            default: IMAGES.c3,
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
            default: IMAGES.c6,
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
            default: IMAGES.c7,
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
            default: IMAGES.c8,
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
            default: IMAGES.c9,
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
            default: IMAGES.c10,
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
            default: IMAGES.c11,
            gallery: [fresh7Hover],
            colorVariants: []
        },
        variants: [{ id: "v-bergamot", label: "Standard", sizeMl: "200g", sizeLabel: "Standard", multiplier: 1, priceGHS: 140 }],
        scents: ["Bergamot", "Orange Blossom", "Musk"]
    },

    // --- NEW COLLECTION TO INCREASE DISPLAY VOLUME ---


    {
        id: "p-new-4",
        title: "Air Freshener Spray",
        slug: "golden-hour-spray",
        category: "Air Fresheners",
        shortDescription: "Citrus sunset blend.",
        longDescription: "A vibrant burst of citrus and spices to energize your room.",
        basePrice: 180,
        stock: 30,
        featured: true,
        images: {
            default: '/images/products/air-fresheners/air-freshener-main.png',
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-new-4", label: "Standard", sizeMl: "300ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 180 }],
        scents: ["Orange", "Ginger", "Turmeric"]
    },


    // --- NEW COLLECTION: Bath & Body ---
    {
        id: "p-soap-artisan-1",
        title: "Body Wash Gel",
        slug: "artisan-scented-soap-1",
        category: "Bath & Body",
        shortDescription: "Luxury hand-crafted bar soap.",
        longDescription: "Our artisan bar soaps are hand-crafted using traditional methods and infused with our signature fragrances to leave your skin soft and beautifully scented.",
        basePrice: 55,
        stock: 50,
        featured: true,
        images: {
            default: IMAGES.soap1,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-soap-1-std", label: "Single Bar", sizeLabel: "Standard", multiplier: 1, priceGHS: 55 }],
        scents: ["Rose", "Lavender", "Sandalwood"]
    },
    {
        id: "p-soap-artisan-2",
        title: "Hand Wash Gel",
        slug: "artisan-scented-soap-2",
        category: "Bath & Body",
        shortDescription: "Hand-poured luxury cleansing bar.",
        longDescription: "Experience the ultimate in bathing luxury with our hand-poured soaps, designed to moisturize while providing a rich, aromatic lather.",
        basePrice: 55,
        stock: 45,
        featured: true,
        images: {
            default: IMAGES.soap2,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-soap-2-std", label: "Single Bar", sizeLabel: "Standard", multiplier: 1, priceGHS: 55 }],
        scents: ["Pomegranate", "Amber", "Sage"]
    },
    // --- ACCESSORIES ---
    {
        id: "acc-burner-1",
        title: "Ceramic Burner",
        slug: "sweet-home-burner",
        category: "Accessories",
        shortDescription: "Elegant home-shaped ceramic oil burner.",
        longDescription: "A beautiful ceramic burner designed to look like a cozy house, perfect for melting wax or warming oils.",
        basePrice: 120,
        stock: 30,
        featured: true,
        images: {
            default: IMAGES.sweethome,
            gallery: [IMAGES.sweethome],
            colorVariants: []
        },
        variants: [{ id: "v-shb-std", label: "Standard", multiplier: 1, priceGHS: 120 }],
        scents: []
    },



    {
        id: "acc-tissue-1",
        title: "Car Tissue Paper",
        slug: "scented-tissues",
        category: "Accessories",
        shortDescription: "Premium soft tissues with subtle fragrance.",
        longDescription: "Our premium tissues are infused with a delicate signature fragrance for a refreshing experience.",
        basePrice: 45,
        stock: 100,
        featured: false,
        images: {
            default: IMAGES.tissue1,
            gallery: [IMAGES.tissue1],
            colorVariants: []
        },
        variants: [{ id: "v-st-std", label: "Pack of 3", multiplier: 1, priceGHS: 45 }],
        scents: ["Signature Flush"]
    },
    // {
    //     id: "acc-decorative-1",
    //     title: "Artistic Ceramic Piece (Type I)",
    //     slug: "artistic-ceramic-piece-1",
    //     category: "Accessories",
    //     shortDescription: "Handcrafted decorative ceramic sculpture.",
    //     longDescription: "An artistic ceramic piece from our curated artifact collection, designed to be a focal point in any room.",
    //     basePrice: 280,
    //     stock: 15,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact1,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-1", label: "Artist Proof", multiplier: 1, priceGHS: 280 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-2",
    //     title: "Artistic Ceramic Piece (Type II)",
    //     slug: "artistic-ceramic-piece-2",
    //     category: "Accessories",
    //     shortDescription: "Curated stoneware decor piece.",
    //     longDescription: "A sophisticated stoneware piece that adds texture and elegance to your shelving or console.",
    //     basePrice: 260,
    //     stock: 12,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact2,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-2", label: "Standard", multiplier: 1, priceGHS: 260 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-3",
    //     title: "Artistic Ceramic Piece (Type III)",
    //     slug: "artistic-ceramic-piece-3",
    //     category: "Accessories",
    //     shortDescription: "Organic shaped ceramic vessel.",
    //     longDescription: "An organic-inspired ceramic vessel with a matte finish, perfect for minimalist spaces.",
    //     basePrice: 245,
    //     stock: 10,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact3,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-3", label: "Standard", multiplier: 1, priceGHS: 245 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-4",
    //     title: "Artistic Ceramic Piece (Type IV)",
    //     slug: "artistic-ceramic-piece-4",
    //     category: "Accessories",
    //     shortDescription: "Textured ceramic artifact.",
    //     longDescription: "A uniquely textured artifact that challenges traditional forms, handcrafted by local artisans.",
    //     basePrice: 295,
    //     stock: 8,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact4,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-4", label: "Limited Edition", multiplier: 1, priceGHS: 295 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-5",
    //     title: "Artistic Ceramic Piece (Type V)",
    //     slug: "artistic-ceramic-piece-5",
    //     category: "Accessories",
    //     shortDescription: "Modern sculptural element.",
    //     longDescription: "A modern sculptural element that blends form and function, adding a premium feel to your home.",
    //     basePrice: 275,
    //     stock: 14,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact5,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-5", label: "Standard", multiplier: 1, priceGHS: 275 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-6",
    //     title: "Artistic Ceramic Piece (Type VI)",
    //     slug: "artistic-ceramic-piece-6",
    //     category: "Accessories",
    //     shortDescription: "Earthy tones ceramic decor.",
    //     longDescription: "Featuring warm earthy tones, this ceramic piece brings a touch of nature indoors.",
    //     basePrice: 255,
    //     stock: 11,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact6,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-6", label: "Standard", multiplier: 1, priceGHS: 255 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-7",
    //     title: "Artistic Ceramic Piece (Type VII)",
    //     slug: "artistic-ceramic-piece-7",
    //     category: "Accessories",
    //     shortDescription: "Architectural ceramic fragment.",
    //     longDescription: "Inspired by classical architecture, this ceramic fragment serves as a timeless decorative item.",
    //     basePrice: 310,
    //     stock: 7,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact7,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-7", label: "Collector Choice", multiplier: 1, priceGHS: 310 }],
    //     scents: []
    // },
    // {
    //     id: "acc-decorative-8",
    //     title: "Artistic Ceramic Piece (Type VIII)",
    //     slug: "artistic-ceramic-piece-8",
    //     category: "Accessories",
    //     shortDescription: "Abstract ceramic form.",
    //     longDescription: "An abstract ceramic form that explores the play of light and shadow.",
    //     basePrice: 285,
    //     stock: 9,
    //     featured: false,
    //     images: {
    //         default: IMAGES.artifact8,
    //         gallery: [],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-acp-8", label: "Standard", multiplier: 1, priceGHS: 285 }],
    //     scents: []
    // },

    {
        id: "acc-bag-2",
        title: " Travel Essentials Bag ",
        slug: "designer-scent-bag-2",
        category: "Accessories",
        shortDescription: "Luxury fabric bag with clean notes.",
        longDescription: "Perfect for linens, this bag delivers a 'clean laundry' freshness that lasts for weeks.",
        basePrice: 65,
        stock: 35,
        featured: true,
        images: {
            default: IMAGES.bag2,
            gallery: [],
            colorVariants: []
        },
        variants: [{ id: "v-dsb-2", label: "Standard", multiplier: 1, priceGHS: 65 }],
        scents: ["Fresh Linen", "Cotton Blossom"]
    },

    // {
    //     id: "acc-car-1",
    //     title: "Premium Car Diffuser",
    //     slug: "premium-car-diffuser",
    //     category: "Accessories",
    //     shortDescription: "Elegant clip-on car fragrance diffuser.",
    //     longDescription: "Transform your daily commute with our premium car diffuser, designed to deliver a steady, pleasant fragrance.",
    //     basePrice: 95,
    //     stock: 60,
    //     featured: false,
    //     images: {
    //         default: IMAGES.diffcar2,
    //         gallery: [IMAGES.diffcar2],
    //         colorVariants: []
    //     },
    //     variants: [{ id: "v-pcd-std", label: "Standard", multiplier: 1, priceGHS: 95 }],
    //     scents: ["Cool Ocean", "New Car", "Sandalwood"]
    // }
];
