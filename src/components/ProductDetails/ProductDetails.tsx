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

  const getAvailableOptions = () => {
    if (item.options[0].storage)
      setOptions((prev) => ({ ...prev, storage: { value: "" } }));
    if (item.options[0].power)
      setOptions((prev) => ({ ...prev, power: { value: "" } }));
  };

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

  const getColorValue = (option: any) =>
    Array.isArray(option.color) ? option.color[0] : option.color;

  // const getPowerOptions = () => {
  //   const powerOptions = item.options.find(
  //     (option) => option.color === color || option.color[0] === color
  //   );

  //   return powerOptions && powerOptions.power && powerOptions.power.length > 0
  //     ? powerOptions.power.map((powerOption, i) => (
  //         <MenuItem key={i} value={powerOption}>
  //           {powerOption}
  //         </MenuItem>
  //       ))
  //     : null;
  // };

  const getOptions = (optionVariant: "power" | "storage") => {
    const availableOptions = item.options.find(
      (option) =>
        option.color === options.color.value ||
        option.color[0] === options.color.value
    );

    switch (optionVariant) {
      case "power":
        return availableOptions &&
          availableOptions.power &&
          availableOptions.power.length > 0
          ? availableOptions.power.map((powerOption, i) => (
              <MenuItem key={i} value={powerOption}>
                {powerOption}
              </MenuItem>
            ))
          : null;
      case "storage":
        return availableOptions &&
          availableOptions.storage &&
          availableOptions.storage.length > 0
          ? availableOptions.storage.map((storageOption, i) => (
              <MenuItem key={i} value={storageOption}>
                {storageOption}
              </MenuItem>
            ))
          : null;
    }
  };

  useEffect(() => {
    getAvailableOptions();
  }, []);

  return (
    <>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth={"xs"}
        fullWidth
      >
        <Grid container justifyContent="center">
          <Grid item>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogContent>
              <img
                src={`/static/assets/${item.id}.jpg`}
                height="150px"
                width="auto"
              />
              <Typography variant="body1">Details: </Typography>
              <Typography variant="body2">
                <b>Brand:</b> {item.brand} <br></br>
                <b>Weight:</b> {item.weight} kg <br></br>
              </Typography>
              <StockChip available={item.available} />

              <Typography variant="body1">Choose variant:</Typography>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                    {getOptions("power")}
                  </Select>
                </FormControl>
              )}
              {options.storage && (
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
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
                    {getOptions("storage")}
                  </Select>
                </FormControl>
              )}
            </DialogContent>
            <DialogActions>
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
