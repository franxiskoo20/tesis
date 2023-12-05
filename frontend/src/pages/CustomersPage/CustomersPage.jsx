import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { Box, Chip, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import useAuth from "../../features/auth/hooks/useAuth";
import { adaptCustomerData } from "../../features/customersManagement/adapters/adaptCustomerData";
import CustomerCard from "../../features/customersManagement/components/CustomerCard/CustomerCard";
import CustomerAddModal from "../../features/customersManagement/components/CustomerModal/CustomerAddModal";
import { customerService } from "../../features/customersManagement/services/customerService";

const CustomersPage = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  // obtener usuarios y adaptarlos , isSuccess, isLoading
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
  const handleToggleAddCustomer = () => {
    return setIsAddCustomerOpen(!isAddCustomerOpen);
  };
  // const [isSubmitting, setisSubmitting] = useState(false);

  const handleCustomerAdded = async () => {
    // setisSubmitting(true);
    await queryClient.invalidateQueries(["customers"]);
    // setisSubmitting(false);
    handleToggleAddCustomer();
  };
  return (
    <AuthenticatedLayout>
      <Paper component="section" elevation={3} sx={{ p: 2 }}>
        <Box
          component="header"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Listado de clientes</Typography>
          <Chip
            label="Agregar cliente"
            color="primary"
            variant="outlined"
            onClick={handleToggleAddCustomer}
            icon={<DomainAddIcon />}
          />
          <CustomerAddModal
            open={isAddCustomerOpen}
            onClose={handleToggleAddCustomer}
            onCustomerAdded={handleCustomerAdded}
            user={user}
          />
        </Box>
        {isLoading ? (
          <LoadingSkeleton count={3} xs={12} sm={4} md={4} />
        ) : isSuccess ? (
          <Box component="article" mt={4}>
            <Grid container spacing={2}>
              <CustomerCard customers={customers} />
            </Grid>
          </Box>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </Paper>
    </AuthenticatedLayout>
  );
};

export default CustomersPage;
