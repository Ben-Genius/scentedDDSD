import candle1 from '../assets/collections/candles/1.png';
import candle1Hover from '../assets/collections/candles/1.1.png';
import candle2 from '../assets/collections/candles/2.png';
import candle2Hover from '../assets/collections/candles/2.2.png';
import candle3 from '../assets/collections/candles/3.png';
import candle3Hover from '../assets/collections/candles/3.3.png';
import candle4 from '../assets/collections/candles/4.png';
import candle4Hover from '../assets/collections/candles/4.4.png';
import candle5 from '../assets/collections/candles/5.png';
import candle5Hover from '../assets/collections/candles/5.5.png';
import candle6 from '../assets/collections/candles/6.png';
import candle6Hover from '../assets/collections/candles/6.6.png';

import wood1 from '../assets/collections/candles/wood/w1.png';
import wood1Hover from '../assets/collections/candles/wood/w11.png';
import wood2 from '../assets/collections/candles/wood/w2.png';
import wood2Hover from '../assets/collections/candles/wood/w22.png';
import wood3 from '../assets/collections/candles/wood/w3.png';
import wood3Hover from '../assets/collections/candles/wood/w33.png';
import wood4 from '../assets/collections/candles/wood/w4.png';
import wood4Hover from '../assets/collections/candles/wood/w44.png';

import oriental1 from '../assets/collections/candles/oriental/o1.png';
import oriental1Hover from '../assets/collections/candles/oriental/o11.png';
import oriental2 from '../assets/collections/candles/oriental/o2.png';
import oriental2Hover from '../assets/collections/candles/oriental/o22.png';
import oriental3 from '../assets/collections/candles/oriental/o3.png';
import oriental3Hover from '../assets/collections/candles/oriental/o33.png';
import oriental4 from '../assets/collections/candles/oriental/o4.png';
import oriental4Hover from '../assets/collections/candles/oriental/o44.png';
import oriental5 from '../assets/collections/candles/oriental/o5.png';
import oriental5Hover from '../assets/collections/candles/oriental/o55.png';
import oriental6 from '../assets/collections/candles/oriental/o6.png';
import oriental6Hover from '../assets/collections/candles/oriental/o66.png';
import oriental7 from '../assets/collections/candles/oriental/o7.png';
import oriental7Hover from '../assets/collections/candles/oriental/o77.png';

import gourmet1 from '../assets/collections/candles/gourmet/g1.png';
import gourmet1Hover from '../assets/collections/candles/gourmet/g11.png';
import gourmet2 from '../assets/collections/candles/gourmet/g2.png';
import gourmet2Hover from '../assets/collections/candles/gourmet/g22.png';
import gourmet3 from '../assets/collections/candles/gourmet/g3.png';
import gourmet3Hover from '../assets/collections/candles/gourmet/g33.png';
import gourmet4 from '../assets/collections/candles/gourmet/g4.png';
import gourmet4Hover from '../assets/collections/candles/gourmet/g4.png';
import gourmet5 from '../assets/collections/candles/gourmet/g5.png';
import gourmet5Hover from '../assets/collections/candles/gourmet/g55.png';
import gourmet6 from '../assets/collections/candles/gourmet/g6.png';
import gourmet6Hover from '../assets/collections/candles/gourmet/g66.png';
import gourmet7 from '../assets/collections/candles/gourmet/g7.png';
import gourmet7Hover from '../assets/collections/candles/gourmet/g77.png';

