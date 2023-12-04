import { useState } from "react";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { Box, Typography, Chip } from "@mui/material";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import CustomerAddModal from "../../features/customersManagement/components/CustomerModal/CustomerAddModal";

const CustomersPage = () => {
  
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false); // Estado para abrir o cerrar el modal de registro

  const handleToggleAddCustomer = () => {
    return setIsAddCustomerOpen(!isAddCustomerOpen);
  };

  return (
    <AuthenticatedLayout>
      <Box
        component="section"
        sx={{
          p: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
        }}
      >
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
        </Box>
        <Box component="article" sx={{ mt: 2 }}>
          <Typography variant="h5">contendio</Typography>
        </Box>
        <CustomerAddModal
          open={isAddCustomerOpen}
          onClose={handleToggleAddCustomer}
        />
      </Box>
    </AuthenticatedLayout>
  );
};

export default CustomersPage;
