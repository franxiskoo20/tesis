import { TextField } from "@mui/material";

const CustomTextFieldDisabled = ({ name, label, value }) => {
  return (
    <TextField
      name={name}
      label={label}
      fullWidth
      value={value}
      helperText={"Correcto"}
      FormHelperTextProps={{
        style: { color: "#0070ba" },
      }}
      disabled
    />
  );
};

export default CustomTextFieldDisabled;
