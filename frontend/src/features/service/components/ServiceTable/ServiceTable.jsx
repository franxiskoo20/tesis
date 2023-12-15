import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ChipButton from "../../../../components/common/Button/ChipButton";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { serviceTableStaticOption } from "../../constants/serviceTableOption";
import useServiceTableColumn from "../../hooks/useServiceTableColumn";

const ServiceTable = ({
  services,
  onAddservice,
  onEdit,
  onDelete,
  isSubmitting,
}) => {
  const renderAddserviceButton = () => {
    return <ChipButton label={"Agregar Servicio"} onClick={onAddservice} />;
  };
  const columns = useServiceTableColumn(services, onEdit, onDelete);

  const options = {
    ...serviceTableStaticOption,
    customToolbar: renderAddserviceButton,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={"Lista de servicios"}
        data={services}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default ServiceTable;