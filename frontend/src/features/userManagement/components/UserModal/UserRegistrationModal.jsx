import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";

import { Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../../../components/layout/ModalLayout";
import ActionButtons from "../../../../components/common/buttons/ActionButtons";
import { userValidationSchemaWithPassword } from "../../utils/validationSchemasUtils";
import UserFormFields from "../../components/UserInputs/UserFormFields";
import UserFormPasswordFields from "../../components/UserInputs/UserFormPasswordFields";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const UserRegistrationModal = ({ open, onClose, onUserAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(userValidationSchemaWithPassword),
    mode: "onChange",
    defaultValues: {
      role_id: "",
    },
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: userService.getRoles,
  });

  const registerMutation = useMutation({
    mutationFn: userService.register,
    onSuccess: () => {
      onUserAdded?.();
      handleClose();
    },
    onError: (error) => {
      console.error("Error al registrar el usuario:", error);
    },
  });

  const onSubmit = (data) => {
    console.log("Datos enviados: " + data.name + " " + data.email);
    registerMutation.mutate(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalLayout title="Registrar Usuario" open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <UserFormFields
            register={register}
            errors={errors}
            touchedFields={touchedFields}
            control={control}
            roles={roles}
          />
          <UserFormPasswordFields
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <Grid item xs={12}>
            <ActionButtons
              isLoading={registerMutation.isLoading}
              onCancel={handleClose}
              acceptButtonLabel="Registrar"
              acceptButtonIcon={<HowToRegIcon />}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default UserRegistrationModal;
