import { Badge, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";

type Props = {
  count: number;
};

const CartIcon = ({ count }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        aria-label="cart"
        onClick={() => navigate("checkout", { replace: true })}
      >
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
