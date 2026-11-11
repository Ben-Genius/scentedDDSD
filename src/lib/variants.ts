import { Product } from '../types';

// Sizes and prices offered on the product page. Candles, refills and diffusers
// use the fixed size options below; other products use their own variants.
// Shared by the product page and the cart, so both use the same prices.
export const overrideVariants = (product: Product) => {
    const titleLower = product.title.toLowerCase();
    const catLower = product.category.toLowerCase();

    const isDiffuser = titleLower.includes('diffuser') || catLower.includes('diffuser');
    const isOil = titleLower.includes('oil') || catLower === 'essential oils';
    const isRefill = titleLower.includes('refill');

    const candleCollections = [
        'floral romance', 'woody and suede', 'woody & exotic',
        'oriental luxe', 'gourmet indulgence', 'gourmand indulgence',
        'fresh whisper'
    ];

    const isCandle = catLower === 'candle' || titleLower.includes('candle') ||
        (candleCollections.includes(catLower) && !isDiffuser && !isOil && !isRefill);

    if (isCandle) {
        // Candle sizes and prices (GH₵). Change them here for every candle.
        return [
            { id: `${product.id}-small`, label: 'S', multiplier: 1, priceGHS: 50 },
            { id: `${product.id}-medium`, label: 'M', multiplier: 1, priceGHS: 120 },
            { id: `${product.id}-large`, label: 'L', multiplier: 1, priceGHS: 200 },
            { id: `${product.id}-xl`, label: 'XL', multiplier: 1, priceGHS: 400 },
        ];
    }

    if (isRefill) {
        return [
            { id: `${product.id}-300ml`, label: '300ml', sizeLabel: '300ml', multiplier: 1, priceGHS: 300 },
            { id: `${product.id}-500ml`, label: '500ml', sizeLabel: '500ml', multiplier: 1, priceGHS: 500 },
        ];
    }

    if (isDiffuser) {
        return [
            { id: `${product.id}-std`, label: 'Standard', sizeLabel: '230ml', multiplier: 1, priceGHS: product.basePrice || 200 },
        ];
    }

    return product.variants;
};
