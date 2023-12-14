import * as yup from "yup";

/**
 *
 * !SCHEME REAL
 *
 */

// import {
//   DESCRIPTION_VALIDATION,
//   NAME_VALIDATION,
// } from "../../../utils/validationSchemasBase";

// export const validationSchemasCustomer = yup.object().shape({
//   name: NAME_VALIDATION,
//   description: DESCRIPTION_VALIDATION,
//   status: yup.boolean(),
//   logo: yup.mixed()
//     .required("El logo es requerido")
//     .test(
//       "fileSize",
//       "El archivo es demasiado grande",
//       (value) => value && value.size <= 2097152 // 2MB
//     )
//     .test(
//       "fileFormat",
//       "Formato no soportado",
//       (value) =>
//         value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
//     ),
//   user_id: yup.string().required("El ID del usuario es requerido"),
// });

/**
 *
 * !SCHEME DESARROLLO
 *
 */

export const validationSchemasRate = yup.object().shape({
  customer_id: yup.string().required("El ID del cliente es requerido"),
  service_type_id: yup
    .string()
    .required("El ID del tipo de servicio es requerido"),
  service_id: yup.string().required("El ID del servicio es requerido"),
  product_id: yup.string().required("El ID del producto es requerido"),
  start_date: yup.date().required("La fecha de inicio es requerida"),
  end_date: yup.date().required("La fecha de finalización es requerida"),
  user_id: yup.string().required("El ID del usuario es requerido"),
  // status: yup.boolean(),
  status: yup.number(),

});
