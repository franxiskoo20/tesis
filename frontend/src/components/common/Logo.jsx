import { Link } from "react-router-dom";
import logo from "../../assets/image/logo_camanchaca_azul.png";
import { Box } from "@mui/material";

const Logo = () => (
  <Box>
    <Link to="/">
      <img
        src={logo}
        alt="Logo Camanchaca"
        style={{ maxWidth: 58, cursor: "pointer" }}
      />
    </Link>
  </Box>
);

export default Logo;

/**
 * 
 * 
 * 
 */