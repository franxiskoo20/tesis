import { useMemo, useState } from "react";
import DrawerBar from "../common/DrawerBar";
import { Box, Container } from "@mui/material";
import { getRoleNavigationItems } from "../../utils/navigationUtils";
import useAuth from "../../features/auth/useAuth";

export default function AuthenticatedLayout({ children }) {
  const { user, logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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

      <Box component="main" mt={10}>
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
