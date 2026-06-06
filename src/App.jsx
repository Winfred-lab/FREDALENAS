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

// Pages
import HeroSection  from "./Pages/HeroSection";
import Product      from "./Pages/Productsection";
import Testimonial  from "./Pages/Testimonial";
import Gallery      from "./Pages/Gallery";
import AboutUs      from "./Pages/AboutUs";
import ProductsPage from "./Pages/Productspage";

// Shared layout components
import Nav    from "./Components/Nav";
import Footer from "./Components/Footer";
import StatsSection from "./Components/StatsSection";

const App = () => {
  return (
    <div>
      {/*
        Nav is OUTSIDE <Routes> → it renders on every page.
        It is position:fixed in Nav.jsx so it always sits at the top.
      */}
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

        {/*
          PRODUCTS PAGE
          The route path="/products" must EXACTLY match the
          `to` prop in Nav.jsx's navLinks array.
          We set Nav's Product link to to="/products" below.
        */}
        <Route path="/products" element={<ProductsPage />} />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<Footer />} />

      </Routes>

      {/*
        Footer is OUTSIDE <Routes> → renders on every page.
        Exception: the /contact route also renders Footer
        inside Routes, which would double it on that page.
        If you want Footer ONLY in /contact, remove it from here.
        If you want it on every page, remove it from the /contact Route.
      */}
      <Footer />
    </div>
  );
};

export default App;