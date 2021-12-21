import { CartItemType } from "../App";
import {
  Grid,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number, variant: string) => void;
};

const Checkout = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sx={{ my: 5 }}>
          <Typography align="center" variant="h5" sx={{ my: 1 }}>
            Your cart
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Option</TableCell>
                  <TableCell align="right" sx={{ minWidth: 200 }}>
                    Amount
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 200 }}>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      {item.variant
                        .split("-")
                        .map((option) => (option === "undefined" ? "" : option))
                        .join(" ")}
                    </TableCell>
                    <TableCell align="right">
                      <Grid container justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id, item.variant)}
                        >
                          <RemoveIcon color="primary" />
                        </IconButton>
                        <Typography align="center" sx={{ m: 1, minWidth: 20 }}>
                          <b>{item.amount}</b>
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => addToCart(item)}
                        >
                          <AddIcon color="primary" />
                        </IconButton>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      NOK {(item.amount * item.price).toFixed()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography align="right" variant="h5" sx={{ my: 1 }}>
            Total: NOK {calculateTotal(cartItems).toFixed()}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
