import { useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import GenericConfirmDialog from "../../../components/dialogs/GenericConfirmDialog";

function LogoutButton({ logout }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <GenericConfirmDialog
        open={open}
        onClose={handleClose}
        onConfirm={logout}
        title="Confirmar Salida"
        confirmButtonText="Salir"
        cancelButtonText="Cancelar"
      />

      <Button color="inherit" onClick={handleOpen} startIcon={<LogoutIcon />}>
        Salir
      </Button>
    </>
  );
}

export default LogoutButton;
