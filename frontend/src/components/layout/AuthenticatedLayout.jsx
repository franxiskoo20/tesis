import { Box, Container } from "@mui/material";
import useAuth from "../../features/auth/hooks/useAuth";
import { useDrawer } from "../../hooks/useDrawer";
import { getRoleNavigationItems } from "../../utils/navigationUtils";
import DrawerBar from "../common/Navigation/DrawerBar";

export default function AuthenticatedLayout({ children }) {

  const { user, logout } = useAuth();

  const { drawerOpen, toggleDrawer } = useDrawer();

  // Obtener las rutas de navegación según el rol del usuario
  const roleBasedNavigation = getRoleNavigationItems(user.role);

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerBar
        logout={logout}
        roleBasedNavigation={roleBasedNavigation}
        toggleDrawer={toggleDrawer}
        open={drawerOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          my: 12,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
