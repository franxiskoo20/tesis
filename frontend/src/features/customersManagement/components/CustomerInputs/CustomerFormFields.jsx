import CustomTextField from "../../../../components/common/Inputs/CustomTextField";
import Grid from "@mui/material/Grid";
import CustomDropzoneArea from "../../../../components/common/Inputs/CustomDropzoneArea";
import CustomSwitch from "../../../../components/common/Inputs/CustomSwitch";

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
      <CustomDropzoneArea name="logo" control={control} />
      <CustomSwitch name="status" label="Habilitado" control={control} />
    </>
  );
};

export default CustomerFormFields;
