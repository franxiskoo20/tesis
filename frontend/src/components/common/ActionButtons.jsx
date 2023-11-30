import { Box } from "@mui/material";
import CancelButtom from "./CancelButton";
import AcceptButton from "./AcceptButton";
const ActionButtons = ({
  isLoading = false,
  onCancel,
  onAccept,
  acceptButtonLabel,
  acceptButtonIcon,
  cancelButtonLabel,
  cancelButtonIcon,
}) => (
  <Box
    sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
  >
    <AcceptButton
      disabled={isLoading}
      label={acceptButtonLabel}
      startIcon={acceptButtonIcon}
      onClick={onAccept}
    >
      {acceptButtonLabel}
    </AcceptButton>
    <CancelButtom
      onClick={onCancel}
      label={cancelButtonLabel}
      startIcon={cancelButtonIcon}
    />
  </Box>
);

export default ActionButtons;
