import { Product } from '../types';

// Sizes and prices shown for a product (candles, refills and diffusers use fixed size options).
// Shared by the product page and the product cards so both show the same prices.
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
        return [
            { id: `${product.id}-small`, label: 'Small', sizeLabel: '485g', multiplier: 1, priceGHS: 200 },
            { id: `${product.id}-medium`, label: 'Medium', sizeLabel: '695g', multiplier: 1, priceGHS: 250 },
            { id: `${product.id}-grand`, label: 'Grand', sizeLabel: '1525g', multiplier: 1, priceGHS: 550 },
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
