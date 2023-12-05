import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";

import { Box, Grid, Paper, Typography } from "@mui/material";
const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:8000/api/prueba");
  return data;
};

const ProductsPage = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  if (error) return <div>Ha ocurrido un error: {error.message}</div>;

  return (
    <AuthenticatedLayout>
      <Paper component="section" elevation={3} sx={{ p: 2 }}>
        <Box
          component="header"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Listado de Productos</Typography>
        </Box>

        {isLoading ? (
          <LoadingSkeleton count={3} xs={12} sm={4} md={4} />
        ) : (
          <Box component="article" mt={4}>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Box component="article" sx={{ p: 2 }}>
                    <Typography variant="h7">{product.name}</Typography>
                    <Typography variant="body1">
                      {product.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </AuthenticatedLayout>
  );
};

export default ProductsPage;
