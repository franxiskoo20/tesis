import { Box, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ROLE_COLORS } from "../../constants/userRoles";
import useRoles from "../../hooks/useRoles";
import UserAccordion from "../UserAccordion/UserAccordion";
import UserAvatar from "../UserAvatar/UserAvatar";

const AvatarExplanation = () => (
  <Typography variant="subtitle1" gutterBottom>
    Las siglas en el avatar representan las iniciales del nombre y apellido del
    usuario. Por ejemplo, si el usuario se llama Juan Pérez, las siglas serán
    <Grid container alignItems="center" spacing={1}>
      <Grid>
        <UserAvatar
          name="Juan Perez"
          roleId={1}
          sx={{ width: "1.5rem", height: "1.5rem", fontSize: "1rem" }}
        />
      </Grid>
      <Grid>.</Grid>
      <Grid>
        En caso de que el usuario no tenga apellido, se utilizará solo la
        inicial del nombre, por ejemplo
      </Grid>
      <Grid>
        <UserAvatar
          name="Juan"
          roleId={1}
          sx={{ width: "1.5rem", height: "1.5rem", fontSize: "1rem" }}
        />
      </Grid>
      <Grid>.</Grid>
    </Grid>
  </Typography>
);

const steps = [
  "Observa el Color del Avatar: Identifica el rol del usuario por el color de su avatar.",
  "Lee las Siglas: Observa las siglas en el avatar para identificar las iniciales del usuario.",
  "Asocia Color y Siglas: Usa la información del color y las siglas para entender el rol del usuario y a quién pertenecen esas iniciales.",
];

const RoleAccordion = () => {
  const { roles } = useRoles();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Colores y Roles Asociados
      </Typography>
      <Typography variant="subtitle1" gutterBottom mb={2}>
        Cada color representa un rol diferente en la organización. A
        continuación, se pueden observar los colores y la descripción del cargo
        que representan.
      </Typography>
      <UserAccordion items={roles} colorMap={ROLE_COLORS} />
      <Typography variant="h6" gutterBottom mt={3}>
        Identificación de Siglas
      </Typography>
      <AvatarExplanation />
      <Typography variant="h6" gutterBottom>
        Pasos para Identificar Rol y Usuario
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <Stack spacing={1}>
          {steps.map((step, index) => (
            <span key={index}>
              {index + 1}. {step}
            </span>
          ))}
        </Stack>
      </Typography>
    </Box>
  );
};

export default RoleAccordion;
