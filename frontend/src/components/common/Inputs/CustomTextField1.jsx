import { TextField, InputAdornment } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
  const isValid = touchedFields[name] && !errors[name];

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
        endAdornment: isValid ? (
          <InputAdornment position="end">
            <CheckCircleOutlineIcon style={{ color: "green" }} />
          </InputAdornment>
        ) : errors[name] ? (
          <InputAdornment position="end">
            <ErrorOutlineIcon style={{ color: "red" }} />
          </InputAdornment>
        ) : null,
      }}
      {...rest}
    />
  );
};

export default CustomTextField;


import { Controller } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

/**
 *  Componente de campo de texto personalizado
 * @param control react-hook-form control
 * @param name nombre del campo
 * @param label etiqueta del campo
 * @param type tipo de campo
 * @param rest otros atributos
 */
const CustomTextField = ({ name, label, type, control, ...rest }) => {
  // Función para renderizar el icono de validación
  const renderEndAdornment = (isTouched, isDirty, error) => {
    return isTouched && error ? (
      <InputAdornment position="end">
        <ErrorOutlineIcon style={{ color: "red" }} />
      </InputAdornment>
    ) : isTouched && isDirty && !error ? (
      <InputAdornment position="end">
        <CheckCircleOutlineIcon style={{ color: "green" }} />
      </InputAdornment>
    ) : null;
  };

  // Función para renderizar el texto de ayuda
  // const renderHelperText = (isTouched, isDirty, error) => {
  //   console.log("entro red: " + isTouched + " " + isDirty + " " + error);
  //   if (isTouched && error) {
  //     console.log("entro error: " + error.message);
  //     return error.message;
  //   } else if (isTouched && isDirty && !error) {
  //     return "Correcto";
  //   }
  //   return "";
  // };
  const renderHelperText = (isTouched, isDirty, error) =>
    isTouched && (error ? error.message : isDirty ? "Correcto" : "");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched, isDirty } }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          variant="outlined"
          type={type}
          fullWidth
          error={!!error}
          autoComplete={name}
          // color={isDirty && !error ? "success" : "error"}
          InputProps={{
            endAdornment: renderEndAdornment(isTouched, isDirty, error),
          }}
          helperText={renderHelperText(isTouched, isDirty, error)}
          FormHelperTextProps={{
            sx: {
              color: isTouched && isDirty && !error ? "green" : "red",
            },
          }}
          {...rest}
        />
      )}
    />
  );
};
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error, isTouched, isDirty } }) => (
//         <>
//           <TextField
//             {...field}
//             id={name}
//             label={label}
//             variant="outlined"
//             type={type}
//             fullWidth
//             error={!!error}
//             autoComplete={name}
//             InputProps={{
//               endAdornment: renderEndAdornment(isTouched, isDirty, error),
//             }}
//             {...rest}
//           />
//           <FormHelperText
//             sx={{
//               color: isTouched && isDirty && !error ? "green" : "red",
//             }}
//           >
//             {console.log("entro red")}
//             {renderHelperText(isTouched, isDirty, error)}
//           </FormHelperText>
//         </>
//       )}
//     />
//   );
// };

export default CustomTextField;
