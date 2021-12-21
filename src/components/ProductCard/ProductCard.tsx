import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import ProductOptions from "../ProductDetails/ProductDetails";
import StockChip from "../StockChip/StockChip";

import { ProductItemType, CartItemType } from "../../App";

type Props = {
  item: ProductItemType;
  addToCart: (item: CartItemType) => void;
};

const ProductCard = ({ item, addToCart }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Card sx={{ width: 250 }}>
        <CardMedia
          component="img"
          height="180"
          image={`/static/assets/${item.id}.jpg`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Brand: {item.brand} <br />
          </Typography>
          <StockChip available={item.available} />
        </CardContent>

        <CardActions>
          <Grid container justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              size="small"
              disabled={!item.available}
              onClick={() => setDialogOpen(true)}
            >
              Buy now
            </Button>
            <Typography variant="body1" color="text.secondary">
              <b>NOK {item.price} </b>
            </Typography>
          </Grid>
        </CardActions>
      </Card>
      <ProductOptions
        open={dialogOpen}
        handleClose={handleClose}
        item={item}
        addToCart={addToCart}
      />
    </>
  );
};

export default ProductCard;
