import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionModal from "../../../../components/modal/ActionModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import { SERVICE_SNACKBAR } from "../../constants/serviceSnackbar";
import useServiceType from "../../hooks/useServiceType";
import { serviceOfService } from "../../services/serviceOfService";
import { validationSchemasService } from "../../utils/validationSchemasService";
import ServiceFormFields from "../ServiceInputs/ServiceFormFields";

const ServiceEditModal = ({ open, onClose, toEdit, onUpdated }) => {
  const { user } = useAuth();

  const DEFAULT_VALUES_EDIT_SERVICE = {
    name: "",
    description: "",
    service_type_id: "",
    user_id: user?.id || "",
  };

  const { serviceType } = useServiceType();

  const { handleSubmit, reset, control, watch } = useForm({
    resolver: yupResolver(validationSchemasService),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES_EDIT_SERVICE,
  });
  console.log(watch());
  // cargar datos del usuario a editar
  useEffect(() => {
    if (toEdit) {
      reset({
        name: toEdit.name,
        description: toEdit.description,
        service_type_id: toEdit.serviceTypeId,
        user_id: user?.id || "",
      });
    }
  }, [toEdit, reset, user]);

  const serviceUpdateMutation = useGenericMutation({
    mutationFn: (data) => serviceOfService.updateService(toEdit.id, data),
    successMessage: SERVICE_SNACKBAR.SERVICE_EDIT_ERROR.message,
    errorMessage: SERVICE_SNACKBAR.SERVICE_EDIT_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onUpdated?.();
    },
  });

  // enviar datos del formulario para editar usuario
  const onSubmit = (data) => {
    serviceUpdateMutation.mutate(data);
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Registrar Servicio"
      onSubmit={handleSubmit(onSubmit)}
      isPending={serviceUpdateMutation.isPending}
      submitLabel="Agregar"
    >
      <ServiceFormFields control={control} serviceType={serviceType} />
    </ActionModal>
  );
};

export default ServiceEditModal;
