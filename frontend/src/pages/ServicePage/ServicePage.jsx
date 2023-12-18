import { Divider, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { adaptServiceData } from "../../features/service/adapters/adaptServiceData";
import ServiceAddModal from "../../features/service/components/ServiceModal/ServiceAddModal";
import ServiceDeleteModal from "../../features/service/components/ServiceModal/ServiceDeleteModal";
import ServiceEditModal from "../../features/service/components/ServiceModal/ServiceEditModal";
import ServiceTable from "../../features/service/components/ServiceTable/ServiceTable";
import ServiceType from "../../features/service/serviceType/serviceType";
import { serviceOfService } from "../../features/service/services/serviceOfService";
import useAsyncAction from "../../hooks/useAsyncAction";
import useModalState from "../../hooks/useModalState";

const a11yProps = (index) => {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
};

const ServicePage = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: serviceOfService.getServices,
    select: (data) => data.map(adaptServiceData),
  });

  const {
    isRegisterOpen,
    isEditOpen,
    isDeleteOpen,
    itemToAction,
    setItemToAction,
    toggleModal,
  } = useModalState();

  const { isSubmitting, handleAsyncAction } = useAsyncAction(services);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AuthenticatedLayout>
      <PaperContainer relativePosition={true}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="service tabs"
        >
          <Tab label="Servicios" {...a11yProps(0)} />
          <Tab label="Tipo de Servicios" {...a11yProps(1)} />
        </Tabs>
        <Divider />
        <CustomTabPanel value={tabValue} index={0}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <ServiceTable
              services={services}
              onAddservice={() => toggleModal("register")}
              onEdit={(service) => {
                setItemToAction(service);
                toggleModal("edit");
              }}
              onDelete={(service) => {
                setItemToAction(service);
                toggleModal("delete");
              }}
              isSubmitting={isSubmitting}
            />
          )}
          <ServiceAddModal
            open={isRegisterOpen}
            onClose={() => {
              toggleModal("register");
              setItemToAction(null);
            }}
            onServiceAdded={() => handleAsyncAction()}
          />
          {itemToAction && (
            <>
              <ServiceEditModal
                open={isEditOpen}
                onClose={() => {
                  toggleModal("edit");
                  setItemToAction(null);
                }}
                toEdit={itemToAction}
                onUpdated={() => handleAsyncAction()}
              />
              <ServiceDeleteModal
                open={isDeleteOpen}
                onClose={() => {
                  toggleModal("delete");
                  setItemToAction(null);
                }}
                serviceToDelete={itemToAction}
                onServiceDelete={() => handleAsyncAction()}
              />
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <ServiceType />
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default ServicePage;
