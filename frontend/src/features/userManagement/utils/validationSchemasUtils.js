import * as yup from "yup";

export const userValidationSchemaWithPassword = yup.object().shape({
  name: yup
    .string()
    .required("Este campo es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Este campo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("La confirmación de la contraseña es requerida"),
  role_id: yup.string().required("Este campo es requerido"),
});

// export const userValidationSchemaWithPassword = yup.object().shape({
//   name: yup
//     .string()
//     .required("Este campo es requerido")
//     .min(3, "El nombre debe tener al menos 3 caracteres")
//     .max(50, "El nombre no debe exceder los 50 caracteres")
//     .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, "Debe ingresar nombre completo"),
//   email: yup
//     .string()
//     .email("Correo electrónico inválido")
//     .max(100, "El correo electrónico no debe exceder los 100 caracteres")
//     .required("Este campo es requerido"),
//   password: yup
//     .string()
//     .min(8, "La contraseña debe tener al menos 8 caracteres")
//     .max(20, "La contraseña no debe exceder los 20 caracteres")
//     .matches(
//       /[a-z]/,
//       "La contraseña debe contener al menos una letra minúscula"
//     )
//     .matches(
//       /[A-Z]/,
//       "La contraseña debe contener al menos una letra mayúscula"
//     )
//     .matches(/[0-9]/, "La contraseña debe contener al menos un número")
//     .matches(
//       /[@$!%*#?&]/,
//       "La contraseña debe contener al menos un caracter especial"
//     )
//     .required("La contraseña es requerida"),
//   password_confirmation: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
//     .required("La confirmación de la contraseña es requerida"),
//   role_id: yup
//     .string()
//     // .oneOf(["admin", "user", "guest"], "Rol no válido")
//     .required("Este campo es requerido"),
// });

// export const userValidationSchemaWithoutPassword = yup.object().shape({
//   name: yup.string().required("Este campo es requerido"),
//   email: yup
//     .string()
//     .email("Correo electrónico inválido")
//     .required("Este campo es requerido"),
//   password: yup
//     .string()
//     .min(6, "La contraseña debe tener al menos 6 caracteres"),
//   password_confirmation: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
//   role_id: yup.string().required("Este campo es requerido"),
// });

// export const userValidationSchemaWithoutPassword = yup.object().shape({
//   name: yup.string().required("Este campo es requerido"),
//   email: yup
//     .string()
//     .email("Correo electrónico inválido")
//     .required("Este campo es requerido"),
//   role_id: yup.string().required("Este campo es requerido"),
//   changePassword: yup.boolean(),
//   password: yup.string().when("changePassword", {
//     is: true,
//     then: yup.string().required("La contraseña es requerida"),
//     otherwise: yup.string().notRequired(),
//   }),
//   password_confirmation: yup.string().when("changePassword", {
//     is: true,
//     then: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
//       .required("La confirmación de la contraseña es requerida"),
//     otherwise: yup.string().notRequired(),
//   }),
// });

export const userValidationSchemaWithoutPassword = yup.object().shape({
  name: yup.string().required("Este campo es requerido"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Este campo es requerido"),
  role_id: yup.string().required("Este campo es requerido"),
  changePassword: yup.boolean(),
  password: yup.string().when("changePassword", ([changePassword], schema) => {
    return changePassword
      ? schema.required("La contraseña es requerida")
      : schema.notRequired();
  }),
  password_confirmation: yup
    .string()
    .when("changePassword", ([changePassword], schema) => {
      return changePassword
        ? schema
            .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
            .required("La confirmación de la contraseña es requerida")
        : schema.notRequired();
    }),
});