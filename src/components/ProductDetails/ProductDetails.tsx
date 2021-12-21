import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Select,
  Dialog,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material/";
import StockChip from "../StockChip/StockChip";
import { ProductItemType, CartItemType } from "../../App";

type Props = {
  open: boolean;
  item: ProductItemType;
  handleClose: () => void;
  addToCart: (item: CartItemType) => void;
};

type OptionsType = {
  color: { value: string };
  storage?: { value: string };
  power?: { value: string };
};

const ProductDetails = ({ open, item, handleClose, addToCart }: Props) => {
  const [options, setOptions] = useState<OptionsType>({ color: { value: "" } });

  const handleColorChange = (e: any) => {
    setOptions((prev) => ({ ...prev, color: { value: e.target.value } }));
  };

  const handleAddClick = () => {
    const newItem = {
      ...item,
      variant: `${options.color.value}-${options.storage?.value}-${options.power?.value}`,
      amount: 0,
    };
    addToCart(newItem);
  };

  const getAvailableOptions = () => {
    if (item.options[0].storage)
      setOptions((prev) => ({ ...prev, storage: { value: "" } }));
    if (item.options[0].power)
      setOptions((prev) => ({ ...prev, power: { value: "" } }));
  };

  const getColorValue = (option: any) =>
    Array.isArray(option.color) ? option.color[0] : option.color;

  const getOptionsFromColor = () => {
    return item.options.find(
      (option) =>
        option.color === options.color.value ||
        option.color[0] === options.color.value
    );
  };

  useEffect(() => {
    getAvailableOptions();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Grid container justifyContent="center" sx={{ width: 350 }}>
          <Grid item>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogContent>
              <Grid container justifyContent="center">
                <img
                  src={`/static/assets/${item.id}.jpg`}
                  height="150px"
                  width="auto"
                />
              </Grid>
              <Typography variant="body2">
                <b>Brand:</b> {item.brand} <br></br>
                <b>Weight:</b> {item.weight} kg <br></br>
              </Typography>
              <StockChip available={item.available} />

              <Typography variant="body1">Choose variant:</Typography>

              <FormControl sx={{ my: 1, minWidth: 120 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  autoFocus
                  onChange={handleColorChange}
                  label="Color"
                  value={options.color.value}
                >
                  {item.options.map((option, i) =>
                    option.quantity > 0 ? (
                      <MenuItem key={i} value={getColorValue(option)}>
                        {getColorValue(option)}
                      </MenuItem>
                    ) : null
                  )}
                </Select>
              </FormControl>
              {options.power && (
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  disabled={options.color.value === ""}
                >
                  <InputLabel>Power</InputLabel>
                  <Select
                    onChange={(e: any) =>
                      setOptions((prev) => ({
                        ...prev,
                        power: { value: e.target.value },
                      }))
                    }
                    label="Power"
                    value={options.power.value}
                  >
                    {getOptionsFromColor()?.power?.map((powerOption, i) => (
                      <MenuItem key={i} value={powerOption}>
                        {powerOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {options.storage && (
                <FormControl
                  sx={{ m: 1, minWidth: 100 }}
                  disabled={options.color.value === ""}
                >
                  <InputLabel>Storage</InputLabel>
                  <Select
                    onChange={(e: any) =>
                      setOptions((prev) => ({
                        ...prev,
                        storage: { value: e.target.value },
                      }))
                    }
                    label="Storage"
                    value={options.storage.value}
                  >
                    {getOptionsFromColor()?.storage?.map(
                      (storageOptions, i) => (
                        <MenuItem key={i} value={storageOptions}>
                          {storageOptions}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "center", mb: 1 }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleAddClick();
                  handleClose();
                }}
                variant="contained"
                disabled={
                  !Object.values(options).every((elem) => elem.value !== "")
                }
              >
                Add to cart
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ProductDetails;
