import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
    useEffect(() => {
        // Set Title
        document.title = `${title} | Scented by DDSD`;

        // Helper to update meta
        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name = "${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateOg = (property: string, content: string) => {
            let element = document.querySelector(`meta[property = "${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        }

        if (description) {
            updateMeta('description', description);
            updateOg('og:description', description);
        }

        updateOg('og:title', title);
        if (image) updateOg('og:image', image);
        if (url) updateOg('og:url', url);

    }, [title, description, image, url]);

    return null;
};
