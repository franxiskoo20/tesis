import { Chip } from "@mui/material";

const WeightChip = ({ weight }) => {
  return (
    <Chip
      label={`${weight} kg`}
      size="small"
      sx={{
        backgroundColor: "lightGreen",
        borderRadius: 2,
        fontWeight: "bold",
      }}
    />
  );
};

export default WeightChip;
