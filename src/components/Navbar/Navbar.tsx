import { Grid, AppBar, Container } from "@mui/material";

import HomeIcon from "../HomeIcon/HomeIcon";
import CartIcon from "../CartIcon/CartIcon";

type Props = {
  count: number;
};

const Navbar = ({ count }: Props) => {
  return (
    <AppBar position="static">
      <Container maxWidth={"xs"}>
        <Grid container justifyContent="space-around" alignItems="center">
          <HomeIcon />
          <CartIcon count={count} />
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Navbar;
