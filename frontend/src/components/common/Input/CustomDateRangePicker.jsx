import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa la localización en español si la necesitas
import customParseFormat from "dayjs/plugin/customParseFormat"; // Importa el plugin necesario

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
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
