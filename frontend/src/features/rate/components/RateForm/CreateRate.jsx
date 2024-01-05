import { yupResolver } from "@hookform/resolvers/yup";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  Button,
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
import AcceptButton from "../../../../components/common/Button/AcceptButton";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import useCustomer from "../../../customer/hooks/useCustomer";
import useProduct from "../../../product/hooks/useProduct";
import useServiceType from "../../../service/hooks/useServiceType";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import useRoutes from "../../hooks/useRoutes";
import { rateService } from "../../services/rateService";
import { validationSchemasRate } from "../../utils/validationSchemasRate";
import CheckRate from "./CheckRate";
import RateForm from "./RateForm";
import RatePriceForm from "./RatePriceForm";

const CreateRate = ({ onAdded }) => {
  const { user } = useAuth();
  const { customers } = useCustomer();
  const { serviceType } = useServiceType();
  const { products } = useProduct();
  const { routes } = useRoutes();

  const DEFAULT_VALUES_RATE = {
    customer_id: "",
    service_type_id: "",
    service_id: "",
    product_id: "",
    route_id: "",
    status: 0,
    price: "",
    currency: "CLP",
    user_id: user?.id || "",
  };

  const { handleSubmit, control, watch, reset, setValue } = useForm({
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
      reset(DEFAULT_VALUES_RATE); // Restablece el formulario a sus valores por defecto
      setActiveStep(0); // Vuelve al primer paso del formulario
    },
  });
  console.log(watch());
  const onSubmit = (data) => {
    // Formatea las fechas antes de enviar los datos
    // const formattedData = {
    //   ...data,
    //   start_date: data.start_date
    //     ? dayjs(data.start_date).format("YYYY-MM-DD HH:mm:ss")
    //     : null,
    //   end_date: data.end_date
    //     ? dayjs(data.end_date).format("YYYY-MM-DD HH:mm:ss")
    //     : null,
    // };

    // Luego llama a la mutación con los datos formateados
    addRateMutation.mutate(data);
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
            routes={routes}
          />
        );
      case 1:
        return <RatePriceForm control={control} watch={watch} />;
      case 2:
        return (
          <CheckRate
            watch={watch}
            customers={customers}
            serviceType={serviceType}
            products={products}
            routes={routes}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Grid container spacing={2}>
      <Paper variant="outlined" sx={{ p: "1.5rem" }}>
        <OverlayLoader isLoading={addRateMutation.isPending} />
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
          // Caso 1: Todos los pasos completados
          <>
            <Typography variant="subtitle1">
              Todos los pasos completados
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "center",
                p: 1,
                mt: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Enviar Formulario
              </Button>
            </Box>
          </>
        ) : (
          // Caso 2: Pasos en proceso
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
              {activeStep === 0 && (
                <Button
                  variant="text"
                  onClick={() => reset(DEFAULT_VALUES_RATE)}
                  startIcon={<RestartAltIcon />}
                >
                  Resetear Campos
                </Button>
              )}

              {activeStep !== 0 && (
                <Button
                  variant="text"
                  onClick={handleBack}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Volver
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                // Caso 3: Último paso - Confirmar Tarifa
                <AcceptButton
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  isPending={addRateMutation.isPending}
                  fullWidth={false}
                >
                  Confirmar Tarifa
                </AcceptButton>
              ) : (
                // Botón para avanzar al siguiente paso
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<NavigateNextIcon />}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default CreateRate;
