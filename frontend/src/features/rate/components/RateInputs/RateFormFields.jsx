import Grid from "@mui/material/Unstable_Grid2";
import StatusButtonGroup from "../../../../components/common/Button/StatusButtonGroup";
import CustomDateRangePicker from "../../../../components/common/Input/CustomDateRangePicker";
import CustomSelect from "../../../../components/common/Input/CustomSelect";
import CustomTextFieldPrice from "../../../../components/common/Input/CustomTextFieldPrice";
import { CURRENCIES_RATE } from "../../constants/rateCurrency";

const RateFormFields = ({ control, watch, verifiedRates }) => {
  const routeId = watch("route_id");
  const endDate = watch("end_date");

  return (
    <>
      {/* <Grid xs={12}>
        <StatusButtonGroup
          control={control}
          name="status"
          disabled={!routeId}
        />
      </Grid> */}
      <Grid xs={12}>
        <CustomDateRangePicker
          control={control}
          startDateName="start_date"
          endDateName="end_date"
          watch={watch}
          label="Rango de fechas"
          verifiedRates={verifiedRates}
          disabled={!routeId}
        />
      </Grid>
      <Grid xs={12}>
        <CustomSelect
          control={control}
          name={"currency"}
          label={"Moneda"}
          options={CURRENCIES_RATE}
          disabled={!endDate}
        />
      </Grid>
      <Grid xs={12}>
        <CustomTextFieldPrice
          control={control}
          name={"price"}
          label={"Precio"}
          currency={watch("currency")}
          disabled={!endDate}
        />
      </Grid>
    </>
  );
};

export default RateFormFields;
