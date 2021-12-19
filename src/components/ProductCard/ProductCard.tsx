import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { ProductItemType } from "../../pages/List";

type Props = {
  item: ProductItemType;
  addToCart: (item: ProductItemType) => void;
};

const ProductCard = ({ item, addToCart }: Props) => {
  return (
    <Card sx={{ width: 250 }}>
      <Link to={`product/${item.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="180"
          image={`/static/assets/${item.id}.jpg`}
          alt="green iguana"
        />
      </Link>
      <CardContent>
        <Link to={`product/${item.id}`} style={{ textDecoration: "none" }}>
          <Typography gutterBottom variant="body1" component="div">
            {item.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Brand: {item.brand} <br />
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="body2"
            color={item.available ? "green" : "orange"}
          >
            <b>{item.available ? "In stock" : "Sold out"}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>NOK {item.price} </b>
          </Typography>
        </Grid>
      </CardContent>

      <CardActions>
        <Grid container justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            size="small"
            disabled={!item.available}
            onClick={() => addToCart(item)}
          >
            Add to cart
          </Button>
          <Link to={`product/${item.id}`} style={{ textDecoration: "none" }}>
            <Button size="small" onClick={() => addToCart(item)}>
              Learn more
            </Button>
          </Link>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
