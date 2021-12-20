import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

const CartIcon = () => {
  return (
    <>
      <IconButton aria-label="cart">
        <Typography variant="h6" color="white">
          Home &nbsp;
        </Typography>

        <HomeIcon sx={{ color: "white" }} />
      </IconButton>
    </>
  );
};

export default CartIcon;