import fresh1 from '../assets/collections/candles/fresh/f1.png';
import fresh1Hover from '../assets/collections/candles/fresh/f11.png';
import fresh2 from '../assets/collections/candles/fresh/f2.png';
import fresh2Hover from '../assets/collections/candles/fresh/f22.png';
import fresh3 from '../assets/collections/candles/fresh/f3.png';
import fresh3Hover from '../assets/collections/candles/fresh/f33.png';
import fresh4 from '../assets/collections/candles/fresh/f4.png';
import fresh4Hover from '../assets/collections/candles/fresh/f44.png';
import fresh5 from '../assets/collections/candles/fresh/f5.png';
import fresh5Hover from '../assets/collections/candles/fresh/f55.png';
import fresh6 from '../assets/collections/candles/fresh/f6.png';
import fresh6Hover from '../assets/collections/candles/fresh/f66.png';
import fresh7 from '../assets/collections/candles/fresh/f7.png';
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
        featuredImage: '/images/collections/candles/hero-main.png',
        sections: [
            {
                title: 'Floral Romance Collection',
                image: '/images/collections/candles/floral.png',
                path: '/collections/floral-romance',
                links: [
                    {
                        name: 'Freesia and English Pear',
                        path: '/product/freesia-english-pear',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle1Hover
                    },
                    {
                        name: 'Blush Peony',
                        path: '/product/blush-peony',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle1Hover // Assuming shared image or duplicate
                    },
                    {
                        name: 'Midnight Lavender',
                        path: '/product/midnight-lavender',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle2Hover
                    },
                    {
                        name: 'Royal Rose Bloom',
                        path: '/product/royal-rose-bloom',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle1Hover // Assuming shared image or duplicate
                    },
                    {
                        name: 'Lotus Veil',
                        path: '/product/lotus-veil',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle5Hover
                    },
                    {
                        name: "Amour D'Osmanthus",
                        path: '/product/amour-d-osmanthus',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle6Hover
                    },
                    {
                        name: 'Golden Ylang',
                        path: '/product/golden-ylang',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle4Hover
                    },
                    {
                        name: 'Jasmin',
                        path: '/product/jasmin',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: candle3Hover
                    },
                ]
            },
            {
                title: 'Woody and Suede Collection',
                image: '/images/collections/candles/woody.png',
                path: '/collections/woody-suede',
                links: [
                    {
                        name: 'Tobacco Noir',
                        path: '/product/tobacco-noir',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: oriental1Hover
                    },
                    {
                        name: 'Velvet Rose and Oud',
                        path: '/product/velvet-rose-oud',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: wood1Hover
                    },
                    {
                        name: 'Sandalwood',
                        path: '/product/sandalwood',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: wood4Hover
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: wood2Hover
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: wood3Hover
                    },
                    {
                        name: 'Amber Luxe',
                        path: '/product/amber-luxe',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: oriental2Hover
                    },
                    {
                        name: 'Cedar Caress',
                        path: '/product/cedar-caress',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: oriental3Hover
                    },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: '/images/collections/candles/oriental.png',
                path: '/collections/oriental-luxe',
                links: [
                    {
                        name: 'Lovers Rock',
                        path: '/product/lovers-rock',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: oriental6Hover
                    },
                    {
                        name: 'Pomegranate Noir',
                        path: '/product/pomegranate-noir',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: oriental5Hover
                    },
                    {
                        name: 'Blackberry Bloom',
                        path: '/product/blackberry-bloom',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: oriental7Hover
                    },
                ]
            },
            {
                title: 'Gourmand Indulgence Collection',
                image: '/images/collections/candles/gourmand.png',
                path: '/collections/gourmand-indulgence',
                links: [
                    {
                        name: 'Champagne Cocktail',
                        path: '/product/champagne-cocktail',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: gourmet7Hover
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: gourmet4Hover
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: gourmet5Hover
                    },
                    {
                        name: 'Piña Colada',
                        path: '/product/pina-colada',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: gourmet6Hover
                    },
                    {
                        name: 'Butterscotch',
                        path: '/product/butterscotch',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: gourmet3Hover
                    },
                    {
                        name: 'Marshmallow Cheesecake',
                        path: '/product/marshmallow-cheesecake',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: gourmet2Hover
                    },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: '/images/collections/candles/fresh.png',
                path: '/collections/fresh-whisper',
                links: [
                    {
                        name: 'Sage & Sea Salt',
                        path: '/product/sage-sea-salt',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: fresh1Hover
                    },
                    {
                        name: 'White Tea',
                        path: '/product/white-tea',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: fresh4Hover
                    },
                    {
                        name: 'Sweet Bergamot',
                        path: '/product/sweet-bergamot',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: fresh7Hover
                    },
                    {
                        name: 'Lemongrass',
                        path: '/product/lemongrass',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: fresh3Hover
                    },
                    {
                        name: 'Lemon and Lime',
                        path: '/product/lemon-lime',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: fresh5Hover
                    },
                    {
                        name: 'Frosted Apple',
                        path: '/product/frosted-apple',
                        image: '/images/products/candles/candle-main.png',
                        hoverImage: fresh6Hover
                    },
                    {
                        name: 'Peppermint',
                        path: '/product/peppermint',
                        image: '/images/products/candles/candle-main.png',
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
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/freesia-english-pear.png'
                    },
                    {
                        name: "Amour D'Osmanthus",
                        path: '/product/amour-d-osmanthus-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/amour-d-osmanthus.png'
                    },
                    {
                        name: 'Midnight Lavender',
                        path: '/product/midnight-lavender-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/midnight-lavender.png'
                    },
                    {
                        name: 'Royal Rose Bloom',
                        path: '/product/royal-rose-bloom-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
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
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/tobacco-noir.png'
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/black-oud.png'
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
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
                        image: '/images/products/diffusers/diffuser-main.png',
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
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/champagne-cocktail.png'
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/sugar-vanilla.png'
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
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
                        image: '/images/products/diffusers/diffuser-main.png',
                        hoverImage: '/images/ingredients/diffusers/sage-sea-salt.png'
                    },
                    {
                        name: 'Lemongrass',
                        path: '/product/lemongrass-diffuser',
                        image: '/images/products/diffusers/diffuser-main.png',
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
        sections: [
            {
                title: 'Floral Romance Collection',
                image: '/images/collections/oils/floral.png',
                path: '/collections/floral-romance-oils',
                links: [
                    {
                        name: 'Freesia and English Pear',
                        path: '/product/freesia-english-pear-oil',
                        image: '/images/products/oils/freesia-english-pear.png',
                        hoverImage: '/images/ingredients/oils/freesia-english-pear.png'
                    },
                    {
                        name: 'Blush Peony',
                        path: '/product/blush-peony-oil',
                        image: '/images/products/oils/blush-peony.png',
                        hoverImage: '/images/ingredients/oils/blush-peony.png'
                    },
                    {
                        name: 'Midnight Lavender',
                        path: '/product/midnight-lavender-oil',
                        image: '/images/products/oils/midnight-lavender.png',
                        hoverImage: '/images/ingredients/oils/midnight-lavender.png'
                    },
                ]
            },
            {
                title: 'Woody and Suede Collection',
                image: '/images/collections/oils/woody.png',
                path: '/collections/woody-suede-oils',
                links: [
                    {
                        name: 'Tobacco Noir',
                        path: '/product/tobacco-noir-oil',
                        image: '/images/products/oils/tobacco-noir.png',
                        hoverImage: '/images/ingredients/oils/tobacco-noir.png'
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud-oil',
                        image: '/images/products/oils/black-oud.png',
                        hoverImage: '/images/ingredients/oils/black-oud.png'
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig-oil',
                        image: '/images/products/oils/wild-fig.png',
                        hoverImage: '/images/ingredients/oils/wild-fig.png'
                    },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: '/images/collections/oils/oriental.png',
                path: '/collections/oriental-luxe-oils',
                links: [
                    {
                        name: 'Lovers Rock',
                        path: '/product/lovers-rock-oil',
                        image: '/images/products/oils/lovers-rock.png',
                        hoverImage: '/images/ingredients/oils/lovers-rock.png'
                    },
                    {
                        name: 'Pomegranate',
                        path: '/product/pomegranate-oil',
                        image: '/images/products/oils/pomegranate.png',
                        hoverImage: '/images/ingredients/oils/pomegranate.png'
                    },
                ]
            },
            {
                title: 'Gourmand Indulgence Collection',
                image: '/images/collections/oils/gourmand.png',
                path: '/collections/gourmand-indulgence-oils',
                links: [
                    {
                        name: 'Champagne Cocktail',
                        path: '/product/champagne-cocktail-oil',
                        image: '/images/products/oils/champagne-cocktail.png',
                        hoverImage: '/images/ingredients/oils/champagne-cocktail-oil.png'
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla-oil',
                        image: '/images/products/oils/sugar-vanilla.png',
                        hoverImage: '/images/ingredients/oils/sugar-vanilla.png'
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini-oil',
                        image: '/images/products/oils/peach-bellini.png',
                        hoverImage: '/images/ingredients/oils/peach-bellini.png'
                    },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: '/images/collections/oils/fresh.png',
                path: '/collections/fresh-whisper-oils',
                links: [

                    {
                        name: 'Sage & Sea Salt',
                        path: '/product/sage-sea-salt-oil',
                        image: '/images/products/oils/sage-sea-salt.png',
                        hoverImage: '/images/ingredients/oils/sage-sea-salt-oil.png'
                    },
                    {
                        name: 'White Tea',
                        path: '/product/white-tea-oil',
                        image: '/images/products/oils/white-tea.png',
                        hoverImage: '/images/ingredients/oils/white-tea.png'
                    },
                    {
                        name: 'Sweet Bergamot',
                        path: '/product/sweet-bergamot-oil',
                        image: '/images/products/oils/sweet-bergamot.png',
                        hoverImage: '/images/ingredients/oils/sweet-bergamot.png'
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
        featuredImage: '/images/collections/bath-body/hero-main.png',
    },
    {
        id: 'shop',
        name: 'Shop',
        path: '/shop',
    },
    {
        id: 'gifts',
        name: 'Gift Sets',
        path: '/bundles',
    }
];