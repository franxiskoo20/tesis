import { FormHelperText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import { DropzoneArea } from "react-mui-dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100px",
    "& svg": {
      color: theme.palette.primary.main,
      fontSize: "25px",
    },
    "& p": {
      fontSize: "1rem",
      color: alpha(theme.palette.text.primary, 0.6),
    },
  },
}));

const CustomDropzoneArea = ({ name, control }) => {
  const classes = useStyles();

  return (
    <Grid xs={12}>
      <Controller
        name={name}
        control={control}
        render={({
          field,
          fieldState: {
            error,
            // isTouched, isDirty, invalid
          },
        }) => (
          <>
            {/* {console.log("isTouched: " + isTouched)}
            {console.log("error: " + !!error)}
            {console.log("isDirty: " + isDirty)}
            {console.log("invalid: " + invalid)} */}
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Arrastra y suelta una imagen aquí o haz clic"}
              onChange={(files) => {
                // if (files[0] !== undefined) {
                field.onChange(files[0]);
                // }
              }}
              classes={classes}
              showAlerts={false}
              filesLimit={1}
            />
            {error && (
              <FormHelperText sx={{ mx: 2, color: "error.main" }} error>
                {error.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Grid>
  );
};

export default CustomDropzoneArea;
