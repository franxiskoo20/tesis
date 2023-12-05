import {
  Switch,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSwitch = ({ name, label, control, ...rest }) => {
  return (
    <Grid item xs={12}>
      <Paper variant="outlined" style={{ padding: "10px" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Estado del Cliente</FormLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    {...rest}
                  />
                }
                label={label}
              />
            </FormControl>
          )}
        />
      </Paper>
    </Grid>
  );
};

export default CustomSwitch;
