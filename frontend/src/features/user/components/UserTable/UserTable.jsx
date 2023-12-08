import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ChipButton from "../../../../components/common/Button/ChipButton";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { userTableStaticOption } from "../../constants/userTableOption";
import useTableColumn from "../../hooks/useTableColumn";

const UserTable = ({ users, onAddUser, onEdit, onDelete, isSubmitting }) => {
  const renderAddUserButton = () => {
    return <ChipButton label={"Agregar Usuario"} onClick={onAddUser} />;
  };

  const columns = useTableColumn(users, onEdit, onDelete);

  const options = {
    ...userTableStaticOption,
    customToolbar: renderAddUserButton,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={"Lista de usuarios"}
        data={users}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default UserTable;
