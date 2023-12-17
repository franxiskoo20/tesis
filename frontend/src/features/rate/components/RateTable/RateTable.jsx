import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { rateTableStaticOption } from "../../constants/rateTableOption";
import useRateTableColumn from "../../hooks/useRateTableColumn";

const RateTable = ({ rates, onEdit, onDelete, isSubmitting }) => {
  
  const columns = useRateTableColumn(rates, onEdit, onDelete);

  const options = {
    ...rateTableStaticOption,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable data={rates} columns={columns} options={options} />
    </Box>
  );
};

export default RateTable;
