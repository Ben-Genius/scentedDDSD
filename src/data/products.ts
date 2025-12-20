import { IMAGES } from '@/assets';
import { Product } from '@/types';

export const products: Product[] = [
   {
    id: "p15",
    title: "Scented Sachets",
    slug: "scented-sachets",
    category: "Potpourri",
    shortDescription: "For drawers and closets.",
    longDescription: "Keep your linens and clothes smelling fresh with these long-lasting scented sachets.",
    basePrice: 25,
    stock: 200,
    featured: true,
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
    id: "p16",
    title: "Massage Oil",
    slug: "massage-oil",
    category: "Essential Oils",
    shortDescription: "Relaxing massage blend.",
    longDescription: "A soothing blend of essential oils and carrier oils perfect for winding down.",
    basePrice: 65,
    stock: 60,
    featured: true,
    images: {
      default: IMAGES.artifact8,
      gallery: [],
      colorVariants: []
    },
    variants: [
      { id: "v16-100", label: "100ml", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 65 }
    ],
    scents: ["Relaxing", "Energizing", "Sensual"]
  },
  {
    id: "p3",
    title: "Signature Soy Candle",
    slug: "signature-soy-candle",
    category: "Candle",
    shortDescription: "Hand-poured soy wax candle in glass jar.",
    longDescription: "Our signature candles are hand-poured using 100% natural soy wax for a clean, long-lasting burn.",
    basePrice: 120,
    burnTime: "40-60 hours",
    stock: 50,
    featured: true,
    images: {
      default: IMAGES.scentedcandle,
      gallery: [],
      colorVariants: [
        { colorId: "c-matte-black", label: "Matte Black", image: IMAGES.darkcandle },
        { colorId: "c-gold", label: "Gloss Gold", image: IMAGES.ambercandle, priceDelta: 20 },
        { colorId: "c-white", label: "Pearl White", image: IMAGES.candle }
      ]
    },
    variants: [
      { id: "v3-sm", label: "Votive", sizeMl: "75g", sizeLabel: "Petite", multiplier: 1, priceGHS: 120 },
      { id: "v3-md", label: "Jar", sizeMl: "250g", sizeLabel: "Classic", multiplier: 2, priceGHS: 220 },
      { id: "v3-lg", label: "3-Wick", sizeMl: "450g", sizeLabel: "Grande", multiplier: 3.5, priceGHS: 400 },
      { id: "v3-xl", label: "Statement", sizeMl: "1kg", sizeLabel: "Luxe", multiplier: 8, priceGHS: 850 }
    ],
    scents: ["Black Amber", "Pomegranate Noir", "Vanilla & Tobacco", "Sea Salt"]
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
    featured: true,
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
  {
    id: "p5",
    title: "Crystal Reed Diffuser",
    slug: "crystal-reed-diffuser",
    category: "Reed Diffuser",
    shortDescription: "Long-lasting fragrance in a crystal cut bottle.",
    longDescription: "A continuous scent throw without the flame. Comes with 8 black reeds.",
    basePrice: 150,
    stock: 60,
    featured: true,
    images: {
      default: IMAGES.diffavent,
      gallery: [IMAGES.diffavent2, IMAGES.diffaventus],
      colorVariants: []
    },
    variants: [
      { id: "v5-md", label: "Standard", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 150 },
      { id: "v5-lg", label: "Large", sizeMl: "200ml", sizeLabel: "Grande", multiplier: 1.8, priceGHS: 280 }
    ],
    scents: ["Lime Basil", "English Pear", "Wild Blueball"]
  },
  {
    id: "p6",
    title: "Pure Essential Oil",
    slug: "pure-essential-oil",
    category: "Essential Oils",
    shortDescription: "100% organic pure essential oils.",
    longDescription: "Therapeutic grade essential oils for burners and diffusers.",
    basePrice: 40,
    stock: 200,
    featured: false,
    images: {
      default: IMAGES.amber,
      gallery: [],
      colorVariants: []
    },
    variants: [
      { id: "v6-sm", label: "10ml", sizeMl: "10ml", sizeLabel: "Petite", multiplier: 1, priceGHS: 40 },
      { id: "v6-md", label: "30ml", sizeMl: "30ml", sizeLabel: "Classic", multiplier: 2.5, priceGHS: 90 }
    ],
    scents: ["Lavender", "Peppermint", "Eucalyptus", "Tea Tree", "Lemongrass"]
  },
  {
    id: "p7",
    title: "Room Spray",
    slug: "room-spray",
    category: "Air Fresheners",
    shortDescription: "Instant burst of freshness for any room.",
    longDescription: "Concentrated room spray designed to eliminate odors and refresh your space.",
    basePrice: 55,
    stock: 100,
    featured: true,
    images: {
      default: IMAGES.spray,
      gallery: [IMAGES.amberspray],
      colorVariants: []
    },
    variants: [
      { id: "v7-std", label: "Standard", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 55 }
    ],
    scents: ["Clean Cotton", "Spring Flower", "Ocean Breeze"]
  },
  {
    id: "p8",
    title: "Botanical Potpourri",
    slug: "botanical-potpourri",
    category: "Potpourri",
    shortDescription: "Dried flowers and botanicals.",
    longDescription: "A beautiful blend of dried botanicals scented with premium oils.",
    basePrice: 75,
    stock: 40,
    featured: false,
    images: {
      default: IMAGES.artifact3,
      gallery: [IMAGES.artifact5],
      colorVariants: []
    },
    variants: [
      { id: "v8-bag", label: "Bag", sizeMl: "250g", sizeLabel: "Classic", multiplier: 1, priceGHS: 75 },
      { id: "v8-bowl", label: "Bowl Set", sizeMl: "500g", sizeLabel: "Grande", multiplier: 2, priceGHS: 140 }
    ],
    scents: ["Spiced Apple", "Winter Forest", "Cinnamon"]
  },

  {
    id: "p10",
    title: "Refreshing Body Scrub",
    slug: "body-scrub",
    category: "Shower Gel",
    shortDescription: "Exfoliating scrub for radiant skin.",
    longDescription: "Sugar-based scrub that gently removes dead skin cells.",
    basePrice: 95,
    stock: 60,
    featured: false,
    images: {
      default: IMAGES.artifact4,
      gallery: [],
      colorVariants: []
    },
    variants: [
      { id: "v10-tub", label: "Tub", sizeMl: "300g", sizeLabel: "Classic", multiplier: 1, priceGHS: 95 }
    ],
    scents: ["Coffee", "Coconut", "Mango"]
  },
  {
    id: "p11",
    title: "Pillar Candle Set",
    slug: "pillar-candle-set",
    category: "Candle",
    shortDescription: "Set of 3 pillar candles.",
    longDescription: "Three graduated pillar candles for a dramatic centerpiece.",
    basePrice: 180,
    burnTime: "30 hours each",
    stock: 25,
    featured: true,
    images: {
      default: IMAGES.candle2,
      gallery: [IMAGES.candle],
      colorVariants: [
        { colorId: "c-ivory", label: "Ivory", image: IMAGES.candle2 },
        { colorId: "c-ruby", label: "Ruby Red", image: IMAGES.candle2Copy }
      ]
    },
    variants: [
      { id: "v11-set", label: "Set", sizeMl: "", sizeLabel: "Grande", multiplier: 1, priceGHS: 180 }
    ],
    scents: ["Unscented", "Vanilla"]
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
    featured: true,
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
    id: "p13",
    title: "Car Diffuser",
    slug: "car-diffuser",
    category: "Air Fresheners",
    shortDescription: "Clip-on car vent diffuser.",
    longDescription: "Keep your car smelling fresh on every drive.",
    basePrice: 35,
    stock: 150,
    featured: false,
    images: {
      default: IMAGES.diffcar2,
      gallery: [IMAGES.carcandle],
      colorVariants: []
    },
    variants: [
      { id: "v13-std", label: "Standard", sizeMl: "10ml", sizeLabel: "Petite", multiplier: 1, priceGHS: 35 }
    ],
    scents: ["New Car", "Black Ice", "Summer Breeze"]
  },
  {
    id: "p14",
    title: "Diffuser Refill Oil",
    slug: "diffuser-refill",
    category: "Essential Oils",
    shortDescription: "Refill for reed diffusers.",
    longDescription: "Extend the life of your favorite reed diffuser with our sustainable refill oils.",
    basePrice: 90,
    stock: 50,
    featured: false,
    images: {
      default: IMAGES.artifact6,
      gallery: [],
      colorVariants: []
    },
    variants: [
      { id: "v14-200", label: "200ml", sizeMl: "200ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 90 }
    ],
    scents: ["Lime Basil", "English Pear", "Wild Blueball"]
  },
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
    id: "p16",
    title: "Massage Oil",
    slug: "massage-oil",
    category: "Essential Oils",
    shortDescription: "Relaxing massage blend.",
    longDescription: "A soothing blend of essential oils and carrier oils perfect for winding down.",
    basePrice: 65,
    stock: 60,
    featured: false,
    images: {
      default: IMAGES.artifact8,
      gallery: [],
      colorVariants: []
    },
    variants: [
      { id: "v16-100", label: "100ml", sizeMl: "100ml", sizeLabel: "Classic", multiplier: 1, priceGHS: 65 }
    ],
    scents: ["Relaxing", "Energizing", "Sensual"]
  }
];
