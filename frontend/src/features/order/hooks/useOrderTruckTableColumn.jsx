import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import ServiceTypeChip from "../../service/components/ServiceUI/ServiceTypeChip";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";

const useOrderTruckTableColumn = (orders, onEdit) => {
  const columns = [
    {
      name: "Avatar",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const order = orders[dataIndex];
          return <UserAvatar name={order.userName} roleId={order.userRoleId} />;
        },
      },
    },

    {
      name: "id",
      label: "ID",
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
          const serviceType = orders[dataIndex];
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
      name: "truckPlate",
      label: "Placa Camion",
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
            <>
              <CustomIconButton
                aria-label="edit"
                onClick={() => onEdit(orders[dataIndex].id)}
              >
                <AssignmentTurnedInIcon />
              </CustomIconButton>
            </>
          );
        },
      },
    },
  ];

  return columns;
};

export default useOrderTruckTableColumn;
