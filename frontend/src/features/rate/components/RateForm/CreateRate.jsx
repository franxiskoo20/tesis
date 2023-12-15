import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import useCustomer from "../../../customer/hooks/useCustomer";
import useProduct from "../../../product/hooks/useProduct";
import useServiceType from "../../../service/hooks/useServiceType";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import { rateService } from "../../services/rateService";
import { validationSchemasRate } from "../../utils/validationSchemasRate";
import CheckRate from "./CheckRate";
import RateForm from "./RateForm";
import RatePriceForm from "./RatePriceForm";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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
    price: 0,
    currency: "",
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
        return <RatePriceForm control={control} watch={watch} />;
      case 2:
        return <CheckRate />;
      default:
        throw new Error("Unknown step");
    }
  };

  console.log(watch());
  return (
    <Grid container spacing={2}>
      <Paper variant="outlined" sx={{ p: "1.5rem" }}>
        <Typography component="h1" variant="subtitle1" align="center">
          Formulario de Creación de Tarifa
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="subtitle1">maximo</Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                p: 1,
                mt: 1,
              }}
            >
              {activeStep !== 0 ? (
                <Button onClick={handleBack} startIcon={<NavigateBeforeIcon />}>
                  Volver
                </Button>
              ) : (
                <Box></Box>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<NavigateNextIcon />}
              >
                {activeStep === steps.length - 1
                  ? "Confirmar Tarifa"
                  : "Siguiente"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default CreateRate;
