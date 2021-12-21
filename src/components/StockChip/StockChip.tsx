import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

type Props = {
  available: boolean;
};

const StockChip = ({ available }: Props) => {
  return (
    <Box my={1}>
      <Chip
        label={available ? "In stock" : "Sold out"}
        sx={{
          color: "white",
          backgroundColor: available ? "green" : "orange",
        }}
      />
    </Box>
  );
};

export default StockChip;
