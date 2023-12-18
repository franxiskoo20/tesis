import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";
import StatusChip from "../../../components/ui/StatusChip";

const useRateTableColumn = (rates, onEdit, onDelete) => {
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rate = rates[dataIndex];
          return <UserAvatar name={rate.userName} roleId={rate.roleId} />;
        },
      },
    },
    {
      name: "code",
      label: "Codigo",
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
      name: "serviceName",
      label: "Servicio",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "productName",
      label: "Producto",
      options: {
        filter: false,
        sort: true,
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
      name: "status",
      label: "Estado",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const rateStatus = rates[dataIndex].status;
          return <StatusChip enabled={rateStatus} />;
        },
      },
    },
    {
      name: "createdAt",
      label: "fecha de creacion",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "updatedAt",
      label: "fecha de actualizacion",
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
                onClick={() => onEdit(rates[dataIndex])}
              >
                <EditIcon />
              </CustomIconButton>
              <CustomIconButton
                aria-label="delete"
                onClick={() => onDelete(rates[dataIndex].id)}
              >
                <DeleteIcon />
              </CustomIconButton>
            </>
          );
        },
      },
    },
  ];

  return columns;
};

export default useRateTableColumn;
