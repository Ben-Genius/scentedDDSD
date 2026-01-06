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
        sections: [
            {
                title: 'Floral Romance Collection',
                image: '/images/collections/floral-romance.png',
                path: '/collections/floral-romance',
                links: [
                    {
                        name: 'Royal Rose Bloom',
                        path: '/product/royal-rose-bloom',
                        image: candle1,
                        hoverImage: candle1Hover
                    },
                    {
                        name: 'Lavande de Minuit',
                        path: '/product/lavande-de-minuit',
                        image: candle2,
                        hoverImage: candle2Hover
                    },
                    {
                        name: 'Jasmine',
                        path: '/product/jasmine',
                        image: candle3,
                        hoverImage: candle3Hover
                    },
                    {
                        name: 'Golden Hang',
                        path: '/product/golden-hang',
                        image: candle4,
                        hoverImage: candle4Hover
                    },
                    {
                        name: 'Lotus Veil',
                        path: '/product/lotus-veil',
                        image: candle5,
                        hoverImage: candle5Hover
                    },
                    {
                        name: "Amour d'Orchidthat",
                        path: '/product/amour-d-orchidthat',
                        image: candle6,
                        hoverImage: candle6Hover
                    },
                ]
            },
            {
                title: 'Woody & Exotic Collection',
                image: '/images/collections/woody-exotic.png',
                path: '/collections/woody-exotic',
                links: [
                    {
                        name: 'Velvet Rose & Oud',
                        path: '/product/velvet-rose-oud',
                        image: wood1,
                        hoverImage: wood1Hover
                    },
                    {
                        name: 'Black Oud',
                        path: '/product/black-oud',
                        image: wood2,
                        hoverImage: wood2Hover
                    },
                    {
                        name: 'Wild Fig',
                        path: '/product/wild-fig',
                        image: wood3,
                        hoverImage: wood3Hover
                    },
                    {
                        name: 'Sandalwood',
                        path: '/product/sandalwood',
                        image: wood4,
                        hoverImage: wood4Hover
                    },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: '/images/collections/oriental-luxe.png',
                path: '/collections/oriental-luxe',
                links: [
                    {
                        name: 'Tobacco Noir',
                        path: '/product/tobacco-noir',
                        image: oriental1,
                        hoverImage: oriental1Hover
                    },
                    {
                        name: 'Amber Luxe',
                        path: '/product/amber-luxe',
                        image: oriental2,
                        hoverImage: oriental2Hover
                    },
                    {
                        name: 'Cedar Carves',
                        path: '/product/cedar-carves',
                        image: oriental3,
                        hoverImage: oriental3Hover
                    },
                    {
                        name: 'Myrrh & Tonka',
                        path: '/product/myrrh-tonka',
                        image: oriental4,
                        hoverImage: oriental4Hover
                    },
                    {
                        name: 'Pomegranate Elixir',
                        path: '/product/pomegranate-elixir',
                        image: oriental5,
                        hoverImage: oriental5Hover
                    },
                    {
                        name: "Lover's Rush",
                        path: '/product/lovers-rush',
                        image: oriental6,
                        hoverImage: oriental6Hover
                    },
                    {
                        name: 'Blackberry Blissin',
                        path: '/product/blackberry-blissin',
                        image: oriental7,
                        hoverImage: oriental7Hover
                    },
                ]
            },
            {
                title: 'Gourmet Indulgence Collection',
                image: '/images/collections/gourmet-indulgence.png',
                path: '/collections/gourmet-indulgence',
                links: [
                    {
                        name: 'Crème de Latte',
                        path: '/product/creme-de-latte',
                        image: gourmet1,
                        hoverImage: gourmet1Hover
                    },
                    {
                        name: 'Marshmallow Cheesecake',
                        path: '/product/marshmallow-cheesecake',
                        image: gourmet2,
                        hoverImage: gourmet2Hover
                    },
                    {
                        name: 'Buttercotch',
                        path: '/product/buttercotch',
                        image: gourmet3,
                        hoverImage: gourmet3Hover
                    },
                    {
                        name: 'Sugar Vanilla',
                        path: '/product/sugar-vanilla',
                        image: gourmet4,
                        hoverImage: gourmet4Hover
                    },
                    {
                        name: 'Peach Bellini',
                        path: '/product/peach-bellini',
                        image: gourmet5,
                        hoverImage: gourmet5Hover
                    },
                    {
                        name: 'Piña Colada',
                        path: '/product/pina-colada',
                        image: gourmet6,
                        hoverImage: gourmet6Hover
                    },
                    {
                        name: 'Champagne Cocktail',
                        path: '/product/champagne-cocktail',
                        image: gourmet7,
                        hoverImage: gourmet7Hover
                    },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: '/images/collections/fresh-whisper.png',
                path: '/collections/fresh-whisper',
                links: [

                    {
                        name: 'Sage & Sea Salt',
                        path: '/product/sage-sea-salt',
                        image: fresh1,
                        hoverImage: fresh1Hover
                    },
                    {
                        name: 'Peppermint',
                        path: '/product/peppermint',
                        image: fresh2,
                        hoverImage: fresh2Hover
                    },
                    {
                        name: 'Lemongrass Eclat',
                        path: '/product/lemongrass-eclat',
                        image: fresh3,
                        hoverImage: fresh3Hover
                    },
                    {
                        name: 'White Tea',
                        path: '/product/white-tea',
                        image: fresh4,
                        hoverImage: fresh4Hover
                    },
                    {
                        name: 'Lemon and Lime',
                        path: '/product/lemon-lime',
                        image: fresh5,
                        hoverImage: fresh5Hover
                    },
                    {
                        name: 'Frosted Apple',
                        path: '/product/frosted-apple',
                        image: fresh6,
                        hoverImage: fresh6Hover
                    },
                    {
                        name: 'Sweet Bergamot',
                        path: '/product/sweet-bergamot',
                        image: fresh7,
                        hoverImage: fresh7Hover
                    },
                ]
            }
        ]
    },
    {
        id: 'diffusers',
        name: 'Diffusers',
        path: '/diffusers',
        sections: [
            {
                title: 'Reed Diffusers',
                image: '/images/collections/reed-diffusers.png',
                path: '/diffusers',
                links: [
                    { name: 'All Diffusers', path: '/diffusers' },
                    { name: 'Refills', path: '/diffusers/refills' },
                    { name: 'Sticks & Accessories', path: '/diffusers/accessories' },
                ]
            },
            {
                title: 'Popular Scents',
                image: '/images/collections/diffuser-scents.png',
                path: '/diffusers?filter=popular',
                links: [
                    { name: 'Ocean Breeze', path: '/diffusers/ocean' },
                    { name: 'Lavender Mist', path: '/diffusers/lavender' },
                    { name: 'Vanilla Bean', path: '/diffusers/vanilla' },
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
                title: 'Pure Oils',
                image: '/images/collections/pure-oils.png',
                path: '/essential-oils/single',
                links: [
                    { name: 'Single Notes', path: '/essential-oils/single' },
                    { name: 'Blends', path: '/essential-oils/blends' },
                    { name: 'Roll-ons', path: '/essential-oils/roll-ons' },
                ]
            },
            {
                title: 'Shop By Mood',
                image: '/images/collections/mood-oils.png',
                path: '/shop?mood=relax',
                links: [
                    { name: 'Relaxation', path: '/shop?mood=relax' },
                    { name: 'Energy', path: '/shop?mood=energy' },
                    { name: 'Focus', path: '/shop?mood=focus' },
                ]
            }
        ]
    },
    {
        id: 'air',
        name: 'Air Fresheners',
        path: '/air-freshners',
    },
    {
        id: 'bath',
        name: 'Bath & Body',
        path: '/bath-body',
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