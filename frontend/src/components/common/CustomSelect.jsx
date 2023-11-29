import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelect = ({ control, errors, name, label, options }) => {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            labelId={`${name}-label`}
            label={label}
            id={`${name}-select`}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
