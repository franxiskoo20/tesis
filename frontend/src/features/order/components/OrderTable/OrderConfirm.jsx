import { Box, Chip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { orderTableOption } from "../../constants/orderTableOption";
import useOrderConfirmTableColumn from "../../hooks/useOrderConfirmTableColumn";
import RecommendIcon from "@mui/icons-material/Recommend";

const OrderTrunk = ({ orders, onEdit, isSubmitting }) => {
  const filteredOrders = orders.filter(
    (order) =>
      order.entry !== null &&
      order.truckPlate !== null &&
      order.entry !== null &&
      order.weightEntry !== null
  );

  const columns = useOrderConfirmTableColumn(filteredOrders, onEdit);

  const options = {
    ...orderTableOption,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={
          <Chip
            label="Registrar Ingreso"
            color="success"
            icon={<RecommendIcon />}
          />
        }
        data={filteredOrders}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default OrderTrunk;
