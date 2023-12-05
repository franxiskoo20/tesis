import { makeStyles } from '@mui/styles';
import { Controller } from "react-hook-form";
import { DropzoneArea } from "react-mui-dropzone";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100px', // Cambia esto para ajustar la altura
    '& svg': { // Selecciona todos los elementos svg dentro de root
      color: theme.palette.primary.main, // Usa el color primary del tema
      fontSize: '25px', // Cambia el tamaño del icono
    },
    '& p': { // Selecciona todos los elementos p dentro de root
      fontSize: '1.2rem', // Cambia el tamaño de la letra
      color: theme.palette.text.disabled, // Usa el color de texto tenue del tema
    },
  },
  active: {
    '&.MuiDropzoneArea-active': {
      backgroundColor: theme.palette.primary.main, // Cambia el color de fondo cuando se arrastra un archivo sobre DropzoneArea
      color: theme.palette.common.white, // Cambia el color del texto cuando se arrastra un archivo sobre DropzoneArea
    },
  },
}));

const CustomDropzoneArea = ({ name, control }) => {
  
  const classes = useStyles(); // Llama a useStyles para obtener los estilos generados

  return (
    <Grid item xs={12}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Arrastra y suelta una imagen aquí o haz clic"}
            onChange={(files) => field.onChange(files[0])}
            classes={classes} // Pasa los estilos generados a classes
            showAlerts={false}
            filesLimit={1}
          />
        )}
      />
    </Grid>
  );
};

export default CustomDropzoneArea;