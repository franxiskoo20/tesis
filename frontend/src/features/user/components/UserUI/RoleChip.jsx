import { Chip } from "@mui/material";
import { ROLE_COLORS } from "../../constants/userRoles";

const RoleChip = ({ roleId, roleName, sx }) => {
  const chipColor = ROLE_COLORS[roleId];

  return (
    <Chip
      label={roleName}
      size="small"
      sx={{
        ...sx,
        backgroundColor: chipColor,
        color: "white",
      }}
    />
  );
};

export default RoleChip;
