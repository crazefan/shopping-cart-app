import { CartItemType } from "../App";
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number, variant: string) => void;
};

const Checkout = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <>
      {/* <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item, i) => (
        <div key={i}>
          <h3>{item.name}</h3>
          <div className="information">
            <p>Price: ${item.price}</p>
            <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          </div>
          <div className="buttons">
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => removeFromCart(item.id, item.variant)}
            >
              -
            </Button>
            <p>{item.amount}</p>
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => addToCart(item)}
            >
              +
            </Button>
          </div>
        </div>
      ))} */}

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
