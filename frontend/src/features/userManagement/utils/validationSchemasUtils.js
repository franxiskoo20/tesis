import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
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
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Este campo es requerido"),
  role_id: yup.string().required("Este campo es requerido"),
});
