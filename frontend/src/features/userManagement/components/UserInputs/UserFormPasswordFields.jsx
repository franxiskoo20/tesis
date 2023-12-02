import CustomTextField from "../../../../components/common/Inputs/CustomTextField";
import Grid from "@mui/material/Grid";

const PasswordFields = ({
  control = { control },
  showPasswordFields = true,
}) => {
  const renderPasswordField = (name, label) => (
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

  return showPasswordFields ? (
    <>
      {renderPasswordField("password", "Contraseña")}
      {renderPasswordField("password_confirmation", "Confirmar Contraseña")}
    </>
  ) : null;
};

export default PasswordFields;
