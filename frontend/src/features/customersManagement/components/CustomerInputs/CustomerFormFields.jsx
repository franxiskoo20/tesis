import CustomTextField from "../../../../components/common/Inputs/CustomTextField";
import Grid from "@mui/material/Grid";

const CustomerFormFields = ({ control }) => {
  const renderTextField = (name, label, type) => (
    <Grid item xs={12}>
      <CustomTextField
        name={name}
        label={label}
        type={type}
        control={control}
        multiline
      />
    </Grid>
  );

  return (
    <>
      {renderTextField("name", "Nombre", "text")}
      {renderTextField("description", "Descripción", "textarea")}
    </>
  );
};

export default CustomerFormFields;
