import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * @param label {string} - Texto del boton
 * @param type {string} - Tipo del boton, por defecto "button"
 * @param onClick {function} - Funcion que se ejecuta al hacer click en el boton
 * @param startIcon {JSX.Element} - Icono del boton
 * @param disabled {boolean} - Indica si el boton esta deshabilitado
 * @param sx {object} - Estilos del boton
 */

const defaultCancelIcon = <CancelIcon />;

const CancelButton = ({
  label = "Cancelar",
  type = "button",
  onClick,
  startIcon = defaultCancelIcon,
  disabled = false,
  sx = {},
}) => {
  return (
    <Button
      type={type}
      variant="outlined"
      color="primary"
      onClick={onClick}
      startIcon={startIcon}
      disabled={disabled}
      sx={{ mx: 1, ...sx }}
    >
      {label}
    </Button>
  );
};

export default CancelButton;
