import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { adminService } from "../../services/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import userTableStaticColumns from "./userTableColumns";
import userTableStaticOptions from "./userTableOptions";

const UserTable = ({ users, onEdit, onAddUser }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const queryClient = useQueryClient();

  const renderAddUserButton = () => {
    return (
      <Button variant="contained" color="primary" onClick={onAddUser}>
        Agregar Usuario
      </Button>
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (userId) => adminService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setDeleteConfirmOpen(true);
  };
  const confirmDelete = () => {
    deleteMutation.mutate(selectedUserId);
    setDeleteConfirmOpen(false);
  };

  const columns = [
    ...userTableStaticColumns,
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <IconButton onClick={() => onEdit(users[dataIndex])}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(users[dataIndex].id)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const options = {
    ...userTableStaticOptions,
    customToolbar: renderAddUserButton,
  };

  return (
    <>
      <MUIDataTable
        title={"Lista de usuarios"}
        data={users}
        columns={columns}
        options={options}
      />
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;
