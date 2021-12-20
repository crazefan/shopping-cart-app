import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type Props = {
  count: number;
  setCartOpen: (value: boolean) => void;
};

const CartIcon = ({ count, setCartOpen }: Props) => {
  return (
    <>
      <IconButton aria-label="cart" onClick={() => setCartOpen(true)}>
        <Typography variant="h6" color="white">
          Checkout &nbsp;
        </Typography>
        <Badge
          badgeContent={count}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "red",
            },
          }}
        >
          <ShoppingCartIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartIcon;
