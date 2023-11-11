// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/fontStyle.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <ReactQueryDevtools />
    <App />
  </QueryClientProvider>
  // </React.StrictMode>,
);
