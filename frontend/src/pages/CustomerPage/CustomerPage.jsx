import { Box, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import OverlayLoader from "../../components/common/Loading/OverlayLoader";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { adaptCustomerData } from "../../features/customer/adapters/adaptCustomerData";
import CustomerCard from "../../features/customer/components/CustomerCard/CustomerCard";
import CustomerAddModal from "../../features/customer/components/CustomerModal/CustomerAddModal";
import CustomerDeleteModal from "../../features/customer/components/CustomerModal/CustomerDeleteModal";
import CustomerEditModal from "../../features/customer/components/CustomerModal/CustomerEditModal";
import CustomerTable from "../../features/customer/components/CustomerTable/CustomerTable";
import { customerService } from "../../features/customer/services/customerService";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const CustomerPage = () => {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState({
    isRegisterOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    customerToAction: null,
  });

  const {
    data: customers,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
    select: (data) => data.map(adaptCustomerData),
  });

  // Estado para abrir o cerrar el modal de registro
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const toggleModal = (modalType) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }));
  };

  const handleCustomerAction = async (actionType) => {
    toggleModal(actionType);
    setIsSubmitting(true);
    await queryClient.invalidateQueries(["customers"]);
    setIsSubmitting(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <AuthenticatedLayout>
      <PaperContainer title={"Lista de Clientes"} relativePosition={true}>
        <OverlayLoader isLoading={isSubmitting} />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="customer tabs"
          >
            <Tab label="Tarjetas" {...a11yProps(0)} />
            <Tab label="Tabla" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={tabValue} index={0}>
          {isLoading ? (
            <LoadingSkeleton count={3} xs={12} sm={12} md={6} lg={4} />
          ) : isSuccess ? (
            <Box component="article" mt={4}>
              <Grid container spacing={2}>
                <CustomerCard customers={customers} />
              </Grid>
            </Box>
          ) : (
            <Typography>No hay datos disponibles</Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <CustomerTable
              customers={customers}
              onAddCustomer={() => toggleModal("isRegisterOpen")}
              onEdit={(customer) =>
                setModalState({
                  ...modalState,
                  isEditOpen: true,
                  customerToAction: customer,
                })
              }
              onDelete={(customer) =>
                setModalState({
                  ...modalState,
                  isDeleteOpen: true,
                  customerToAction: customer,
                })
              }
              isSubmitting={isSubmitting}
            />
          )}
          <CustomerAddModal
            open={modalState.isRegisterOpen}
            onClose={() => toggleModal("isRegisterOpen")}
            onCustomerAdded={() => handleCustomerAction("isRegisterOpen")}
          />
          {modalState.customerToAction && (
            <CustomerDeleteModal
              open={modalState.isDeleteOpen}
              onClose={() =>
                setModalState({ isDeleteOpen: false, customerToAction: null })
              }
              customerToDelete={modalState.customerToAction}
              onCustomerDelete={() => handleCustomerAction("isDeleteOpen")}
            />
          )}
          {modalState.customerToAction && (
            <CustomerEditModal
              open={modalState.isEditOpen}
              onClose={() =>
                setModalState({ isEditOpen: false, customerToAction: null })
              }
              customerToEdit={modalState.customerToAction}
              onCustomerUpdated={() => handleCustomerAction("isEditOpen")}
            />
          )}
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default CustomerPage;
