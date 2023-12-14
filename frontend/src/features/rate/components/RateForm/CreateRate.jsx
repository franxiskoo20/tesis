import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import useCustomer from "../../../customer/hooks/useCustomer";
import useServiceType from "../../../service/hooks/useServiceType";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import { rateService } from "../../services/rateService";
import { validationSchemasRate } from "../../utils/validationSchemasRate";
import RateFormFields from "../RateInputs/RateFormFields";
import useProduct from "../../../product/hooks/useProduct";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";
import RateForm from "./RateForm";
import RatePriceForm from "./RatePriceForm";
import CheckRate from "./CheckRate";
import { useState } from "react";
import ActionButton from "../../../../components/common/Button/ActionButton";

const CreateRate = ({ onAdded }) => {
  const { user } = useAuth();
  const { customers } = useCustomer();
  const { serviceType } = useServiceType();
  const { products } = useProduct();

  const DEFAULT_VALUES_RATE = {
    customer_id: "",
    service_type_id: "",
    service_id: "",
    product_id: "",
    start_date: null,
    end_date: null,
    status: 0,
    user_id: user?.id || "",
  };

  const { handleSubmit, control, watch, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemasRate),
    defaultValues: DEFAULT_VALUES_RATE,
  });

  const addRateMutation = useGenericMutation({
    mutationFn: rateService.addRate,
    successMessage: RATE_SNACKBAR.RATE_REGISTER_SUCCESS.message,
    errorMessage: RATE_SNACKBAR.RATE_REGISTER_ERROR.message,
    onSuccessCallback: () => {
      onAdded?.();
    },
  });

  const onSubmit = (data) => {
    // Formatea las fechas antes de enviar los datos
    const formattedData = {
      ...data,
      start_date: data.start_date
        ? dayjs(data.start_date).format("YYYY-MM-DD HH:mm:ss")
        : null,
      end_date: data.end_date
        ? dayjs(data.end_date).format("YYYY-MM-DD HH:mm:ss")
        : null,
    };

    // Luego llama a la mutación con los datos formateados
    addRateMutation.mutate(formattedData);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ["Formulario Trafia", "Precio Tarifa", "Revisar Tarifa"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <RateForm
            control={control}
            watch={watch}
            setValue={setValue}
            customers={customers}
            serviceType={serviceType}
            products={products}
          />
        );
      case 1:
        return <RatePriceForm />;
      case 2:
        return <CheckRate />;
      default:
        throw new Error("Unknown step");
    }
  };

  console.log(watch());
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h5" align="center">
          Crear Tarifa
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box> */}
            
                {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CreateRate;
