import Grid from "@mui/material/Grid";

import ProductCard from "../components/ProductCard/ProductCard";

import { ProductItemType, CartItemType } from "../App";

type Props = {
  items: ProductItemType[];
  addToCart: (item: CartItemType) => void;
};

const List = ({ items, addToCart }: Props) => {
  return (
    <>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Grid
          container
          item
          md={10}
          lg={8}
          spacing={4}
          sx={{ m: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          {items.map((item) => (
            <Grid key={item.id} item md={5} lg={3}>
              <ProductCard key={item.id} item={item} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default List;
