import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { EmptyCart } from "../components/cart/EmptyCart.jsx";
import { CartItemRow } from "../components/cart/CartItemRow.jsx";
import { CartSummary } from "../components/cart/CartSummary.jsx";
import { CartRecommendations } from "../components/cart/CartRecommendation.jsx";

export const Cart = ({
  cart,
  setCart,
  updateCartQty,
  removeCartItem,
  navigateToPdp,
  onTriggerNotification,
  setFilters,
  setActivePage,
}) => {
  const [checkoutZip, setCheckoutZip] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [isZipCalculated, setIsZipCalculated] = useState(false);

  // Computed Values
  const cartSubtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cart]);

  const estimatedTax = useMemo(() => {
    return cartSubtotal * 0.08;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + estimatedTax + shippingCost;
  }, [cartSubtotal, estimatedTax, shippingCost]);

  const handleZipCalculate = (e) => {
    e.preventDefault();
    if (!checkoutZip.trim()) return;
    setIsZipCalculated(true);
    setShippingCost(0);
    onTriggerNotification(
      `Zip code ${checkoutZip} validated. Free Premium Shipping applied.`,
    );
  };

  // 🌟 ONLINE LOGIC: INTERCEPT CHECKOUT IF NOT LOGGED IN
  const handleCheckout = async () => {
    try {
      // Tinatawag ang port 5000 at ang bagong /api/cart/checkout endpoint
      const response = await fetch("http://localhost:5000/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 Crucial para sumama ang session cookie mula sa browser/PostgreSQL storage
      });

      if (response.status === 401) {
        // TAMA: Kapag hindi pa authenticated ang session, lipat sa signup route
        onTriggerNotification(
          "Mangyaring mag-register o mag-login muna para makapag-checkout.",
        );
        setActivePage("signup");
      } else if (response.ok) {
        const data = await response.json();
        onTriggerNotification(
          `Welcome back! Inihahanda na ang iyong checkout session.`,
        );

        // Dito mo pwedeng ituloy si user sa shipping form o checkout page
        setActivePage("shipping-details");
      } else {
        onTriggerNotification(
          "May hindi inaasahang error sa server. Pakisubukan muli.",
        );
      }
    } catch (error) {
      console.error("[CHECKOUT_ROUTE_ERROR]:", error);
      onTriggerNotification("Hindi makakonekta sa server ngayon.");
    }
  };

  return (
    <motion.div
      key="cart"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 md:px-16 py-12 text-left"
    >
      {/* Page Header */}
      <div className="mb-12 border-l-4 border-brand-accent pl-6">
        <h1 className="text-4xl md:text-6xl font-syne font-extrabold text-white leading-none uppercase tracking-tighter">
          CART
        </h1>
        <p className="font-mono text-[10px] tracking-widest text-brand-lightgrey/50 uppercase font-bold mt-1.5">
          TECHNICAL ARCHIVE // 0{cart.length} ITEMS
        </p>
      </div>

      {cart.length === 0 ? (
        <EmptyCart setFilters={setFilters} setActivePage={setActivePage} />
      ) : (
        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Active Cart Line Items Grid */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                updateCartQty={updateCartQty}
                removeCartItem={removeCartItem}
              />
            ))}
          </div>

          {/* Checkout Summary Lateral Block */}
          <CartSummary
            checkoutZip={checkoutZip}
            setCheckoutZip={setCheckoutZip}
            isZipCalculated={isZipCalculated}
            handleZipCalculate={handleZipCalculate}
            cartSubtotal={cartSubtotal}
            estimatedTax={estimatedTax}
            cartTotal={cartTotal}
            onTriggerNotification={onTriggerNotification}
            setCart={setCart}
            handleCheckout={handleCheckout} // 🌟 Ipinasa rito ang interception handler
          />
        </div>
      )}

      {/* Recommendations & Bottom Promotion Section */}
      <CartRecommendations
        navigateToPdp={navigateToPdp}
        setFilters={setFilters}
        setActivePage={setActivePage}
        onTriggerNotification={onTriggerNotification}
      />
    </motion.div>
  );
};
