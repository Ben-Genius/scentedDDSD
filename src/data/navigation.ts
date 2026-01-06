export interface SubLink {
    name: string;
    path: string;
}

export interface NavSection {
    title: string;
    links: SubLink[];
    image?: string;
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
                image: '/images/collections/floral-romance.png', // Add your collection images here
                links: [
                    { name: 'Royal Rose Bloom', path: '/product/royal-rose-bloom' },
                    { name: 'Lavande de Minuit', path: '/product/lavande-de-minuit' },
                    { name: 'Jasmine', path: '/product/jasmine' },
                    { name: 'Golden Hang', path: '/product/golden-hang' },
                    { name: 'Lotus Veil', path: '/product/lotus-veil' },
                    { name: "Amour d'Orchidthat", path: '/product/amour-d-orchidthat' },
                ]
            },
            {
                title: 'Woody & Exotic Collection',
                image: '/images/collections/woody-exotic.png',
                links: [
                    { name: 'Velvet Rose & Oud', path: '/product/velvet-rose-oud' },
                    { name: 'Black Oud', path: '/product/black-oud' },
                    { name: 'Wild Fig', path: '/product/wild-fig' },
                    { name: 'Sandalwood', path: '/product/sandalwood' },
                ]
            },
            {
                title: 'Oriental Luxe Collection',
                image: '/images/collections/oriental-luxe.png',
                links: [
                    { name: 'Tobacco Noir', path: '/product/tobacco-noir' },
                    { name: 'Amber Luxe', path: '/product/amber-luxe' },
                    { name: 'Cedar Carves', path: '/product/cedar-carves' },
                    { name: 'Myrrh & Tonka', path: '/product/myrrh-tonka' },
                    { name: 'Pomegranate Elixir', path: '/product/pomegranate-elixir' },
                    { name: "Lover's Rush", path: '/product/lovers-rush' },
                    { name: 'Blackberry Blissin', path: '/product/blackberry-blissin' },
                ]
            },
            {
                title: 'Gourmet Indulgence Collection',
                image: '/images/collections/gourmet-indulgence.png',
                links: [
                    { name: 'Crème de Latte', path: '/product/creme-de-latte' },
                    { name: 'Marshmallow Cheesecake', path: '/product/marshmallow-cheesecake' },
                    { name: 'Buttercotch', path: '/product/buttercotch' },
                    { name: 'Sugar Vanilla', path: '/product/sugar-vanilla' },
                    { name: 'Peach Bellini', path: '/product/peach-bellini' },
                    { name: 'Piña Colada', path: '/product/pina-colada' },
                    { name: 'Champagne Cocktail', path: '/product/champagne-cocktail' },
                ]
            },
            {
                title: 'Fresh Whisper Collection',
                image: '/images/collections/fresh-whisper.png',
                links: [
                    { name: 'Sage & Sea Salt', path: '/product/sage-sea-salt' },
                    { name: 'Peppermint', path: '/product/peppermint' },
                    { name: 'Lemongrass Eclat', path: '/product/lemongrass-eclat' },
                    { name: 'White Tea', path: '/product/white-tea' },
                    { name: 'Lemon and Lime', path: '/product/lemon-lime' },
                    { name: 'Frosted Apple', path: '/product/frosted-apple' },
                    { name: 'Sweet Bergamot', path: '/product/sweet-bergamot' },
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
                links: [
                    { name: 'All Diffusers', path: '/diffusers' },
                    { name: 'Refills', path: '/diffusers/refills' },
                    { name: 'Sticks & Accessories', path: '/diffusers/accessories' },
                ]
            },
            {
                title: 'Popular Scents',
                image: '/images/collections/diffuser-scents.png',
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
                links: [
                    { name: 'Single Notes', path: '/essential-oils/single' },
                    { name: 'Blends', path: '/essential-oils/blends' },
                    { name: 'Roll-ons', path: '/essential-oils/roll-ons' },
                ]
            },
            {
                title: 'Shop By Mood',
                image: '/images/collections/mood-oils.png',
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