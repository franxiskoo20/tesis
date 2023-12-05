import * as yup from "yup";

const EMAIL_VALIDATION = yup
  .string()
  .email("Correo electrónico inválido")
  .matches(/\.com$|\.cl$/, "El correo electrónico debe terminar en .com o .cl")
  .max(100, "El correo electrónico no debe exceder los 100 caracteres")
  .required("Este campo es requerido");
  
// REAL

const PASSWORD_RULES = yup
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(20, "La contraseña no debe exceder los 20 caracteres")
  .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
  .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
  .matches(/[0-9]/, "La contraseña debe contener al menos un número")
  .matches(
    /[@$!%*#?&]/,
    "La contraseña debe contener al menos un caracter especial"
  );

// const PASSWORD_RULES = yup
//   .string()
//   .min(6, "La contraseña debe tener al menos 6 caracteres")
//   .required("La contraseña es requerida");

const PASSWORD_VALIDATION = PASSWORD_RULES.required(
  "La contraseña es requerida"
);

export const loginValidationSchema = yup.object().shape({
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
});
