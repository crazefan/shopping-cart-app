import { CartItemType } from "../App";
import { Button } from "@mui/material";

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
      <h2>Your Shopping Cart</h2>
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
      ))}
      <h2>Total: NOK {calculateTotal(cartItems).toFixed(2)}</h2>
    </>
  );
};

export default Checkout;
