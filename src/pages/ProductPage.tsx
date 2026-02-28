import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { useInventory } from '../hooks/useInventory';
import { navigationData } from '../data/navigation';

export const ProductPage = () => {
    const { slug } = useParams();
    const { getProductBySlug } = useInventory();
    const baseProduct = slug ? getProductBySlug(slug) : null;

    if (!slug) return <div className="pt-32 text-center text-gray-500">Product not found.</div>;
    if (!baseProduct) return <div className="pt-32 text-center text-gray-500">Product not found.</div>;

    // Dynamically patch images if found in navigationData (Diffusers & Oils use this pattern)
    let productWithImages = { ...baseProduct };

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
                            gallery: link.hoverImage
                                ? [link.hoverImage, ...baseProduct.images.gallery.filter(i => i !== link.hoverImage)]
                                : baseProduct.images.gallery
                        }
                    };
                    break;
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
