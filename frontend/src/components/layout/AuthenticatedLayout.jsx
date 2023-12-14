import { Box, Container } from "@mui/material";
import { useDrawer } from "../../hooks/useDrawer";
import DrawerBar from "../common/Navigation/DrawerBar";

export default function AuthenticatedLayout({ children }) {
  const { drawerOpen, toggleDrawer } = useDrawer();

  return (
    <Box component="section" sx={{ display: "flex" }}>
      <DrawerBar toggleDrawer={toggleDrawer} open={drawerOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          my: 10,
          overflow: "auto",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ overflow: "auto", boxSizing: "border-box", width: "100%" }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
