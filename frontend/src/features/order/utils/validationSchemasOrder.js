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

export const validationSchemasOrder = yup.object().shape({
  // date: yup.string().required("La fecha es requerida"),
  // code: yup.string().required("El código es requerido"),
  // rate_id: yup.string().required("El ID de la tarifa es requerido"),
  // planning_id: yup.string().required("El ID de la planificación es requerido"),
  // schedule_id: yup.string().required("El ID del horario es requerido"),
  // client_id: yup.string().required("El ID del cliente es requerido"),
  // service_type_id: yup
  //   .string()
  //   .required("El ID del tipo de servicio es requerido"),
  // service_id: yup.string().required("El ID del servicio es requerido"),
  // product_id: yup.string().required("El ID del producto es requerido"),
  // business_id: yup.string().required("El ID del negocio es requerido"),
  // route_id: yup.string().required("El ID de la ruta es requerido"),
  // container: yup.string().required("El contenedor es requerido"),
  // truck_plate: yup.string().required("La placa del camión es requerida"),
  // entry: yup.string().required("La entrada es requerida"),
  // exit: yup.string().required("La salida es requerida"),
  // status: yup.number(),
  // status_date: yup.string().required("La fecha del estado es requerida"),
  // comment: yup.string().required("El comentario es requerido"),
});

export const validationSchemasOrderTruck = yup.object().shape({
  // tus otras validaciones...
  truck_plate: yup
    .string()
    .matches(
      /^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/,
      "Formato de patente inválido"
    ),
});
