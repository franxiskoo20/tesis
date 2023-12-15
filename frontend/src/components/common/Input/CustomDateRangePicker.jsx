import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Controller } from "react-hook-form";

// Configura dayjs con el plugin y la localización
dayjs.extend(customParseFormat);
dayjs.locale("es");

const today = dayjs();

const CustomDateRangePicker = ({
  control,
  startDateName,
  endDateName,
  watch,
  disabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es"}>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Controller
            name={startDateName}
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Fecha de Inicio"
                minDate={today}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid xs={6}>
          <Controller
            name={endDateName}
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Fecha de Fin"
                minDate={
                  watch(startDateName) ? dayjs(watch(startDateName)) : null
                }
                disabled={!watch(startDateName)}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
export default CustomDateRangePicker;
