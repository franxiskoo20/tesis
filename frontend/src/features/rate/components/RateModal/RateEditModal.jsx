import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionModal from "../../../../components/modal/ActionModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import useCustomer from "../../../customer/hooks/useCustomer";
import useProduct from "../../../product/hooks/useProduct";
import useServiceType from "../../../service/hooks/useServiceType";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import useRoutes from "../../hooks/useRoutes";
import { rateService } from "../../services/rateService";
import { validationSchemasRate } from "../../utils/validationSchemasRate";
import RateFormFields from "../RateInputs/RateFormFields";

const ProductEditModal = ({ open, onClose, toEdit, onUpdated }) => {
  
  const { user } = useAuth();
  const { customers } = useCustomer();
  const { serviceType } = useServiceType();
  const { products } = useProduct();
  const { routes } = useRoutes();

  const DEFAULT_VALUES_EDIT_RATE = {
    customer_id: "",
    service_type_id: "",
    service_id: "",
    product_id: "",
    start_date: null,
    end_date: null,
    route_id: "",
    status: 0,
    price: "",
    currency: "CLP",
    user_id: user?.id || "",
  };

  const { handleSubmit, reset, control, watch, setValue } = useForm({
    resolver: yupResolver(validationSchemasRate),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES_EDIT_RATE,
  });

  // cargar datos del usuario a editar
  useEffect(() => {
    if (toEdit) {
      reset({
        customer_id: toEdit.customer_id,
        service_type_id: toEdit.serviceTypeId,
        service_id: toEdit.serviceId,
        product_id: toEdit.productId,
        start_date: toEdit.startDate,
        end_date: toEdit.endDAte,
        route_id: toEdit.routeId,
        status: toEdit.status,
        price: toEdit.price,
        currency: toEdit.currency,
        user_id: user?.id || "",
      });
    }
  }, [toEdit, reset, user]);

  const updateMutation = useGenericMutation({
    mutationFn: (data) => rateService.updateRate(rateService.id, data),
    successMessage: RATE_SNACKBAR.RATE_EDIT_ERROR.message,
    errorMessage: RATE_SNACKBAR.RATE_EDIT_SUCCESS.message,
    onSuccessCallback: () => {
      onClose?.();
      onUpdated?.();
    },
  });

  // enviar datos del formulario para editar usuario
  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Modificar Tarifa"
      onSubmit={handleSubmit(onSubmit)}
      isPending={updateMutation.isPending}
      submitLabel="Agregar"
    >
      <RateFormFields
        control={control}
        watch={watch}
        setValue={setValue}
        customers={customers}
        serviceType={serviceType}
        products={products}
        routes={routes}
      />
    </ActionModal>
  );
};

export default ProductEditModal;
