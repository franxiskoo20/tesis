// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";

// const TableLoader = () => (
//   <Box
//     sx={{
//       display: "flex",
//       justifyContent: "center",
//       alignContent: "center",
//       width: "100%",
//       marginTop: 2,
//     }}
//   >
//     <CircularProgress />
//   </Box>
// );

// export default TableLoader;

import CircularProgress from "@mui/material/CircularProgress";

const TableOverlayLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default TableOverlayLoader;