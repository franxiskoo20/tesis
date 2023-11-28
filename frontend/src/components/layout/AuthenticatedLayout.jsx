import { useMemo } from "react";
import DrawerBar from "../common/DrawerBar";
import { Box, Container } from "@mui/material";
import { getRoleNavigationItems } from "../../utils/navigationUtils";
import useAuth from "../../features/auth/useAuth";
import { useDrawer } from "../../hooks/useDrawer";

export default function AuthenticatedLayout({ children }) {
  const { user, logout } = useAuth();

  const { drawerOpen, toggleDrawer } = useDrawer();

  const roleBasedNavigation = useMemo(
    () => getRoleNavigationItems(user.role),
    [user.role]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerBar
        onSignOut={logout}
        roleBasedNavigation={roleBasedNavigation}
        toggleDrawer={toggleDrawer}
        open={drawerOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          mt: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
