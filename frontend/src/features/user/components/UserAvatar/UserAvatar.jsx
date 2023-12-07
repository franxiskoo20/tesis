import { Avatar } from "@mui/material";
import { ROLE_COLORS } from "../../constants/userRoles";

const getInitials = (name) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

// Componente Avatar
const UserAvatar = ({ name, role }) => {
  const avatarColor = ROLE_COLORS[role] || "grey"; // Color por defecto si el rol no está definido
  console.log(avatarColor);
  return <Avatar sx={{ bgcolor: avatarColor }}>{getInitials(name)}</Avatar>;
};

export default UserAvatar;
