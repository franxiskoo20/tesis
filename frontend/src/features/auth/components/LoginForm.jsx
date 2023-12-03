import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { loginValidationSchema } from "../utils/validationSchemasLogin";
import CustomTextField from "../../../components/common/Inputs/CustomTextField";
import AcceptButton from "../../../components/common/Buttons/AcceptButton";

const DEFAULT_VALUES_LOGIN = {
  email: "",
  password: "",
};

const LoginForm = ({ onSubmit, isPending }) => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginValidationSchema),
    defaultValues: DEFAULT_VALUES_LOGIN,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <CustomTextField
        name="email"
        label="Correo"
        type="email"
        control={control}
        sx={{ mt: 2 }}
      />
      <CustomTextField
        name="password"
        label="Contraseña"
        type="password"
        control={control}
        sx={{ mt: 2 }}
      />
      <AcceptButton
        label="Ingresar"
        isPending={isPending}
        sx={{ mt: 3, mb: 2 }}
      >
        Ingresar
      </AcceptButton>
    </Box>
  );
};

export default LoginForm;
