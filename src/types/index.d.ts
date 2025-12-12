export interface ProductVariant {
  id: string;
  label: string; // e.g. "Small", "Classic", "Luxe"
  sizeMl?: string; // e.g. "100ml"
  sizeLabel?: string; // e.g. "Petite"
  multiplier: number; // e.g. 1.0, 1.5 - multiplier of base price or explicit? User says "base price + size multiplier + color/finish delta". Actually "Product model ... variants ... multiplier, priceGHS". I'll store explicit priceGHS for simplicity or use logic.
  priceGHS: number;
}

export interface ColorVariant {
  colorId: string;
  label: string;
  image: string; // URL
  priceDelta?: number; // Extra cost for this finish
}

export interface ProductImages {
  default: string;
  gallery: string[];
  colorVariants: ColorVariant[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  images: ProductImages;
  variants: ProductVariant[];
  scents: string[];
  materials?: string; // For burners
  burnTime?: string; // For candles
  weight?: string;
  stock: number;
  featured: boolean;
  basePrice: number; // Base price before variants (if needed) or just use variant price
}

export interface CartItem {
  productId: string;
  variantId: string;
  colorId?: string; // if applicable
  scent?: string;
  quantity: number;
  price: number; // Cached unit price at add time
  productTitle: string;
  variantLabel: string;
  colorLabel?: string;
  image: string;
}

export interface UserContact {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  contact: UserContact;
  date: string;
  status: 'pending' | 'paid' | 'shipped';
  paymentMethod: string;
}
