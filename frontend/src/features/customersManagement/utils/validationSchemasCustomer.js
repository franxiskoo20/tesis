import * as Yup from "yup";

export const validationSchemasCustomer = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  status: Yup.boolean(),
  logo: Yup.string(),
  user_id: Yup.string().required("El ID del usuario es requerido"),
});
