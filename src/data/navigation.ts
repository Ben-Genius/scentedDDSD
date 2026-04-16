import { IMAGES } from '../assets';
import candle2Hover from '../assets/collections/candles/2.2.png';
import candle3Hover from '../assets/collections/candles/3.3.png';
import candle4Hover from '../assets/images/ingredients/candles/ylang_hover.png';
import candle5Hover from '../assets/collections/candles/5.5.png';
import candle6Hover from '../assets/collections/candles/6.6.png';

import wood1Hover from '../assets/collections/candles/wood/w11.png';
import wood2Hover from '../assets/collections/candles/wood/w22.png';
import wood3Hover from '../assets/collections/candles/wood/w33.png';
import wood4Hover from '../assets/collections/candles/wood/w44.png';

import oriental1Hover from '../assets/collections/candles/oriental/o11.png';
import oriental2Hover from '../assets/collections/candles/oriental/o22.png';
import oriental3Hover from '../assets/collections/candles/oriental/o33.png';
import oriental5Hover from '../assets/collections/candles/oriental/o55.png';
import oriental6Hover from '../assets/images/ingredients/candles/lovers_rock_hover.png';
import oriental7Hover from '../assets/collections/candles/oriental/o77.png';

import gourmet2Hover from '../assets/collections/candles/gourmet/g22.png';
import gourmet3Hover from '../assets/collections/candles/gourmet/g33.png';
import gourmet4Hover from '../assets/images/ingredients/candles/sugar_vanilla_hover.png';
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



export interface SubLink {
    name: string;
    path: string;
    image?: string;
    hoverImage?: string;
}

export interface NavSection {
    title: string;
    links: SubLink[];
    image?: string;
    path?: string;
}

export interface NavItem {
    id: string;
    name: string;
    path: string;
    sections?: NavSection[];
    featuredImage?: string;
}

