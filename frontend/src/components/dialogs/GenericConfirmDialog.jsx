import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ActionButtons from "../common/buttons/ActionButtons";

const GenericConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmar Acción",
  message = "¿Estás seguro de que quieres realizar esta acción?",
  confirmButtonText,
  cancelButtonText,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
      <ActionButtons
        onAccept={onConfirm}
        onCancel={onClose}
        acceptButtonLabel={confirmButtonText}
        cancelButtonLabel={cancelButtonText}
      />
    </DialogActions>
  </Dialog>
);

export default GenericConfirmDialog;
