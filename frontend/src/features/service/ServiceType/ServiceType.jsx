import { Box } from "@mui/material";
import useServiceType from "../hooks/useServiceType";
import CustomerAccordion from "../../../components/common/Accordion/CustomerAccordion";

const ServiceType = () => {
  const { serviceType } = useServiceType();
  console.log(serviceType);
  return (
    <Box position="relative">
      <CustomerAccordion items={serviceType} />
    </Box>
  );
};

export default ServiceType;
