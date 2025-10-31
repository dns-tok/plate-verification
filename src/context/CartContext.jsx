import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

// Load cart data from localStorage
const loadCartData = () => {
  try {
    const stored = localStorage.getItem("cartData");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load cart data:", error);
  }
  return { items: [], coupon: null, discount: 0 };
};

// Save cart data to localStorage
const saveCartData = (items, coupon, discount) => {
  try {
    localStorage.setItem(
      "cartData",
      JSON.stringify({ items, coupon, discount })
    );
  } catch (error) {
    console.error("Failed to save cart data:", error);
  }
};

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Load initial state from localStorage
  const { items, coupon, discount } = loadCartData();
  const [cartItems, setCartItems] = useState(items);
  const [appliedCoupon, setAppliedCoupon] = useState(coupon);
  const [couponDiscount, setCouponDiscount] = useState(discount);

  // Save to localStorage whenever cart state changes
  useEffect(() => {
    saveCartData(cartItems, appliedCoupon, couponDiscount);
  }, [cartItems, appliedCoupon, couponDiscount]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      return;
    }
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const increaseQuantity = (item) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };
  const removeFromCart = (item) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const value = {
    isCartOpen,
    openCart,
    closeCart,
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    setAppliedCoupon,
    couponDiscount,
    setCouponDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
