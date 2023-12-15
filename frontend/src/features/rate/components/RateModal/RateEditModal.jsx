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

const ProductEditModal = ({ open, onClose, toEdit, onUpdated }) => {
  const { user } = useAuth();

  const DEFAULT_VALUES_EDIT_PRODUCT = {
    name: "",
    description: "",
    status: false,
    logo: "",
    business_id: "",
    user_id: user?.id || "",
  };

  const { serviceType } = useServiceType();
  console.log("asd: " + serviceType);
  // formulario react-hook-form
  const { handleSubmit, reset, control } = useForm({
    resolver: yupResolver(validationSchemasService),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES_EDIT_PRODUCT,
  });

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

  const customerUpdateMutation = useGenericMutation({
    mutationFn: (data) =>
      serviceOfService.updateCustomer(serviceOfService.id, data),
    successMessage: SERVICE_SNACKBAR.SERVICE_EDIT_ERROR.message,
    errorMessage: SERVICE_SNACKBAR.SERVICE_EDIT_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onUpdated?.();
    },
  });

  // enviar datos del formulario para editar usuario
  const onSubmit = (data) => {
    customerUpdateMutation.mutate(data);
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Registrar Cliente"
      onSubmit={handleSubmit(onSubmit)}
      isPending={customerUpdateMutation.isPending}
      submitLabel="Agregar"
    >
      <ServiceFormFields control={control} serviceType={serviceType} />
    </ActionModal>
  );
};

export default ProductEditModal;
