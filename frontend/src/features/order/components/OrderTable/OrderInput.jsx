import { Box, Chip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { orderTableOption } from "../../constants/orderTableOption";
import useOrderInputTableColumn from "../../hooks/useOrderInputTableColumn";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
const OrderInput = ({ orders, onEdit, isSubmitting }) => {
  const columns = useOrderInputTableColumn(orders, onEdit);

  const options = {
    ...orderTableOption,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={
          <Chip label="Registrar Ingreso" color="primary" icon={<ArrowCircleRightRoundedIcon />} />
        }
        data={orders}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default OrderInput;
