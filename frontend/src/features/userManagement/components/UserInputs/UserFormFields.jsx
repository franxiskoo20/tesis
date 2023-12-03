import CustomTextField from "../../../../components/common/Inputs/CustomTextField";
import CustomSelect from "../../../../components/common/Inputs/CustomSelect";
import Grid from "@mui/material/Grid";

const UserFormFields = ({ control, roles }) => {
  
  const renderTextField = (name, label, type) => (
    <Grid item xs={12}>
      <CustomTextField
        name={name}
        label={label}
        type={type}
        control={control}
      />
    </Grid>
  );

  return (
    <>
      {renderTextField("name", "Nombre", "text")}
      {renderTextField("email", "Correo", "email")}
      <Grid item xs={12}>
        <CustomSelect
          control={control}
          name="role_id"
          label="Rol"
          autocomplete="username"
          options={(roles ?? []).map((r) => ({
            value: r.id,
            label: r.role_type,
          }))}
        />
      </Grid>
    </>
  );
};

export default UserFormFields;
