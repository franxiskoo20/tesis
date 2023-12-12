import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import BusinessType from "../../features/product/BusinessType/BusinessType";
import { adaptProductData } from "../../features/product/adapters/adaptProductData";
import ProductCard from "../../features/product/components/ProductCard/ProductCard";
import ProductAddModal from "../../features/product/components/ProductModal/ProductAddModal";
import ProductDeleteModal from "../../features/product/components/ProductModal/ProductDeleteModal";
import ProductTable from "../../features/product/components/ProductTable/ProductTable";
import { productService } from "../../features/product/services/productService";
import useAsyncAction from "../../hooks/useAsyncAction";
import useModalState from "../../hooks/useModalState";

const a11yProps = (index) => {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tabpanel-${index}`,
  };
};

const ProductPage = () => {
  const {
    data: products,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    select: (data) => data.map(adaptProductData),
  });

  const {
    isRegisterOpen,
    // isEditOpen,
    isDeleteOpen,
    itemToAction,
    setItemToAction,
    toggleModal,
  } = useModalState();

  const { isSubmitting, handleAsyncAction } = useAsyncAction(products);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  console.log(products);
  return (
    <AuthenticatedLayout>
      <PaperContainer title="Lista de Productos" relativePosition={true}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="products tabs"
        >
          <Tab label="Tarjetas" {...a11yProps(0)} />
          <Tab label="Productos" {...a11yProps(1)} />
          <Tab label="Tipos de Negocio" {...a11yProps(2)} />
        </Tabs>
        <Divider />
        <CustomTabPanel value={tabValue} index={0}>
          {isLoading ? (
            <LoadingSkeleton count={3} xs={12} sm={12} md={6} lg={4} />
          ) : isSuccess ? (
            <Box component="article" mt={4}>
              <Grid container spacing={2}>
                <ProductCard products={products} />
              </Grid>
            </Box>
          ) : (
            <Typography>No hay datos disponibles</Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <ProductTable
              products={products}
              onAdd={() => toggleModal("register")}
              // onEdit={(service) => {
              //   setItemToAction(service);
              //   toggleModal("edit");
              // }}
              onDelete={(service) => {
                setItemToAction(service);
                toggleModal("delete");
              }}
              isSubmitting={isSubmitting}
            />
          )}
          <ProductAddModal
            open={isRegisterOpen}
            onClose={() => {
              toggleModal("register");
              setItemToAction(null);
            }}
            onAdded={() => handleAsyncAction()}
          />
          {itemToAction && (
            <>
              {/* <ServiceEditModal
                open={isEditOpen}
                onClose={() => {
                  toggleModal("edit");
                  setItemToAction(null);
                }}
                serviceToEdit={itemToAction}
                onServiceUpdated={() => handleAsyncAction()}
              /> */}
              <ProductDeleteModal
                open={isDeleteOpen}
                onClose={() => {
                  toggleModal("delete");
                  setItemToAction(null);
                }}
                toDelete={itemToAction}
                onDelete={() => handleAsyncAction()}
              />
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <BusinessType />
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default ProductPage;
