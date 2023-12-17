import { Typography } from "@mui/material";

const CheckRate = ({ watch }) => {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        Cliente ID: {watch("customer_id")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tipo de Servicio ID: {watch("service_type_id")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Servicio ID: {watch("service_id")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Producto ID: {watch("product_id")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Fecha de Inicio: {watch("start_date") && watch("start_date").toString()}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Fecha de Fin: {watch("end_date") && watch("end_date").toString()}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Estado: {watch("status") ? "Activo" : "Inactivo"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Precio: {watch("price")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Moneda: {watch("currency")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Usuario ID: {watch("user_id")}
      </Typography>
    </>
  );
};

export default CheckRate;
