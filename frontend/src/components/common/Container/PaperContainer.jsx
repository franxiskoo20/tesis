import { Box, Paper, Typography } from "@mui/material";

const PaperComponent = ({ title, children, relativePosition }) => {
  return (
    <Paper
      component="section"
      elevation={3}
      sx={{ p: 2, position: relativePosition ? "relative" : "initial" }}
    >
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
      </Box>
      <Box component="article" mt={4}>
        {children}
      </Box>
    </Paper>
  );
};

export default PaperComponent;
