import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ChipButton from "../../../../components/common/Button/ChipButton";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { customerTableStaticOption } from "../../constants/customerTableOption";
import useCustomerTableColumn from "../../hooks/useCustomerTableColumn";

const CustomerTable = ({
  customers,
  onAddCustomer,
  onEdit,
  onDelete,
  isSubmitting,
}) => {

  const renderAddUserButton = () => {
    return <ChipButton label={"Agregar Cliente"} onClick={onAddCustomer} />;
  };  
  console.log(customers)
  const columns = useCustomerTableColumn(customers, onEdit, onDelete);

  const options = {
    ...customerTableStaticOption,
    customToolbar: renderAddUserButton,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={"Lista de usuarios"}
        data={customers}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default CustomerTable;
