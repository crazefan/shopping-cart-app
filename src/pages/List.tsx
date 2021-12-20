import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";

import ProductCard from "../components/ProductCard/ProductCard";
import CartIcon from "../components/CartIcon/CartIcon";
import HomeIcon from "../components/HomeIcon/HomeIcon";

import { fetchItems as apiFetchItems } from "../api/items";

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

export type CartItemType = ProductItemType & { amount: number };

const List = () => {
  const [items, setItems] = useState<ProductItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const fetchItems = async () => setItems(await apiFetchItems());

  const handleAddToCart = (cartItem: ProductItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === cartItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === cartItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...cartItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = () =>
    cartItems.reduce((ack: number, item) => ack + item.amount, 0);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth={"xs"}>
          <Grid container justifyContent="space-around" alignItems="center">
            <HomeIcon />
            <CartIcon count={getTotalItems()} setCartOpen={setCartOpen} />
          </Grid>
        </Container>
      </AppBar>

      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={10}
          lg={8}
          spacing={4}
          sx={{ m: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          {items.map((item) => (
            <Grid key={item.id} item xs={12} md={5} lg={3}>
              <ProductCard
                key={item.id}
                item={item}
                addToCart={handleAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default List;
