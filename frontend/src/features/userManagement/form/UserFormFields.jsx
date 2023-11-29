import CustomTextField from "../../../components/common/CustomTextField";
import CustomSelect from "../../../components/common/CustomSelect";
import Grid from "@mui/material/Grid";

const UserFormFields = ({ register, errors, control, roles }) => {
  
  const renderTextField = (name, label, type) => (
    <Grid item xs={12}>
      <CustomTextField
        register={register}
        name={name}
        label={label}
        type={type}
        errors={errors}
      />
    </Grid>
  );

  return (
    <>
      {renderTextField("name", "Name", "text")}
      {renderTextField("email", "Email", "email")}
      <Grid item xs={12}>
        <CustomSelect
          control={control}
          errors={errors}
          name="role_id"
          label="Rol"
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
