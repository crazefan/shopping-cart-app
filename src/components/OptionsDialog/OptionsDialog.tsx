import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import StockChip from "../StockChip/StockChip";
import { ProductItemType } from "../../pages/List";

type Props = {
  open: boolean;
  item: ProductItemType;
  handleClose: () => void;
  addToCart: (item: ProductItemType) => void;
};

const OptionsDialog = ({ open, item, handleClose, addToCart }: Props) => {
  const [color, setColor] = useState("");
  const [power, setPower] = useState("");

  const handleAddClick = () => {
    const newItem = {
      ...item,
    };
    addToCart(item);
  };

  const getColorValue = (option: any) =>
    Array.isArray(option.color) ? option.color[0] : option.color;

  const getPowerOptions = () => {
    const powerOptions = item.options.find(
      (option) => option.color === color || option.color[0] === color
    );

    return powerOptions && powerOptions.power && powerOptions.power.length > 0
      ? powerOptions.power.map((powerOption, i) => (
          <MenuItem key={i} value={powerOption}>
            {powerOption}
          </MenuItem>
        ))
      : null;
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{item.name}</DialogTitle>
        <DialogContent>
          <img
            src={`/static/assets/${item.id}.jpg`}
            height="150px"
            width="auto"
          />
          {/* "id": 1,
      "name": "Philips hue bulb",
      "brand": "Philips",
      "price": "500",
      "available": true,
      "weight": 0.2, */}
          <Typography variant="body1">Details: </Typography>
          <Typography variant="body2">
            <b>Brand:</b> {item.brand} <br></br>
            <b>Weight:</b> {item.weight} kg <br></br>
            <b>Brand:</b> {item.brand} <br></br>
            <b>Brand:</b> {item.brand} <br></br>
          </Typography>
          <StockChip item={item} />
          <Typography variant="body1">Product Options:</Typography>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Color</InputLabel>
              <Select
                autoFocus
                onChange={(e: any) => setColor(e.target.value)}
                label="Color"
                value={color}
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Power</InputLabel>
              <Select
                autoFocus
                onChange={(e: any) => setPower(e.target.value)}
                label="Power"
                value={power}
              >
                {getPowerOptions()}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddClick} variant="contained">
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OptionsDialog;
