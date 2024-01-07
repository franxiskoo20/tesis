import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import CustomTextField from "../../../../components/common/Input/CustomTextField";
import ActionModal from "../../../../components/modal/ActionModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import { ORDER_SNACKBAR } from "../../constants/orderSnackbar";
import { orderService } from "../../services/orderService";
import { validationSchemasOrderTrunk } from "../../utils/validationSchemasOrder";
import CustomTextFieldDisabled from "../../../../components/common/Input/CustomTextFieldDisabled";
import useAuth from "../../../auth/hooks/useAuth";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const OrderAddTrunckModal = ({ open, onClose, toAdd, onAdd }) => {
  const { user } = useAuth();

  const DEFAULT_VALUES_TRUNCK = {
    truck_plate: "",
    customer_service_name: "",
  };

  const { handleSubmit, reset, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemasOrderTrunk),
    defaultValues: DEFAULT_VALUES_TRUNCK,
  });

  const addMutation = useGenericMutation({
    mutationFn: (data) => orderService.updateTrunk(toAdd, data),
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
      title="Agregar Patente"
      onSubmit={handleSubmit(onSubmit)}
      isPending={addMutation.isPending}
      submitLabel="Agregar"
      acceptButtonIcon={<LocalShippingIcon />}
    >
      <Grid xs={12}>
        <CustomTextField
          name="truck_plate"
          label="Patente del Camión"
          control={control}
          maxLength="8"
        />
      </Grid>
      <Grid xs={12}>
        <CustomTextFieldDisabled
          name="customer_service_name"
          label="Nombre del Customer Service"
          value={user?.name || ""}
          maxLength="50"
        />
      </Grid>
    </ActionModal>
  );
};

export default OrderAddTrunckModal;
