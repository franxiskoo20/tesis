import { yupResolver } from "@hookform/resolvers/yup";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import CustomTextFieldPrice from "../../../../components/common/Input/CustomTextFieldNumber";
import ActionModal from "../../../../components/modal/ActionModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import { ORDER_SNACKBAR } from "../../constants/orderSnackbar";
import { orderService } from "../../services/orderService";
import { validationSchemaWeight } from "../../utils/validationSchemasOrder";

const OrderWeightInputModal = ({ open, onClose, toAdd, onAdd }) => {
  const DEFAULT_VALUES_WEIGHT_EXIT = {
    weight_exit: "",
  };

  const { handleSubmit, reset, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemaWeight),
    defaultValues: DEFAULT_VALUES_WEIGHT_EXIT,
  });
  const addMutation = useGenericMutation({
    mutationFn: (data) => orderService.addWeightExit(toAdd, data),
    successMessage: ORDER_SNACKBAR.ORDER_EDIT_SUCCESS.message,
    errorMessage: ORDER_SNACKBAR.ORDER_EDIT_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onAdd?.();
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    addMutation.mutate(data);
  };

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="Registrar Peso de Salida"
      onSubmit={handleSubmit(onSubmit)}
      isPending={addMutation.isPending}
      submitLabel="Agregar"
      acceptButtonIcon={<LocalShippingIcon />}
    >
      <Grid xs={12}>
        <CustomTextFieldPrice
          name="weight_entry"
          label="Peso del Camión (kg)"
          currency="kg"
          control={control}
        />
      </Grid>
    </ActionModal>
  );
};

export default OrderWeightInputModal;
