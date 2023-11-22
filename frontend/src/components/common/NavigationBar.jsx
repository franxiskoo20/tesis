import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import logo from "../../assets/image/logo_camanchaca_blanco.png";
import { Link } from "react-router-dom";

const NavigationBar = ({ children, user, onSignOut, roleBasedNavigation }) => (
  <AppBar position="static">
    <Toolbar>
      <Link to="/">
        <img
          src={logo}
          alt="logo_camanchaca_blanco"
          style={{ maxWidth: 60, cursor: "pointer" }}
        />
      </Link>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Planificador Logístico
      </Typography>
      {children}
      {user && roleBasedNavigation(user.role)}
      {user && (
        <Button color="inherit" onClick={onSignOut}>
          Logout
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default NavigationBar;
