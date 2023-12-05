import * as Yup from "yup";

export const validationSchemasCustomer = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  status: Yup.boolean(),
  logo: Yup.mixed()
    .required("El logo es requerido")
    .test(
      "fileSize",
      "El archivo es demasiado grande",
      value => value && value.size <= 2097152  // 1MB
    ),
    // .test(
    //   "fileFormat",
    //   "Formato no soportado",
    //   value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
    // ),
  user_id: Yup.string().required("El ID del usuario es requerido"),
});

