import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ProductCard from "../components/product/ProductCard";
import Grid from "@mui/material/Grid";

export type ProductItemType = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  brand: string;
  weight?: number;
  options?: {
    color?: string[];
    quantity?: number;
    storage?: string[];
    power: number[];
  }[];
};

const List = () => {
  const [items, setItems] = useState<ProductItemType[]>([]);
  const [cartItems, setCartItems] = useState<ProductItemType[]>([]);

  const getItems = () => {
    fetch("products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((products) => setItems(products.items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {items.map((item) => (
          <Grid key={item.id} item xs={4}>
            <ProductCard key={item.id} item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default List;
