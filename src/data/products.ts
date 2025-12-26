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
            gallery: [IMAGES.diffavent2, IMAGES.new1, IMAGES.new2, IMAGES.new3],
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
            gallery: [IMAGES.new4, IMAGES.new5, IMAGES.new6],
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
            gallery: [IMAGES.new7, IMAGES.new8, IMAGES.new9],
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
        featured: false,
        images: {
            default: IMAGES.amber,
            gallery: [IMAGES.new10, IMAGES.new11, IMAGES.new12],
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
        featured: false,
        images: {
            default: IMAGES.scentedcandle,
            gallery: [IMAGES.darkcandle, IMAGES.ambercandle, IMAGES.candle, IMAGES.new13, IMAGES.new14, IMAGES.new15],
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
            gallery: [IMAGES.amberspray, IMAGES.new16, IMAGES.new17],
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
            gallery: [IMAGES.new18, IMAGES.new19],
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
            gallery: [IMAGES.new20, IMAGES.new21, IMAGES.new22],
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
            default: IMAGES.new1,
            gallery: [IMAGES.new2, IMAGES.new3],
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
        featured: true,
        images: {
            default: IMAGES.new4,
            gallery: [IMAGES.new5, IMAGES.new6],
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
        featured: true,
        images: {
            default: IMAGES.new7,
            gallery: [IMAGES.new8, IMAGES.new9],
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
            default: IMAGES.new10,
            gallery: [IMAGES.new11, IMAGES.new12],
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
            default: IMAGES.new13,
            gallery: [IMAGES.new14, IMAGES.new15],
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
        featured: true,
        images: {
            default: IMAGES.new16,
            gallery: [IMAGES.new17, IMAGES.new18],
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
        featured: true,
        images: {
            default: IMAGES.new19,
            gallery: [IMAGES.new20, IMAGES.new21],
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
        featured: true,
        images: {
            default: IMAGES.new22,
            gallery: [IMAGES.new23, IMAGES.new24],
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
        featured: true,
        images: {
            default: IMAGES.new25,
            gallery: [IMAGES.new26, IMAGES.new27],
            colorVariants: []
        },
        variants: [{ id: "v-new-9", label: "Standard", sizeMl: "150ml", sizeLabel: "Standard", multiplier: 1, priceGHS: 125 }],
        scents: ["Lemon", "Basil", "Thyme"]
    }
];
