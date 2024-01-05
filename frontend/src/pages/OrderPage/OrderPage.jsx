import { Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import CreateOrder from "../../features/order/components/OrderForm/CreateOrder";
import OrderTable from "../../features/order/components/OrderTable/OrderTable";
import useOrder from "../../features/order/hooks/useOrder";
import useAsyncAction from "../../hooks/useAsyncAction";

const a11yProps = (index) => {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
};

const OrderPage = () => {
  const { orders, isLoading } = useOrder();

  const [tabValue, setTabValue] = useState(0);
  const { isSubmitting, handleAsyncAction } = useAsyncAction(orders);

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
          <CreateOrder onAdded={() => handleAsyncAction()} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <OrderTable
              orders={orders}
              // onEdit={(rate) => {
              //   setItemToAction(rate);
              //   toggleModal("edit");
              // }}
              // onDelete={(rate) => {
              //   setItemToAction(rate);
              //   toggleModal("delete");
              // }}
              isSubmitting={isSubmitting}
            />
          )}
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default OrderPage;
