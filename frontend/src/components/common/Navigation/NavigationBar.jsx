import { AppBar, Toolbar, Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../Layout/Logo";

const NavigationBar = ({ children, user, onSignOut, roleBasedNavigation }) => (
  <AppBar position="static">
    <Toolbar>
      <Box sx={{ marginRight: "auto" }}>
        <Logo />
      </Box>
      {children}
      {user && roleBasedNavigation(user.role)}
      {user && (
        <Button color="inherit" onClick={onSignOut} startIcon={<LogoutIcon />}>
          Salir
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default NavigationBar;
