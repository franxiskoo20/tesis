import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ChipButton from "../../../../components/common/Button/ChipButton";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { rateTableStaticOption } from "../../constants/rateTableOption";
import useRateTableColumn from "../../hooks/useRateTableColumn";

const RateTable = ({ rates, onAdd, onEdit, onDelete, isSubmitting }) => {
  const renderAddButton = () => {
    return <ChipButton label={"Agregar Tarifa"} onClick={onAdd} />;
  };
  const columns = useRateTableColumn(rates, onEdit, onDelete);

  const options = {
    ...rateTableStaticOption,
    customToolbar: renderAddButton,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable data={rates} columns={columns} options={options} />
    </Box>
  );
};

export default RateTable;
