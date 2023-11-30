import { Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const AcceptButton = ({ onClick, label = 'Aceptar', startIcon = <CheckCircleIcon />, disabled = false, sx = {} }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="contained"
      color="primary"
      startIcon={startIcon}
      disabled={disabled}
      sx={{ mx: 1, ...sx }}
    >
      {label}
    </Button>
  );
};

export default AcceptButton;
