import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ChipButton from "../../../../components/common/Button/ChipButton";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";
import { productTableStaticOption } from "../../constants/productTableOption";
import useProductTableColumn from "../../hooks/useProductTableColumn";

const ProductTable = ({
  products,
  onAdd,
  onEdit,
  onDelete,
  isSubmitting,
}) => {
  const renderAddProductButton = () => {
    return <ChipButton label={"Agregar Producto"} onClick={onAdd} />;
  };
  const columns = useProductTableColumn(products, onEdit, onDelete);

  const options = {
    ...productTableStaticOption,
    customToolbar: renderAddProductButton,
  };

  return (
    <Box position="relative">
      <OverlayLoader isLoading={isSubmitting} />
      <MUIDataTable
        title={"Lista de servicios"}
        data={products}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default ProductTable;
