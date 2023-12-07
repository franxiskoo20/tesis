import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

/**
 *  Componente de campo de texto personalizado
 * @param control react-hook-form control
 * @param name nombre del campo
 * @param label etiqueta del campo
 * @param type tipo de campo
 * @param rest otros atributos
 */
const CustomTextField = ({ name, label, type, control, ...rest }) => {
  // mostrar icono de error o de correcto en el campo de texto
  const renderEndAdornment = (isDirty, error) => {
    return error ? (
      <ErrorOutlineIcon sx={{ color: "error.main" }} />
    ) : isDirty ? (
      <CheckCircleOutlineIcon sx={{ color: "primary.main" }} />
    ) : null;
  };

  const renderHelperText = (isDirty, error) => {
    return error ? error.message : isDirty ? "Correcto" : "";
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isDirty } }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          variant="outlined"
          type={type}
          fullWidth
          error={!!error}
          autoComplete={name}
          multiline
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {renderEndAdornment(isDirty, error)}
              </InputAdornment>
            ),
          }}
          helperText={renderHelperText(isDirty, error)}
          FormHelperTextProps={{
            sx: {
              color: isDirty && !error ? "primary.main" : "error.main",
            },
          }}
          {...rest}
        />
      )}
    />
  );
};

export default CustomTextField;