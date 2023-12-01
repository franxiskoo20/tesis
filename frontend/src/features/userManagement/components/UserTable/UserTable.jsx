import MUIDataTable from "mui-datatables";

import userTableStaticOptions from "./userTableOptions";
import GenericConfirmDialog from "../../../../components/dialogs/GenericConfirmDialog";
import useAddUserButton from "../../hooks/useAddUserButton";
import useDeleteHandler from "../../hooks/useDeleteHandler";
import useTableColumns from "../../hooks/useTableColumns";
import TableOverlayLoader from "./TableLoader";
import Box from "@mui/material/Box";

const UserTable = ({ users, onEdit, onAddUser, isRegistering }) => {
  const { renderAddUserButton } = useAddUserButton(onAddUser);

  const {
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleDelete,
    confirmDelete,
  } = useDeleteHandler();

  const columns = useTableColumns(users, handleDelete, onEdit);

  const options = {
    ...userTableStaticOptions,
    customToolbar: renderAddUserButton,
  };

  return (
    <Box position={"relative"}>
      <TableOverlayLoader isLoading={isRegistering} />
      <MUIDataTable
        title={"Lista de usuarios"}
        data={users}
        columns={columns}
        options={options}
      />
      <GenericConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
      />
    </Box>
  );
};

export default UserTable;
