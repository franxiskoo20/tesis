import { Box, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ChipButton from "../../components/common/Button/ChipButton";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import OverlayLoader from "../../components/common/Loading/OverlayLoader";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { adaptCustomerData } from "../../features/customer/adapters/adaptCustomerData";
import CustomerCard from "../../features/customer/components/CustomerCard/CustomerCard";
import CustomerAddModal from "../../features/customer/components/CustomerModal/CustomerAddModal";
import { customerService } from "../../features/customer/services/customerService";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const CustomerPage = () => {
  const queryClient = useQueryClient();

  const {
    data: customers,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
    select: (data) => data.map(adaptCustomerData),
  });

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false); // Estado para abrir o cerrar el modal de registro
  const [isSubmitting, setisSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleToggleAddCustomer = () => {
    return setIsAddCustomerOpen(!isAddCustomerOpen);
  };

  const handleCustomerAdded = async () => {
    setisSubmitting(true);
    await queryClient.invalidateQueries(["customers"]);
    setisSubmitting(false);
    handleToggleAddCustomer();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AuthenticatedLayout>
      <PaperContainer
        title={"Lista de Clientes"}
        button={
          <ChipButton
            label="Agregar cliente"
            onClick={handleToggleAddCustomer}
          />
        }
        relativePosition={true}
      >
        <OverlayLoader isLoading={isSubmitting} />
        <CustomerAddModal
          open={isAddCustomerOpen}
          onClose={handleToggleAddCustomer}
          onCustomerAdded={handleCustomerAdded}
        />
        {/* Tabs */}
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
            <LoadingSkeleton count={3} xs={12} sm={6} md={4} />
          ) : isSuccess ? (
            <Box component="article" mt={4}>
              <Grid container spacing={2}>
                <CustomerCard customers={customers} />
              </Grid>
            </Box>
          ) : (
            <div>No hay datos disponibles</div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {/* Aquí va el contenido de tu tabla de clientes */}
          <h1>HOLA</h1>
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default CustomerPage;
