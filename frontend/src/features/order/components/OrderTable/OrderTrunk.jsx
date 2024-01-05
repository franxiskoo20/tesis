import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { orderTableOption } from "../../constants/orderTableOption";
import useOrderTrunkTableColumn from "../../hooks/useOrderTrunkTableColumn";

const OrderTrunk = ({ orders, onEdit, isSubmitting }) => {
  
  const columns = useOrderTrunkTableColumn(orders, onEdit);
  
  const options = {
    ...orderTableOption,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable data={orders} columns={columns} options={options} />
    </Box>
  );
};

export default OrderTrunk;
