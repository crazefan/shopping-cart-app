import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartIcon = () => {
  return (
    <IconButton aria-label="cart">
      <Badge badgeContent={4} color="secondary">
        {/* <ShoppingCartIcon /> */}
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
