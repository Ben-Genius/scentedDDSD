import React, { useMemo } from 'react';
import { products } from '@/data/products';
import { navigationData, NavSection } from '@/data/navigation';
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { Link, useParams } from 'react-router-dom';
import { useLocalCart } from '@/hooks/useLocalCart';
import toast from 'react-hot-toast';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collectionSlug = slug || ''; // Handle potential undefined
  const addItem = useLocalCart((state) => state.addItem);

  // 1. Find the Collection Data from Navigation
  const collectionData = useMemo(() => {
    // Recursive search or flat map search
    let foundSection: NavSection | null = null;

    // Traverse navigationData
    for (const item of navigationData) {
      if (item.sections) {
        for (const section of item.sections) {
          // Check if path includes our slug
          if (section.path && section.path.includes(collectionSlug)) {
            foundSection = section;
            break;
          }
        }
      }
      if (foundSection) break;
    }
    return foundSection;
  }, [collectionSlug]);

  // 2. Filter Products based on the links in this collection
  // 2. Filter and Customize Products based on the links in this collection
  const collectionProducts = useMemo(() => {
    if (!collectionData) return [];

    return collectionData.links
      .map((link) => {
        // Extract slug from path like '/product/royal-rose-bloom' -> 'royal-rose-bloom'
        const parts = link.path.split('/');
        const slug = parts[parts.length - 1];

        // Find matching product
        const originalProduct = products.find((p) => p.slug === slug);

        if (!originalProduct) return null;

        // If navigation link has specific images, override the product images
        if (link.image || link.hoverImage) {
          return {
            ...originalProduct,
            images: {
              ...originalProduct.images,
              default: link.image || originalProduct.images.default,
              gallery: link.hoverImage
                ? [link.hoverImage, ...originalProduct.images.gallery.filter(img => img !== link.hoverImage)]
                : originalProduct.images.gallery
            }
          };
        }

        return originalProduct;
      })
      .filter((p): p is (typeof products)[0] => p !== null);
  }, [collectionData]);

  if (!collectionData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-playfair mb-4">Collection Not Found</h2>
        <Link to="/accessories" className="text-sm underline uppercase tracking-widest">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffcf8] min-h-screen pb-12 pt-16 md:pt-14">
      {' '}
      {/* pt added to clear fixed header */}
      <div className=" mx-auto px-6 md:px-12 max-w-[110rem]">
        {/* Breadcrumbs */}
        <div className="flex justify-center md:justify-start mb-12">
          <div className="text-[10px] uppercase tracking-widest text-black/40 flex items-center space-x-2">
            <Link to="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <Link to="/accessories" className="hover:text-black">
              Shop
            </Link>
            <span>/</span>
            <span className="text-black">{collectionData.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-black font-medium">
            {collectionData.title}
          </h1>
          {/* Placeholder description if none exists in data (we can add a 'description' field to NavSection later) */}
          <p className="font-inter text-sm md:text-base text-black/70 leading-relaxed font-light max-w-xl mx-auto">
            Discover the essence of our {collectionData.title}. A curated selection of our finest
            fragrances, designed to transform your space into a sanctuary of elegance and warmth.
          </p>
        </div>

        {/* Product Grid */}
        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {collectionProducts.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                onQuickAdd={() => {
                  if (product.variants.length > 0) {
                    addItem(product, product.variants[0]);
                    toast.success(`Added ${product.title} to cart`);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 border border-black/5">
            <p className="text-black/40 font-playfair italic">
              No products found in this collection.
            </p>
            <p className="text-xs text-black/30 mt-2">(Slugs might not match)</p>
          </div>
        )}
      </div>
    </div>
  );
};
