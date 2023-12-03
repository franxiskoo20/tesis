import CustomTextField from "../../../../components/common/Inputs/CustomTextField";
import Grid from "@mui/material/Grid";

const renderPasswordField = (name, label, control) => (
  <Grid item xs={12}>
    <CustomTextField
      name={name}
      label={label}
      control={control}
      type="password"
      autoComplete="new-password"
    />
  </Grid>
);

const PasswordFields = ({ control }) => {

  return (
    <>
      {renderPasswordField("password", "Contraseña", control)}
      {renderPasswordField(
        "password_confirmation",
        "Confirmar Contraseña",
        control
      )}
    </>
  );
};

export default PasswordFields;
