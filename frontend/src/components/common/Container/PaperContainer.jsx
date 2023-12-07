import { Box, Paper, Typography } from "@mui/material";

const PaperComponent = ({ title, button, children }) => {
  return (
    <Paper component="section" elevation={3} sx={{ p: 2 }}>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {button}
      </Box>
      <Box component="article" mt={4}>
        {children}
      </Box>
    </Paper>
  );
};

export default PaperComponent;
