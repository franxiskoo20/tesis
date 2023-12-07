import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ChipButton from "../../../../components/common/Button/ChipButton";
import useTableColumns from "../../hooks/useTableColumns";
import TableOverlayLoader from "./TableLoader";
import userTableStaticOptions from "./userTableOptions";

const UserTable = ({ users, onAddUser, onEdit, onDelete, isSubmitting }) => {
  const renderAddUserButton = () => {
    return <ChipButton label={"Agregar Usuario"} onClick={onAddUser} />;
  };

  const columns = useTableColumns(users, onEdit, onDelete);

  const options = {
    ...userTableStaticOptions,
    customToolbar: renderAddUserButton,
  };

  return (
    <Box position="relative">
      <MUIDataTable
        title={"Lista de usuarios"}
        data={users}
        columns={columns}
        options={options}
      />
      <TableOverlayLoader isLoading={isSubmitting} />
    </Box>
  );
};

export default UserTable;
