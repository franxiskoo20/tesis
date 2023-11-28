import { Link } from "react-router-dom";
import logoBlanco from "../../assets/image/logo_camanchaca_blanco.png";
import logoAzul from "../../assets/image/logo_camanchaca_azul.png";
// import { Box } from "@mui/material";

const Logo = ({ color }) => (
  <Link to="/">
    <img
      src={color === 'azul' ? logoAzul : logoBlanco}
      alt="Logo Camanchaca"
      style={{ maxWidth: 150, cursor: "pointer" }}
    />
  </Link>
);

export default Logo;