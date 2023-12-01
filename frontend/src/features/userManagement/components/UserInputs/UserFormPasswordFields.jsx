import CustomTextField from "../../../../components/common/Inputs/CustomTextField";
import Grid from "@mui/material/Grid";

const PasswordFields = ({
  register,
  errors,
  touchedFields,
  showPasswordFields = true,
}) => {
  const renderPasswordField = (name, label) => (
    <Grid item xs={12}>
      <CustomTextField
        register={register}
        name={name}
        label={label}
        touchedFields={touchedFields}
        type="password"
        errors={errors}
      />
    </Grid>
  );

  return showPasswordFields ? (
    <>
      {renderPasswordField("password", "Password")}
      {renderPasswordField("password_confirmation", "Confirmar Password")}
    </>
  ) : null;
};

export default PasswordFields;
