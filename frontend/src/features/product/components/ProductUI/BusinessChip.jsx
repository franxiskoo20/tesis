import { Chip } from "@mui/material";
import { BUSINESS_COLORS } from "../../constants/productBusiness";

const BusinessChip = ({ businessId, bussinessName, sx }) => {
  const chipColor = BUSINESS_COLORS[businessId];

  return (
    <Chip
      label={bussinessName}
      size="small"
      sx={{
        ...sx,
        backgroundColor: chipColor,
        color: "white",
      }}
    />
  );
};

export default BusinessChip;
