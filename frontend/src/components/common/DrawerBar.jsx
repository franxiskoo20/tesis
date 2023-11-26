import { styled } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../components/common/Logo";

const drawerWidth = 170;

const AppBar = styled(MuiAppBar)(({ theme, open }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const closedDrawerWidth = isSmallScreen ? 57 : 73;

  return {
    width: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
  };
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    height: "100vh",
    ...(!open && {
      overflowX: "hidden",
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9.2),
      },
    }),
  },
}));

export default function DrawerBar({
  onSignOut,
  roleBasedNavigation,
  toggleDrawer,
  open,
}) {
  return (
    <Box display={"flex"}>
      <AppBar
        position="fixed"
        open={open}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>

          <Button
            color="inherit"
            onClick={onSignOut}
            startIcon={<LogoutIcon />}
          >
            Salir
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          {open && (
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
          )}
        </Box>
        <Divider />
        <List component="nav">{roleBasedNavigation}</List>
      </Drawer>
    </Box>
  );
}
