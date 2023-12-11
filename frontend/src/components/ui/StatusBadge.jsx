import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme, status }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: status ? "#44b700" : theme.palette.grey[400],
    color: status ? "#44b700" : theme.palette.grey[400],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      // position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: status ? "ripple 1.2s infinite ease-in-out" : "none",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StatusBadge = ({ status, children }) => {
  return (
    <StyledBadge
      status={status}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "rigth" }}
      variant="dot"
    >
      {children}
    </StyledBadge>
  );
};

export default StatusBadge;
