import * as yup from "yup";

export const userValidationSchemaWithPassword = yup.object().shape({
  name: yup.string().required("Este campo es requerido"),
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

export const userValidationSchemaWithoutPassword = yup.object().shape({
  name: yup.string().required("Este campo es requerido"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Este campo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  role_id: yup.string().required("Este campo es requerido"),
});
