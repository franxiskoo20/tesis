import { Link } from "react-router-dom";
import logoAzul from "../../../assets/image/logo_camanchaca_azul.png";
import logoBlanco from "../../../assets/image/logo_camanchaca_blanco.png";

const COLORS = {
  AZUL: "azul",
};
const Logo = ({ color }) => (
  <Link to="/"> 
    <img
      src={color === COLORS.AZUL ? logoAzul : logoBlanco}
      alt="Logo Camanchaca"
      style={{ maxWidth: 150, cursor: "pointer" }}
    />
  </Link>
);

export default Logo;
