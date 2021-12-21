import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const HomeIconButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        aria-label="cart"
        onClick={() => navigate("/", { replace: true })}
      >
        <Typography variant="h6" color="white">
          Home &nbsp;
        </Typography>

        <HomeIcon sx={{ color: "white" }} />
      </IconButton>
    </>
  );
};

export default HomeIconButton;
