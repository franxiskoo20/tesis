import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useState } from "react";
import GenericConfirmDialog from "../../../components/modal/GenericConfirmModal";

function LogoutButton({ logout }) {
  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };
  
  return (
    <>
      <GenericConfirmDialog
        open={open}
        onClose={handleToggleDialog}
        onConfirm={logout.mutate}
        title="Confirmar Salida"
        confirmButtonText="Salir"
        cancelButtonText="Cancelar"
        isPending={logout.isPending}
      />

      <Button
        color="inherit"
        onClick={handleToggleDialog}
        startIcon={<LogoutIcon />}
      >
        Salir
      </Button>
    </>
  );
}

export default LogoutButton;
