import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:8000/api/prueba");
  return data;
};

const ProductPage = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  if (error) return <div>Ha ocurrido un error: {error.message}</div>;

  return (
    <AuthenticatedLayout>
      <PaperContainer title={"Lista de Productos"}>
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
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default ProductPage;
