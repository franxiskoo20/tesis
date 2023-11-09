import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useAuth } from "../contexts/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
 
  const { logout } = useAuth();
  // const navigate = useNavigate();

  const handleSignOut = async () => {
    const token = localStorage.getItem("token");
    try {
      await logout(token); // Espera a que se complete la solicitud de logout
      console.log("Se cerró la sesión");
    } catch (error) {
      console.error("Hubo un error al cerrar la sesión", error);
      // Manejar el error aquí, si es necesario
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Application
            </Typography>
            <Button color="inherit" component={Link} to="/app/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/app/products">
              Products
            </Button>
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