export const navigationData: NavItem[] = [
    {
        id: 'home',
        name: 'Home',
        path: '/',
    },
    {
        id: 'candles',
        name: 'Scented Candles',
        path: '/home-candles',
        sections: [
            {
                title: 'Floral Romance Collection',
                image: IMAGES.collectionFloral,
                path: '/collections/floral-romance',
                links: [
                    {
                        name: 'Freesia and English Pear',
                        path: '/product/freesia-english-pear',
                        image: IMAGES.c1,
                        hoverImage: IMAGES.freesiaPearHover
                    },
                    {
                        name: 'Blush Peony',
                        path: '/product/blush-peony',
                        image: IMAGES.c2,
                        hoverImage: IMAGES.blushPeonyHover
                    },
                    {
                        name: 'Midnight Lavender',
                        path: '/product/midnight-lavender',
                        image: IMAGES.c3,
                        hoverImage: candle2Hover
                    },
                    {
                        name: 'Royal Rose Bloom',
                        path: '/product/royal-rose-bloom',
                        image: IMAGES.c4,
                        hoverImage: IMAGES.royalRoseHover
                    },
                    {
                        name: 'Lotus Veil',
                        path: '/product/lotus-veil',
                        image: IMAGES.c5,
                        hoverImage: candle5Hover
                    },
                    {
                        name: "Amour D'Osmanthus",
                        path: '/product/amour-d-osmanthus',
                        image: IMAGES.c6,
                        hoverImage: candle6Hover
                    },
                    {
                        name: 'Golden Ylang',
                        path: '/product/golden-ylang',
                        image: IMAGES.c7,
                        hoverImage: candle4Hover
                    },
                    {
                        name: 'Jasmin',
                        path: '/product/jasmin',
                        image: IMAGES.c8,
                        hoverImage: candle3Hover
                    },
                ]
            },
            {
                title: 'Woody and Suede Collection',
                image: IMAGES.collectionWoody,
                path: '/collections/woody-suede',
                links: [
                    {
                        name: 'Tobacco Noir',
                        path: '/product/tobacco-noir',
                        image: IMAGES.c9,
                        hoverImage: oriental1Hover
                    },
                    {
                        name: 'Velvet Rose and Oud',
                        path: '/product/velvet-rose-oud',
                        image: IMAGES.c10,
                        hoverImage: wood1Hover
                    },
                    {
                        name: 'Sandalwood',
                        path: '/product/sandalwood',
                        image: IMAGES.c11,
                        hoverImage: wood4Hover
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud',
                        image: IMAGES.c12,
                        hoverImage: wood2Hover
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig',
                        image: IMAGES.c13,
                        hoverImage: wood3Hover
                    },
                    {
                        name: 'Amber Luxe',
                        path: '/product/amber-luxe',
                        image: IMAGES.c14,
                        hoverImage: oriental2Hover
                    },
                    {
                        name: 'Cedar Caress',
                        path: '/product/cedar-caress',
                        image: IMAGES.c15,
                        hoverImage: oriental3Hover
                    },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: IMAGES.collectionOriental,
                path: '/collections/oriental-luxe',
                links: [
                    {
                        name: 'Lovers Rock',
                        path: '/product/lovers-rock',
                        image: IMAGES.c16,
                        hoverImage: oriental6Hover
                    },
                    {
                        name: 'Pomegranate Noir',
                        path: '/product/pomegranate-noir',
                        image: IMAGES.c17,
                        hoverImage: oriental5Hover
                    },
                    {
                        name: 'Blackberry Bloom',
                        path: '/product/blackberry-bloom',
                        image: IMAGES.c18,
                        hoverImage: oriental7Hover
                    },
                ]
            },
            {
                title: 'Gourmand Indulgence Collection',
                image: IMAGES.collectionFloral,
                path: '/collections/gourmand-indulgence',
                links: [
                    {
                        name: 'Champagne Cocktail',
                        path: '/product/champagne-cocktail',
                        image: IMAGES.c1,
                        hoverImage: gourmet7Hover
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla',
                        image: IMAGES.c2,
                        hoverImage: gourmet4Hover
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini',
                        image: IMAGES.c3,
                        hoverImage: gourmet5Hover
                    },
                    {
                        name: 'Piña Colada',
                        path: '/product/pina-colada',
                        image: IMAGES.c4,
                        hoverImage: gourmet6Hover
                    },
                    {
                        name: 'Butterscotch',
                        path: '/product/butterscotch',
                        image: IMAGES.c5,
                        hoverImage: gourmet3Hover
                    },
                    {
                        name: 'Marshmallow Cheesecake',
                        path: '/product/marshmallow-cheesecake',
                        image: IMAGES.c6,
                        hoverImage: gourmet2Hover
                    },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: IMAGES.collectionFresh,
                path: '/collections/fresh-whisper',
                links: [
                    {
                        name: 'Sage & Sea Salt',
                        path: '/product/sage-sea-salt',
                        image: IMAGES.c7,
                        hoverImage: fresh1Hover
                    },
                    {
                        name: 'White Tea',
                        path: '/product/white-tea',
                        image: IMAGES.c8,
                        hoverImage: fresh4Hover
                    },
                    {
                        name: 'Sweet Bergamot',
                        path: '/product/sweet-bergamot',
                        image: IMAGES.w_ref1,
                        hoverImage: fresh7Hover
                    },
                    {
                        name: 'Lemongrass',
                        path: '/product/lemongrass',
                        image: IMAGES.w_ref2,
                        hoverImage: fresh3Hover
                    },
                    {
                        name: 'Lemon and Lime',
                        path: '/product/lemon-lime',
                        image: IMAGES.w_ref3,
                        hoverImage: fresh5Hover
                    },
                    {
                        name: 'Frosted Apple',
                        path: '/product/frosted-apple',
                        image: IMAGES.w_ref4,
                        hoverImage: fresh6Hover
                    },
                    {
                        name: 'Peppermint',
                        path: '/product/peppermint',
                        image: IMAGES.c13,
                        hoverImage: fresh2Hover
                    },
                ]
            }
        ]
    },
    {
        id: 'diffusers',
        name: 'Diffusers',
        path: '/diffusers',
        featuredImage: '/images/collections/diffusers/floral-romance.png',
        sections: [
            {
                title: 'Floral Romance Collection',
                image: '/images/collections/diffusers/floral-romance.png',
                path: '/collections/floral-romance-diffusers',
                links: [
                    {
                        name: 'Freesia and English Pear',
                        path: '/product/freesia-english-pear-diffuser',
                        image: IMAGES.diffuserHeader1,
                        hoverImage: '/images/ingredients/diffusers/freesia-english-pear.png'
                    },
                    {
                        name: "Amour D'Osmanthus",
                        path: '/product/amour-d-osmanthus-diffuser',
                        image: IMAGES.diffuserHeader2,
                        hoverImage: '/images/ingredients/diffusers/amour-d-osmanthus.png'
                    },
                    {
                        name: 'Midnight Lavender',
                        path: '/product/midnight-lavender-diffuser',
                        image: IMAGES.diffuserHeader3,
                        hoverImage: '/images/ingredients/diffusers/midnight-lavender.png'
                    },
                    {
                        name: 'Royal Rose Bloom',
                        path: '/product/royal-rose-bloom-diffuser',
                        image: IMAGES.diffuserHeader4,
                        hoverImage: '/images/ingredients/diffusers/royal-rose-bloom.png'
                    },
                ]
            },
            {
                title: 'Woody and Suede Collection',
                image: '/images/collections/diffusers/woody.png',
                path: '/collections/woody-suede-diffusers',
                links: [
                    {
                        name: 'Tobacco Noir',
                        path: '/product/tobacco-noir-diffuser',
                        image: IMAGES.diffuserHeader5,
                        hoverImage: '/images/ingredients/diffusers/tobacco-noir.png'
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud-diffuser',
                        image: IMAGES.diffuserHeader6,
                        hoverImage: '/images/ingredients/diffusers/black-oud.png'
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig-diffuser',
                        image: IMAGES.diffuserHeader7,
                        hoverImage: '/images/ingredients/diffusers/wild-fig.png'
                    },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: '/images/collections/diffusers/oriental.png',
                path: '/collections/oriental-luxe-diffusers',
                links: [
                    {
                        name: 'Pomegranate',
                        path: '/product/pomegranate-diffuser',
                        image: IMAGES.diffuserHeader8,
                        hoverImage: '/images/ingredients/diffusers/pomegranate.png'
                    },
                ]
            },
            {
                title: 'Gourmand Indulgence Collection',
                image: '/images/collections/diffusers/gourmand.png',
                path: '/collections/gourmand-indulgence-diffusers',
                links: [
                    {
                        name: 'Champagne Cocktail',
                        path: '/product/champagne-cocktail-diffuser',
                        image: IMAGES.diffuserHeader9,
                        hoverImage: '/images/ingredients/diffusers/champagne-cocktail.png'
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla-diffuser',
                        image: IMAGES.diffuserHeader10,
                        hoverImage: '/images/ingredients/diffusers/sugar-vanilla.png'
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini-diffuser',
                        image: IMAGES.diffuserHeader11,
                        hoverImage: '/images/ingredients/diffusers/peach-bellini.png'
                    },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: '/images/collections/diffusers/fresh.png',
                path: '/collections/fresh-whisper-diffusers',
                links: [
                    {
                        name: 'Sage & Sea Salt',
                        path: '/product/sage-sea-salt-diffuser',
                        image: IMAGES.diffuserHeader12,
                        hoverImage: '/images/ingredients/diffusers/sage-sea-salt.png'
                    },
                    {
                        name: 'Lemongrass',
                        path: '/product/lemongrass-diffuser',
                        image: IMAGES.diffuserHeader13,
                        hoverImage: '/images/ingredients/diffusers/lemongrass.png'
                    },
                ]
            }
        ]
    },
    {
        id: 'oils',
        name: 'Essential Oils',
        path: '/essential-oils',
        featuredImage: IMAGES.oil2,
        sections: [
            {
                title: 'Floral Romance Collection',
                image: IMAGES.oil1,
                path: '/collections/floral-romance-oils',
                links: [
                    {
                        name: 'Freesia and English Pear',
                        path: '/product/freesia-english-pear-oil',
                        image: IMAGES.oil1,
                        hoverImage: IMAGES.oilFreesiaHover
                    },
                    {
                        name: 'Blush Peony',
                        path: '/product/blush-peony-oil',
                        image: IMAGES.oil2,
                        hoverImage: IMAGES.oilBlushPeonyHover
                    },
                    {
                        name: 'Midnight Lavender',
                        path: '/product/midnight-lavender-oil',
                        image: IMAGES.oil15,
                        hoverImage: IMAGES.oilMidnightLavenderHover
                    },
                ]
            },
            {
                title: 'Woody and Suede Collection',
                image: IMAGES.oil14,
                path: '/collections/woody-suede-oils',
                links: [
                    {
                        name: 'Tobacco Noir',
                        path: '/product/tobacco-noir-oil',
                        image: IMAGES.oil14,
                        hoverImage: IMAGES.oilTobaccoNoirHover
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud-oil',
                        image: IMAGES.oil13,
                        hoverImage: IMAGES.oilBlackOudHover
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig-oil',
                        image: IMAGES.oil12,
                        hoverImage: IMAGES.oilWildFigHover
                    },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: IMAGES.oil11,
                path: '/collections/oriental-luxe-oils',
                links: [
                    {
                        name: 'Lovers Rock',
                        path: '/product/lovers-rock-oil',
                        image: IMAGES.oil11,
                        hoverImage: IMAGES.oilLoversRockHover
                    },
                    {
                        name: 'Pomegranate',
                        path: '/product/pomegranate-oil',
                        image: IMAGES.oil10,
                        hoverImage: IMAGES.oilPomegranateHover
                    },
                ]
            },
            {
                title: 'Gourmand Indulgence Collection',
                image: IMAGES.oil20,
                path: '/collections/gourmand-indulgence-oils',
                links: [
                    {
                        name: 'Champagne Cocktail',
                        path: '/product/champagne-cocktail-oil',
                        image: IMAGES.oil20,
                        hoverImage: IMAGES.oilChampagneHover
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla-oil',
                        image: IMAGES.oil23,
                        hoverImage: IMAGES.oilSugarVanillaHover
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini-oil',
                        image: IMAGES.oil5,
                        hoverImage: IMAGES.oilPeachBelliniHover
                    },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: IMAGES.oil4,
                path: '/collections/fresh-whisper-oils',
                links: [
                    {
                        name: 'Sage & Sea Salt',
                        path: '/product/sage-sea-salt-oil',
                        image: IMAGES.oil4,
                        hoverImage: IMAGES.oilSageHover
                    },
                    {
                        name: 'White Tea',
                        path: '/product/white-tea-oil',
                        image: IMAGES.oil18,
                        hoverImage: IMAGES.oilWhiteTeaHover
                    },
                    {
                        name: 'Sweet Bergamot',
                        path: '/product/sweet-bergamot-oil',
                        image: IMAGES.oil16,
                        hoverImage: IMAGES.oilSweetBergamotHover
                    },
                ]
            }
        ]
    },

    {
        id: 'air',
        name: 'Air Fresheners',
        path: '/air-freshners',
        featuredImage: '/images/collections/air-fresheners/hero-main.png',
    },
    {
        id: 'bath',
        name: 'Bath & Body',
        path: '/bath-body',
        featuredImage: IMAGES.soap1,
        sections: [
            {
                title: 'Body Collection',
                path: '/collections/body-collection',
                links: [
                    { name: 'Artisan Soap I', path: '/product/artisan-scented-soap-1', image: IMAGES.soap1 },
                    { name: 'Artisan Soap II', path: '/product/artisan-scented-soap-2', image: IMAGES.soap2 },
                ]
            }
        ]
    },
    {
        id: 'shop',
        name: 'Accessories',
        path: '/accessories',
        featuredImage: IMAGES.sweethome,
        sections: [
            {
                title: 'Burners',
                path: '/collections/burners',
                links: [
                    { name: 'Sweet Home Ceramic Burner', path: '/product/sweet-home-burner', image: IMAGES.sweethome },
                    { name: 'Oriental Lantern Burner', path: '/product/oriental-lantern-burner', image: IMAGES.newlantern },
                    { name: 'Minimalist Stone Burner', path: '/product/minimalist-stone-burner', image: IMAGES.burner1 },
                    { name: 'Classic White Ceramic Burner', path: '/product/classic-white-burner', image: IMAGES.burner2 },
                ]
            },
            {
                title: 'Textiles & Others',
                path: '/collections/textiles',
                links: [
                    { name: 'Luxury Scented Tissues', path: '/product/scented-tissues', image: IMAGES.tissue1 },
                    { name: 'Travel Bag', path: '/product/designer-scent-bag-2', image: IMAGES.bag2 },
                ]
            }
        ]
    },
    // {
    //     id: 'gifts',
    //     name: 'Gift Sets',
    //     path: '/bundles',
    // }
];