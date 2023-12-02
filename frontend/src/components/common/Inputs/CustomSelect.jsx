import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment
} from "@mui/material";
import { Controller } from "react-hook-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CustomSelect = ({ control, name, label, options }) => {
  const renderEndAdornment = (isTouched, error) => {
    if (isTouched && !error) {
      return <CheckCircleOutlineIcon style={{ color: "green" }} />;
    } else if (error) {
      return <ErrorOutlineIcon style={{ color: "red" }} />;
    }
    return null;
  };

  const renderHelperText = (isTouched, error) => {
    if (isTouched && error) {
      return error.message;
    } else if (isTouched && !error) {
      return "Correcto";
    }
    return "";
  };

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error, isTouched } }) => (
          <>
            <Select
              {...field}
              labelId={`${name}-label`}
              label={label}
              id={`${name}-select`}
              endAdornment={
                <InputAdornment position="end">
                  {renderEndAdornment(isTouched, error)}
                </InputAdornment>
              }
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              style={{ color: isTouched && !error ? "green" : "red" }}
            >
              {renderHelperText(isTouched, error)}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export default CustomSelect;
