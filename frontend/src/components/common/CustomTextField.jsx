import { TextField } from "@mui/material";

const CustomTextField = ({ register, name, label, type, errors, ...rest }) => {
  return (
    <TextField
      {...register(name)}
      id={name}
      label={label}
      variant="outlined"
      type={type}
      fullWidth
      error={!!errors[name]}
      helperText={errors[name] ? errors[name].message : ""}
      autoComplete={name}
      {...rest}
    />
  );
};

export default CustomTextField;
