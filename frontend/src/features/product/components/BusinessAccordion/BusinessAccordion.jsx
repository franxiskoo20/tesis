import { Box } from "@mui/material";
import useBusinessType from "../../hooks/useBusinessType";
import CustomerAccordion from "../../../../components/common/Accordion/CustomerAccordion";

const BusinessType = () => {
  const { businessType } = useBusinessType();
  return (
    <Box>
      <CustomerAccordion items={businessType} />
    </Box>
  );
};

export default BusinessType;
