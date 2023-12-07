import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ChipButton from "../../components/common/Button/ChipButton";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { adaptCustomerData } from "../../features/customer/adapters/adaptCustomerData";
import CustomerCard from "../../features/customer/components/CustomerCard/CustomerCard";
import CustomerAddModal from "../../features/customer/components/CustomerModal/CustomerAddModal";
import { customerService } from "../../features/customer/services/customerService";

const CustomerPage = () => {
  const queryClient = useQueryClient();

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
      <PaperContainer
        title={"Lista de Clientes"}
        button={
          <ChipButton
            label="Agregar cliente"
            onClick={handleToggleAddCustomer}
          />
        }
      >
        <CustomerAddModal
          open={isAddCustomerOpen}
          onClose={handleToggleAddCustomer}
          onCustomerAdded={handleCustomerAdded}
        />
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
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default CustomerPage;
