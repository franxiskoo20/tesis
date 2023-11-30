import NavigationBar from "../common/navigation/NavigationBar";

import { Link } from "react-router-dom";

import { Button, Container, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <NavigationBar>
          <Button
            color="inherit"
            // variant="contained"
            component={Link}
            to="/"
            startIcon={<AccountCircleIcon />}
          >
            Acceder
          </Button>
          <Button
            color="inherit"
            // variant="contained"
            component={Link}
            to="/"
            startIcon={<PersonAddIcon />}
          >
            Crear cuenta
          </Button>
        </NavigationBar>
      </Box>
      <Container>{children}</Container>
    </>
  );
}
