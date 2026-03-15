import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { useInventory } from '../hooks/useInventory';
import { navigationData } from '../data/navigation';
import { ProductImages } from '@/types';

export const ProductPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const { getProductBySlug } = useInventory();
    
    const baseProduct = slug ? getProductBySlug(slug) : null;

    if (!slug || !baseProduct) {
        return <div className="pt-32 text-center text-gray-500">Product not found.</div>;
    }

    // 1. Try to get images from router state (passed from ShopProductCard)
    const state = location.state as { passedImages?: ProductImages } | null;
    let productWithImages = { ...baseProduct };

    if (state?.passedImages) {
        productWithImages.images = state.passedImages;
    } else {
        // 2. Fallback: Dynamically patch images if found in navigationData
        for (const navItem of navigationData) {
            if (navItem.sections) {
                for (const section of navItem.sections) {
                    const link = section.links.find(l => l.path.endsWith(slug));
                    if (link) {
                        productWithImages = {
                            ...baseProduct,
                            images: {
                                ...baseProduct.images,
                                default: link.image || baseProduct.images.default,
                                gallery: (baseProduct.category === 'Candle' || baseProduct.id.startsWith('p-new-'))
                                    ? []
                                    : link.hoverImage
                                        ? [link.hoverImage, ...baseProduct.images.gallery.filter(i => i !== link.hoverImage)]
                                        : baseProduct.images.gallery
                            }
                        };
                        break;
                    }
                }
            }
        }
    }

    return (
        <div className="pt-16 bg-black min-h-screen">
            <ProductDetail key={productWithImages.id} product={productWithImages} />
        </div>
    );
};
