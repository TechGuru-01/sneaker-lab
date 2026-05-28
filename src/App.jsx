import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { PRODUCTS } from "./data";

import { SplashScreen } from "./components/splash/SplashScreen";
import { ToastNotification } from "./components/toast/ToastNotification";
import { Header } from "./components/navbar/Header";
import { Footer } from "./components/footer/Footer";

import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import  ProductDetail  from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import SignUp from "./pages/SignUp";

import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import StockDirectory from "./pages/StockDirectory";
import OrdersMetrics from "./pages/OrdersMetrics";
import AdminProductDetails from "./pages/AdminProductDetails";
import NewUpload from "./pages/NewUpload";
import CustomersSegment from "./pages/CustomersSegment";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [redirectTarget, setRedirectTarget] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("lab-01-phantom");

  const [adminView, setAdminView] = useState("OVERVIEW");
  const [editingProduct, setEditingProduct] = useState(null);

  // 💡 STATE PARA SA USER ROLE (Kargahan natin ng state check mula sa storage)
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("userRole") === "admin";
  });

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

  // Listener para ma-detect kung nagbago ang login state o kung nag-logout (Para mag-update agad ang UI)
  useEffect(() => {
    const checkAuth = () => {
      setIsAdmin(localStorage.getItem("userRole") === "admin");
    };

    // I-run sa tuwing magbabago ang active page
    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [activePage]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    const authorizedPages = [
      "signup",
      "home",
      "collections",
      "pdp",
      "admin",
      "profile",
      "orders",
      "favourites",
      "accountSettings",
    ];

    // 💡 PROTECTED ROUTE CHECK FOR ADMIN
    // Kung sinusubukang pumasok sa admin page pero hindi naman admin, itapon pabalik sa home o signup
    if (activePage === "admin" && !isAdmin) {
      triggerNotification("Access Denied: Administrative privileges required.");
      setActivePage("home");
      return;
    }

    if (!isLoggedIn && !authorizedPages.includes(activePage)) {
      setRedirectTarget(activePage);
      setActivePage("signup");
    }
  }, [activePage, isAdmin]);

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

  const handleAdminProductNavigate = (id) => {
    setSelectedProductId(id);
    setAdminView("PRODUCT_DETAIL");
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

  //  FIXED: Palitan ang searchQuery("") ng setSearchQuery("") para mawala ang TypeError
  useEffect(() => {
    if (searchQuery === " ") {
      setSearchQuery("");
    }
  }, [searchQuery]);

  // 💡 Double security: Dapat adminPage at totoong isAdmin bago mag-true ito
  const isAdminView = activePage === "admin" && isAdmin;

  const activeAdminProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-accent selection:text-white flex flex-col font-sans transition-colors duration-200">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <ToastNotification
        message={notification}
        onClose={() => setNotification(null)}
      />

      {!isAdminView && (
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
          isAdmin={isAdmin} // 💡 IPINASA ANG ADMIN STATUS DITO
        />
      )}

      {isAdminView ? (
        <div className="flex min-h-screen w-full bg-[#131313] text-[#e5e2e1]">
          <aside className="fixed left-0 top-0 h-full flex flex-col pt-8 pb-8 z-30 w-64 bg-[#0e0e0e] border-r border-[#4c4546]/30 hidden lg:flex font-mono text-[10px] tracking-widest">
            <div className="px-6 mb-8 select-none">
              <div className="flex items-center gap-2 font-display text-white italic font-bold text-sm">
                <span className="material-symbols-outlined text-[#3368ff] text-base">
                  dashboard_customize
                </span>
                SNEAKER LAB ADMIN
              </div>
              <p className="text-[#3368ff] font-semibold text-[8px] tracking-widest mt-1 uppercase">
                v4.02 MANAGEMENT GRID
              </p>
            </div>

            <nav className="flex-grow flex flex-col gap-1">
              <button
                onClick={() => setAdminView("OVERVIEW")}
                className={`flex items-center gap-4 px-6 py-4 text-left uppercase transition-colors ${adminView === "OVERVIEW" ? "text-white bg-[#20201f] border-l-4 border-[#3368ff] font-bold" : "text-[#cfc4c5] hover:bg-[#1c1b1b]"}`}
              >
                <span className="material-symbols-outlined text-base">
                  dashboard
                </span>
                <span>OVERVIEW</span>
              </button>

              <button
                onClick={() => setAdminView("INVENTORY")}
                className={`flex items-center gap-4 px-6 py-4 text-left uppercase transition-colors ${adminView === "INVENTORY" || adminView === "UPLOAD" ? "text-white bg-[#20201f] border-l-4 border-[#3368ff] font-bold" : "text-[#cfc4c5] hover:bg-[#1c1b1b]"}`}
              >
                <span className="material-symbols-outlined text-base">
                  inventory_2
                </span>
                <span>INVENTORY</span>
              </button>

              <button
                onClick={() => setAdminView("ORDERS")}
                className={`flex items-center gap-4 px-6 py-4 text-left uppercase transition-colors ${adminView === "ORDERS" ? "text-white bg-[#20201f] border-l-4 border-[#3368ff] font-bold" : "text-[#cfc4c5] hover:bg-[#1c1b1b]"}`}
              >
                <span className="material-symbols-outlined text-base">
                  shopping_cart
                </span>
                <span>ORDERS</span>
              </button>

              <button
                onClick={() => setAdminView("CUSTOMERS")}
                className={`flex items-center gap-4 px-6 py-4 text-left uppercase transition-colors ${adminView === "CUSTOMERS" ? "text-white bg-[#20201f] border-l-4 border-[#3368ff] font-bold" : "text-[#cfc4c5] hover:bg-[#1c1b1b]"}`}
              >
                <span className="material-symbols-outlined text-base">
                  group
                </span>
                <span>CUSTOMERS</span>
              </button>

              <div className="border-t border-[#2e2e2e]/40 my-4 mx-4"></div>

              <button
                onClick={() => {
                  setActivePage("home");
                  setAdminView("OVERVIEW");
                }}
                className="flex items-center gap-4 px-6 py-4 text-[#cfc4c5] hover:bg-[#1c1b1b] hover:text-white text-left uppercase"
              >
                <span className="material-symbols-outlined text-base">
                  store
                </span>
                <span>LIVE STOREFRONT</span>
              </button>
            </nav>

            <div className="mt-auto border-t border-[#2e2e2e]/50 pt-4 text-[9px]">
              <a
                onClick={() => {
                  setActivePage("home");
                  setAdminView("OVERVIEW");
                }}
                className="flex items-center gap-4 text-[#cfc4c5] hover:text-[#ffb4ab] px-6 py-3 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">
                  logout
                </span>
                <span>Exit Admin Mode</span>
              </a>
            </div>
          </aside>

          <main className="lg:pl-64 w-full min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-10">
              <AnimatePresence mode="wait">
                {adminView === "OVERVIEW" && (
                  <ExecutiveDashboard
                    setActivePage={setActivePage}
                    products={PRODUCTS}
                    onNavigateToProduct={handleAdminProductNavigate}
                  />
                )}

                {adminView === "INVENTORY" && (
                  <StockDirectory
                    products={PRODUCTS}
                    onAddProductClick={() => {
                      setEditingProduct(null);
                      setAdminView("UPLOAD");
                    }}
                    onNavigateToProduct={handleAdminProductNavigate}
                    onEditProduct={(prod) => {
                      setEditingProduct(prod);
                      setAdminView("UPLOAD");
                    }}
                    onDeleteProduct={(id) =>
                      alert(`Removal request for item ID: ${id}`)
                    }
                  />
                )}

                {adminView === "ORDERS" && (
                  <OrdersMetrics
                    orders={[]}
                    onStatusChange={(id, status) => console.log(id, status)}
                  />
                )}

                {adminView === "CUSTOMERS" && <CustomersSegment />}

                {adminView === "UPLOAD" && (
                  <NewUpload
                    editingProduct={editingProduct}
                    onCancel={() => setAdminView("INVENTORY")}
                    onCommit={(committed) => {
                      console.log(committed);
                      setAdminView("INVENTORY");
                    }}
                  />
                )}

                {adminView === "PRODUCT_DETAIL" && (
                  <AdminProductDetails
                    product={activeAdminProduct}
                    onBackToInventory={() => setAdminView("INVENTORY")}
                  />
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      ) : (
        <main
          className={`flex-grow transition-all duration-300 ${activePage === "home" ? "pt-0" : isScrolled ? "pt-16" : "pt-20"}`}
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
      )}

      {!isAdminView && <Footer onTriggerNotification={triggerNotification} />}
    </div>
  );
}
