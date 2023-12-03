// import * as yup from "yup";

// const NAME_VALIDATION = yup
//   .string()
//   .required("Este campo es requerido")
//   .min(3, "El nombre debe tener al menos 3 caracteres")
//   .max(50, "El nombre no debe exceder los 50 caracteres")
//   .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, "Debe ingresar nombre completo");

// const EMAIL_VALIDATION = yup
//   .string()
//   .email("Correo electrónico inválido")
//   .max(100, "El correo electrónico no debe exceder los 100 caracteres")
//   .required("Este campo es requerido");

// const PASSWORD_RULES = yup
//   .string()
//   .min(8, "La contraseña debe tener al menos 8 caracteres")
//   .max(20, "La contraseña no debe exceder los 20 caracteres")
//   .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
//   .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
//   .matches(/[0-9]/, "La contraseña debe contener al menos un número")
//   .matches(
//     /[@$!%*#?&]/,
//     "La contraseña debe contener al menos un caracter especial"
//   );

// const PASSWORD_VALIDATION = PASSWORD_RULES.required(
//   "La contraseña es requerida"
// );

// const PASSWORD_CONFIRMATION_VALIDATION = PASSWORD_RULES.oneOf(
//   [yup.ref("password"), null],
//   "Las contraseñas no coinciden"
// ).required("La confirmación de la contraseña es requerida");

// const ROLE_VALIDATION = yup.string().required("Este campo es requerido");

// export const userValidationSchemaWithPassword = yup.object().shape({
//   name: NAME_VALIDATION,
//   email: EMAIL_VALIDATION,
//   password: PASSWORD_VALIDATION,
//   password_confirmation: PASSWORD_CONFIRMATION_VALIDATION,
//   role_id: ROLE_VALIDATION,
// });

// export const userValidationSchemaWithoutPassword = yup.object().shape({
//   name: NAME_VALIDATION,
//   email: EMAIL_VALIDATION,
//   password: PASSWORD_RULES.notRequired(),
//   password_confirmation: PASSWORD_RULES.oneOf(
//     [yup.ref("password"), null],
//     "Las contraseñas no coinciden"
//   ).notRequired(),
//   role_id: ROLE_VALIDATION,
// });