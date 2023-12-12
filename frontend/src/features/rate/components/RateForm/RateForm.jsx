import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ActionModal from "../../../../components/modal/ActionModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import { rateService } from "../../services/rateService";
import { validationSchemasRate } from "../../utils/validationSchemasRate";
import RateFormFields from "../RateInputs/RateFormFields";

const RateForm = ({ open, onClose, onAdded }) => {
  const { user } = useAuth();

  const DEFAULT_VALUES_RATE = {
    customer_id: "",
    service_type_id: "",
    service_id: "",
    product_id: "",
    start_date: "",
    end_date: "",
    user_id: user?.id || "",
  };

  const { handleSubmit, reset, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemasRate),
    defaultValues: DEFAULT_VALUES_RATE,
  });

  const addRateMutation = useGenericMutation({
    mutationFn: rateService.addRate,
    successMessage: RATE_SNACKBAR.RATE_REGISTER_SUCCESS.message,
    errorMessage: RATE_SNACKBAR.RATE_REGISTER_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onAdded?.();
    },
  });

  const onSubmit = (data) => {
    addRateMutation.mutate(data);
  };

  // Reset campos del formulario al cerrar el modal
  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="Agregar Tarifa"
      onSubmit={handleSubmit(onSubmit)}
      isPending={addRateMutation.isPending}
      submitLabel="Agregar"
    >
      <RateFormFields control={control} customers={customers} />
    </ActionModal>
  );
};

export default RateForm;
