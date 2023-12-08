import { Box, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { adaptCustomerData } from "../../features/customer/adapters/adaptCustomerData";
import CustomerCard from "../../features/customer/components/CustomerCard/CustomerCard";
import CustomerAddModal from "../../features/customer/components/CustomerModal/CustomerAddModal";
import CustomerDeleteModal from "../../features/customer/components/CustomerModal/CustomerDeleteModal";
import CustomerEditModal from "../../features/customer/components/CustomerModal/CustomerEditModal";
import CustomerTable from "../../features/customer/components/CustomerTable/CustomerTable";
import { customerService } from "../../features/customer/services/customerService";
import useAsyncAction from "../../hooks/useAsyncAction";
import useModalState from "../../hooks/useModalState";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const CustomerPage = () => {
  const {
    data: customers,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
    select: (data) => data.map(adaptCustomerData),
  });

  const {
    isRegisterOpen,
    isEditOpen,
    isDeleteOpen,
    itemToAction,
    setItemToAction,
    toggleModal,
  } = useModalState();

  const { isSubmitting, handleAsyncAction } = useAsyncAction(customers);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <AuthenticatedLayout>
      <PaperContainer title="Lista de Clientes" relativePosition={true}>
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
              onAddCustomer={() => toggleModal("register")}
              onEdit={(customer) => {
                setItemToAction(customer);
                toggleModal("edit");
              }}
              onDelete={(customer) => {
                setItemToAction(customer);
                toggleModal("delete");
              }}
              isSubmitting={isSubmitting}
            />
          )}
          <CustomerAddModal
            open={isRegisterOpen}
            onClose={() => {
              toggleModal("register");
              setItemToAction(null);
            }}
            onCustomerAdded={() => handleAsyncAction()}
          />
          {itemToAction && (
            <>
              <CustomerDeleteModal
                open={isDeleteOpen}
                onClose={() => {
                  toggleModal("delete");
                  setItemToAction(null);
                }}
                customerToDelete={itemToAction}
                onCustomerDelete={() => handleAsyncAction()}
              />
              <CustomerEditModal
                open={isEditOpen}
                onClose={() => {
                  toggleModal("edit");
                  setItemToAction(null);
                }}
                customerToEdit={itemToAction}
                onCustomerUpdated={() => handleAsyncAction()}
              />
            </>
          )}
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default CustomerPage;
