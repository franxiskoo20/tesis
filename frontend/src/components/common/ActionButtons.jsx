import {  Box, Button } from "@mui/material";

const ActionButtons = ({ isLoading, onCancel }) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isLoading}
      sx={{ mx: 1 }}
    >
      Registrar
    </Button>
    <Button
      onClick={onCancel}
      variant="outlined"
      color="primary"
      sx={{ mx: 1 }}
    >
      Cancelar
    </Button>
  </Box>
);
export default ActionButtons;