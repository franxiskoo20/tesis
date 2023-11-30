// import { TextField } from "@mui/material";

// const CustomTextField = ({ register, name, label, type, errors, ...rest }) => {
//   return (
//     <TextField
//       {...register(name)}
//       id={name}
//       label={label}
//       variant="outlined"
//       type={type}
//       fullWidth
//       error={!!errors[name]}
//       helperText={errors[name] ? errors[name].message : ""}
//       autoComplete={name}
//       {...rest}
//     />
//   );
// };

// export default CustomTextField;

import { TextField, InputAdornment } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CustomTextField = ({
  register,
  name,
  label,
  type,
  errors,
  touchedFields,
  ...rest
}) => {
  // Verifica si el campo ha sido tocado y no tiene errores
  const isValid = touchedFields?.[name] && !errors[name];
  
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
      InputProps={{
        endAdornment: isValid && (
          <InputAdornment position="end">
            <CheckCircleOutlineIcon style={{ color: "green" }} />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
