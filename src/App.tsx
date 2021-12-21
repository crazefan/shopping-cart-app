import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import List from "./pages/List";
import Checkout from "./pages/Checkout";

import { fetchItems as apiFetchItems } from "./api/items";

export type ProductItemType = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  brand: string;
  weight?: number;
  options: {
    color: string[] | string;
    quantity: number;
    storage?: string[];
    power?: number[];
    weight?: number[];
  }[];
};

export type CartItemType = ProductItemType & {
  amount: number;
  variant: string;
};

const App = () => {
  const [items, setItems] = useState<ProductItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const fetchItems = async () => setItems(await apiFetchItems());

  const handleAddToCart = (cartItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(
        (item) => item.id === cartItem.id && item.variant === cartItem.variant
      );
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === cartItem.id && item.variant === cartItem.variant
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...cartItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number, variant: string) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id && item.variant === variant) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = () =>
    cartItems.reduce((total: number, item) => total + item.amount, 0);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Navbar count={getTotalItems()} />
      <Routes>
        <Route
          path="checkout"
          element={
            <Checkout
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/"
          element={<List items={items} addToCart={handleAddToCart} />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
