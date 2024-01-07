import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { orderTableOption } from "../../constants/orderTableOption";
import useOrderTableColumn from "../../hooks/useOrderTableColumn";

const OrderTable = ({ orders, onEdit, onDelete, isSubmitting }) => {
  const columns = useOrderTableColumn(orders, onEdit, onDelete);

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

export default OrderTable;
