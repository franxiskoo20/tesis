import { Controller } from "react-hook-form";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const StatusButtonGroup = ({ control, name, disabled }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Status buttons"
          disabled={disabled}
          fullWidth
        >
          <Button
            color={field.value === 1 ? "primary" : "inherit"}
            onClick={() => field.onChange(1)}
            startIcon={<CheckCircleIcon />}
          >
            Vigente
          </Button>
          <Button
            color={field.value === 0 ? "primary" : "inherit"}
            onClick={() => field.onChange(0)}
            startIcon={<CancelIcon />}
          >
            Finalizada
          </Button>
        </ButtonGroup>
      )}
    />
  );
};

export default StatusButtonGroup;
