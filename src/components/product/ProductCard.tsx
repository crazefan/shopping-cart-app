import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ProductItemType } from "../../pages/List";

type Props = {
  item: ProductItemType;
};

const Product = ({ item }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`product/${item.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="140"
          image={`/static/assets/${item.id}.jpg`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Brand: </b> {item.brand} <br />
            <b>{item.available ? "In stock" : "Sold out"}</b>
          </Typography>
          <Typography variant="h6">NOK {item.price}</Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button size="small" disabled={item.available}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
