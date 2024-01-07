import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import ServiceTypeChip from "../../service/components/ServiceUI/ServiceTypeChip";

const useOrderOutputTableColumn = (filteredOrders, onEdit) => {
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "customerName",
      label: "Cliente",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "serviceTypeName",
      label: "Tipo de Servicio",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const serviceType = filteredOrders[dataIndex];
          return (
            <ServiceTypeChip
              serviceTypeId={serviceType.serviceTypeId}
              serviceTypeName={serviceType.serviceTypeName}
            />
          );
        },
      },
    },
    {
      name: "routeName",
      label: "Ruta",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Fecha",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "entry",
      label: "Fecha de Ingreso",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "actions",
      label: "Acción",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <CustomIconButton
              aria-label="edit"
              onClick={() => onEdit(filteredOrders[dataIndex].id)}
            >
              <LocalShippingIcon />
            </CustomIconButton>
          );
        },
      },
    },
  ];

  return columns;
};

export default useOrderOutputTableColumn;
