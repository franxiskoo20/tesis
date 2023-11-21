import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirmar Eliminación</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro de que quieres eliminar este usuario?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={onConfirm} color="primary">Eliminar</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteDialog;
