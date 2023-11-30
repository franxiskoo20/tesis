import { useMutation, useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminService";

import { Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../components/layout/ModalLayout";
import ActionButtons from "../../components/common/ActionButtons";
import { userValidationSchema } from "./utils/validationSchemasUtils";
import UserFormFields from "./form/UserFormFields";
import PasswordFields from "./form/PasswordFields";
import HowToRegIcon from "@mui/icons-material/HowToReg";


const UserRegistrationModal = ({ open, onClose, onUserAdded }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      role_id: "",
    },
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: adminService.getRoles,
  });

  const registerMutation = useMutation({
    mutationFn: adminService.register,
    onSuccess: () => {
      if (onUserAdded) onUserAdded();
      onClose();
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <ModalLayout title="Registrar Usuario" open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <UserFormFields
            register={register}
            errors={errors}
            control={control}
            roles={roles}
          />
          <PasswordFields
            register={register}
            errors={errors}
            showPasswordFields={true}
          />
          <Grid item xs={12}>
            <ActionButtons
              isLoading={registerMutation.isLoading}
              onCancel={onClose}
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
