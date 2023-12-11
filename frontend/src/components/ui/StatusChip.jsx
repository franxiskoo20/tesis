import { Chip } from "@mui/material";

const StatusChip = ({ enabled, sx }) => {
  const chipColor = enabled ? "success" : "default";
  const label = enabled ? "Habilitado" : "Deshabilitado";
  return <Chip label={label} color={chipColor} size="small" sx={{ ...sx }} />;
};

export default StatusChip;
