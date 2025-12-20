import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home, Shop, ProductPage, Collections, Bundles, About, HowToOrder, Contact, BlogList, BlogPost, AdminInventory, Checkout } from '@/pages';
import { CartDrawer } from '@/components/CartDrawer';
import { useLocalCart } from '@/hooks/useLocalCart';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isDrawerOpen, closeDrawer } = useLocalCart();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-white flex flex-col font-inter selection:bg-gold selection:text-black">
      { location.pathname !== '/admin' &&
        <Header />}
      <main className="flex-grow relative z-10">
        {children}
      </main>
      { location.pathname !== '/admin' &&
        <Footer />}

      {/* Global Elements */}
      <CartDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      {/* Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || ''}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 md:hidden"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.575 1.901.889 3.259.891 3.193 0 5.763-2.586 5.763-5.766.001-3.18-2.575-5.774-6.216-5.774zm0 5h2.99l.01.05-.71.52c-.1.57-.46 2.4-1.4 2.94-.94.54-2.14.79-4.22-.19l-.5-.24c-.06-.03-.17-.11-.3-.2l-.63-.44a8.68 8.68 0 0 1-2.92-3.6c-.23-.62-.05-1.5.42-2.16l.48-.68c.2-.27.53-.29.74-.06.2.22.84 2.02.87 2.12.04.1.04.22-.04.38-.08.14-.14.23-.28.38-.13.15-.27.34-.39.46-.11.11-.23.23-.09.47.15.25.68 1.11 1.45 1.8.99.88 1.83 1.17 2.12 1.3.26.12.4.1.55-.06.14-.16.63-.73.79-1 .16-.25.33-.21.57-.12l1.77.83c.25.12.42.2.49.29.07.1.07.59-.2 1.36z"></path>
        </svg>
      </a>
    </div>
  );
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/bundles" element={<Bundles />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-to-order" element={<HowToOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/admin" element={<AdminInventory />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Layout>
  );
}

export default App;
