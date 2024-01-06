import { Box, Chip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { rateTableStaticOption } from "../../constants/rateTableOption";
import useRateTableColumn from "../../hooks/useRateTableColumn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const RateTable = ({ rates, onEdit, onDelete, isSubmitting }) => {
  const columns = useRateTableColumn(rates, onEdit, onDelete);

  const options = {
    ...rateTableStaticOption,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={
          <Chip
            label="Tarifas Vigente"
            color="success"
            icon={<CheckCircleIcon />}
          />
        }
        data={rates}
        columns={columns}
        options={options}
      />  
    </Box>
  );
};

export default RateTable;
