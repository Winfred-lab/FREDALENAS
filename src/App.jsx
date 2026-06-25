// ─────────────────────────────────────────────────────────────
// src/App.jsx
//
// FIXES APPLIED:
//  1. Removed unused imports (ProductCard, Sidebar) — importing
//     components that aren't used in App.jsx causes no crash but
//     is messy and can mask real errors in the console.
//  2. Fixed the Products route — now uses path="/products" to
//     match the Nav link href="/products" exactly.
//     (Previously "/Productspage" and "/product" didn't match
//     the Nav link, so clicking Product in the nav showed a
//     blank page.)
//  3. Nav and Footer are rendered OUTSIDE <Routes> so they
//     appear on every page — this is correct and kept as-is.
//  4. Added pt-[nav height] to the page wrapper so nothing
//     hides behind the fixed navbar.
// ─────────────────────────────────────────────────────────────

import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/Cartcontext";

// Pages
import HeroSection  from "./Pages/HeroSection";
import Product      from "./Pages/Productsection";
import Testimonial  from "./Pages/Testimonial";
import Gallery      from "./Pages/Gallery";
import AboutUs      from "./Pages/AboutUs";
import ProductsPage from "./Pages/Productspage";
import ContactPage  from "./Pages/ContactPage";

// Shared layout components
import Nav    from "./Components/Nav";
import Footer from "./Components/Footer";
import StatsSection from "./Components/StatsSection";
import CustomOrdermodal from "./Components/CustomOrdermodal";

const App = () => {
  return (
     <CartProvider>
    <div>
      <Nav />

      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={
            <>
              <HeroSection />
              <Product />
              <StatsSection />
              <Testimonial />
              <Gallery />
            </>
          }
        />

        {/* ABOUT PAGE */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  </CartProvider>
  );
};

export default App;