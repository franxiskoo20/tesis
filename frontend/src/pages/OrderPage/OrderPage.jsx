import { Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import CreateOrder from "../../features/order/components/OrderForm/CreateOrder";

const a11yProps = (index) => {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
};

const OrderPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AuthenticatedLayout>
      <PaperContainer relativePosition={true}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="service tabs"
        >
          <Tab label="Nueva Orden de Servicio" {...a11yProps(0)} />
          <Tab label="Orden de Servicio" {...a11yProps(1)} />
        </Tabs>
        <Divider />
        <CustomTabPanel
          value={tabValue}
          index={0}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CreateOrder />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" component="div" gutterBottom>
            Tabla Order
          </Typography>
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default OrderPage;
