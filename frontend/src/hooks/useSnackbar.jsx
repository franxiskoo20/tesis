import { useState } from "react";

const useSnackbar = (
  initialOpen = false,
  initialMessage = "",
  initialSeverity = "info"
) => {
  const [open, setOpen] = useState(initialOpen);
  const [message, setMessage] = useState(initialMessage);
  const [severity, setSeverity] = useState(initialSeverity);

  const showSnackbar = (message, severity = "info") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return { open, message, severity, showSnackbar, closeSnackbar };
};

export default useSnackbar;
