import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { PRODUCTS } from "./data";

import { SplashScreen } from "./components/SplashScreen";
import { ToastNotification } from "./components/ToastNotification";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import SignUp from "./pages/SignUp";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [redirectTarget, setRedirectTarget] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("lab-01-phantom");
  const [cart, setCart] = useState([
    {
      id: "vortex-runner-10.5",
      product: PRODUCTS.find((p) => p.id === "vortex-runner") || PRODUCTS[0],
      selectedSize: 10.5,
      quantity: 1,
    },
    {
      id: "tech-shell-jacket-8",
      product:
        PRODUCTS.find((p) => p.id === "tech-shell-jacket") || PRODUCTS[0],
      selectedSize: 8,
      quantity: 1,
    },
    {
      id: "velocity-r-9",
      product: PRODUCTS.find((p) => p.id === "velocity-r") || PRODUCTS[0],
      selectedSize: 9,
      quantity: 1,
    },
  ]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState(" ");

  const [filters, setFilters] = useState({
    category: "all",
    gender: "all",
    size: null,
    colorway: null,
    maxPrice: 850,
    sortBy: "NEWEST FIRST",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    const publicPages = ["signup", "home", "collections", "pdp"];

    if (!isLoggedIn && !publicPages.includes(activePage)) {
      setActivePage("signup");
    }
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const navigateToPdp = (id) => {
    setSelectedProductId(id);
    setActivePage("pdp");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const addToCart = (product, size) => {
    if (product.status === "OUT OF STOCK") {
      triggerNotification(`${product.name} is currently out of stock.`);
      return;
    }
    const cartId = `${product.id}-${size}`;
    const existing = cart.find((item) => item.id === cartId);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        { id: cartId, product, selectedSize: size, quantity: 1 },
      ]);
    }
    triggerNotification(`Added ${product.name} (US ${size}) to your bag.`);
  };

  const updateCartQty = (id, delta) => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      setRedirectTarget("cart");
      setActivePage("signup");
      return;
    }

    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeCartItem = (id, name) => {
    setCart(cart.filter((item) => item.id !== id));
    triggerNotification(`Removed ${name} from your bag.`);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    if (searchQuery === " ") {
      setSearchQuery("");
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-accent selection:text-white flex flex-col font-sans transition-colors duration-200">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <ToastNotification
        message={notification}
        onClose={() => setNotification(null)}
      />

      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isScrolled={isScrolled}
        cartCount={cartCount}
        onTriggerNotification={triggerNotification}
        setRedirectTarget={setRedirectTarget}
      />

      <main
        className={`flex-grow transition-all duration-300 ${
          activePage === "home" ? "pt-0" : isScrolled ? "pt-16" : "pt-20"
        }`}
      >
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <Home
              navigateToPdp={navigateToPdp}
              onTriggerNotification={triggerNotification}
              setFilters={setFilters}
              setActivePage={setActivePage}
            />
          )}

          {activePage === "collections" && (
            <Collections
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              navigateToPdp={navigateToPdp}
              onTriggerNotification={triggerNotification}
            />
          )}

          {activePage === "pdp" && (
            <ProductDetail
              selectedProductId={selectedProductId}
              navigateToPdp={navigateToPdp}
              addToCart={addToCart}
              onTriggerNotification={triggerNotification}
              setActivePage={setActivePage}
              setFilters={setFilters}
              filters={filters}
            />
          )}

          {activePage === "cart" && (
            <Cart
              cart={cart}
              setCart={setCart}
              updateCartQty={updateCartQty}
              removeCartItem={removeCartItem}
              navigateToPdp={navigateToPdp}
              onTriggerNotification={triggerNotification}
              setFilters={setFilters}
              filters={filters}
              setActivePage={setActivePage}
            />
          )}

          {activePage === "signup" && (
            <SignUp
              setActivePage={setActivePage}
              redirectTarget={redirectTarget}
              setRedirectTarget={setRedirectTarget}
            />
          )}

          {activePage === "profile" && (
            <div className="p-16 font-mono text-center">
              PROFILE_SECTOR // ACCESS_GRANTED
            </div>
          )}

          {activePage === "orders" && (
            <div className="p-16 font-mono text-center">
              ORDERS_SECTOR // ACCESS_GRANTED
            </div>
          )}

          {activePage === "favourites" && (
            <div className="p-16 font-mono text-center">
              FAVOURITES_SECTOR // ACCESS_GRANTED
            </div>
          )}

          {activePage === "accountSettings" && (
            <div className="p-16 font-mono text-center">
              SETTINGS_SECTOR // ACCESS_GRANTED
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer onTriggerNotification={triggerNotification} />
    </div>
  );
}
