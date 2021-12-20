import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { ProductItemType } from "../../pages/List";

type Props = {
  item: ProductItemType;
};

const StockChip = ({ item }: Props) => {
  return (
    <Box m={1}>
      <Chip
        label={item.available ? "In stock" : "Sold out"}
        sx={{
          color: "white",
          backgroundColor: item.available ? "green" : "orange",
        }}
      />
    </Box>
  );
};

export default StockChip;
