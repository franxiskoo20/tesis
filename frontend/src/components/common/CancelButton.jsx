import { Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const CancelButton = ({ onClick, label = 'Cancelar', startIcon = <CancelIcon />, disabled = false, sx = {} }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color="primary"
      startIcon={startIcon}
      disabled={disabled}
      sx={{ mx: 1, ...sx }}
    >
      {label}
    </Button>
  );
};

export default CancelButton;
