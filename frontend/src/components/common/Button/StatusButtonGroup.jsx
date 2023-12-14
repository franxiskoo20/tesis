import { Controller } from "react-hook-form";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const StatusButtonGroup = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Status buttons"
          fullWidth
        >
          <Button
            color={field.value === 0 ? "success" : "inherit"}
            onClick={() => field.onChange(0)}
          >
            Vigente
          </Button>
          <Button
            color={field.value === 1 ? "success" : "inherit"}
            onClick={() => field.onChange(1)}
          >
            Finalizado
          </Button>
        </ButtonGroup>
      )}
    />
  );
};

export default StatusButtonGroup;
