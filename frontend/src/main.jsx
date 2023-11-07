// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <App />
  </QueryClientProvider>
  // </React.StrictMode>,
);
