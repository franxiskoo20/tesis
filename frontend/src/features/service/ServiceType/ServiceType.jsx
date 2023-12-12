import { Box } from "@mui/material";
import useServiceType from "../hooks/useServiceType";
import CustomerAccordion from "../../../components/common/Accordion/CustomerAccordion";

const ServiceType = () => {
  const { serviceType } = useServiceType();
  return (
    <Box position="relative">
      <CustomerAccordion items={serviceType} />
    </Box>
  );
};

export default ServiceType;
