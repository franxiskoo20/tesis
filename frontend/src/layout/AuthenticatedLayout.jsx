import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
  const { user, logout } = useAuth();

  // const navigate = useNavigate();

  const navigationByRole = {
    "Administrador": [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
      { name: "Registrar Usuarios", path: "/app/register" },
    ],
    "Jefe Comercial": [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    // Define la navegación para otros roles aquí...
  };

  console.log(user);

  const handleSignOut = async () => {
    const token = localStorage.getItem("token");
    try {
      await logout(); // Espera a que se complete la solicitud de logout
      console.log("Se cerró la sesión");
    } catch (error) {
      console.error("Hubo un error al cerrar la sesión", error);
      // Manejar el error aquí, si es necesario
    }
  };

  const roleBasedNavigation = (role) => {
    return navigationByRole[role]?.map((item) => (
      <Button key={item.name} color="inherit" component={Link} to={item.path}>
        {item.name}
      </Button>
    ));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Application
            </Typography>
            {user && roleBasedNavigation(user.role)}
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
