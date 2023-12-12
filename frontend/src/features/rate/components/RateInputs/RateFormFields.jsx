import Grid from "@mui/material/Unstable_Grid2";
import CustomSelect from "../../../../components/common/Input/CustomSelect";
import CustomSwitch from "../../../../components/common/Input/CustomSwitch";

const RateFormFields = ({ control, customers }) => {
  return (
    <>
      <Grid xs={12}>
        <CustomSelect
          control={control}
          name="business_id"
          label="Tipo de negocio"
          // autocomplete="username"
          options={(customers ?? []).map((c) => ({
            value: c.id,
            label: c.name,
          }))}
        />
      </Grid>
      <CustomSwitch name="status" label="Habilitado" control={control} />
    </>
  );
};

export default RateFormFields;
