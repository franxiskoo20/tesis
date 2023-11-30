import { CircularProgress, Box, Typography } from "@mui/material";

function Loading({ message = "Cargando...", fullscreen = true }) {
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: fullscreen ? "100vh" : "auto",
    transition: "all 0.3s ease-in-out", // Transición suave
  };

  return (
    <Box sx={boxStyle}>
      <CircularProgress color="primary" size={50} thickness={5} />
      <Typography variant="h6" marginTop={2} color="primary">
        {message}
      </Typography>
    </Box>
  );
}

export default Loading;
