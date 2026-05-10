"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  cartItemId: string;
  productId: number;
  name: string;
  image?: string;
  basePrice: number;
  spicyLevel: number;
  toppings: { toppings_id: number; name: string; price: string }[];
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean; // Trạng thái đóng/mở giỏ hàng
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void; // Hàm đổi số lượng
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: Omit<CartItem, "cartItemId">) => {
    setCartItems((prev) => {
      const toppingIds = newItem.toppings
        .map((t) => t.toppings_id)
        .sort()
        .join("-");
      const uniqueId = `${newItem.productId}-spicy${newItem.spicyLevel}-tops${toppingIds}`;
      const existingItemIndex = prev.findIndex(
        (item) => item.cartItemId === uniqueId,
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        updatedCart[existingItemIndex].totalPrice =
          (updatedCart[existingItemIndex].basePrice +
            updatedCart[existingItemIndex].toppings.reduce(
              (sum, t) => sum + parseInt(t.price),
              0,
            )) *
          updatedCart[existingItemIndex].quantity;
        return updatedCart;
      }
      return [...prev, { ...newItem, cartItemId: uniqueId }];
    });
    openCart(); // Tự động mở giỏ hàng khi thêm món mới
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const itemUnitPrice =
            item.basePrice +
            item.toppings.reduce((sum, t) => sum + parseInt(t.price), 0);
          return { ...item, quantity, totalPrice: itemUnitPrice * quantity };
        }
        return item;
      }),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được bọc trong CartProvider");
  return context;
};
