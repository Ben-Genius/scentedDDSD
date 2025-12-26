import { IMAGES } from '@/assets';
import { Product } from '@/types';

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
            default: IMAGES.diffavent,
            gallery: [IMAGES.diffavent2],
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
        featured: true,
        images: {
            default: IMAGES.diffavent2,
            gallery: [],
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
            gallery: [],
            colorVariants: []
        },
        variants: [
            { id: "v-diff-luxury", label: "Standard", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 200 }
        ],
        scents: ["Champagne Cocktail"]
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
        featured: true,
        images: {
            default: IMAGES.amber,
            gallery: [],
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
            gallery: [IMAGES.darkcandle, IMAGES.ambercandle, IMAGES.candle],
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
            gallery: [IMAGES.amberspray],
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
            gallery: [],
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
            gallery: [],
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
    }
];
