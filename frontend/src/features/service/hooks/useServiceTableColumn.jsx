import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";
import ServiceTypeChip from "../components/ServiceUI/ServiceTypeChip";

const useServiceTableColumn = (services, onEdit, onDelete) => {
  const columns = [
    {
      name: "Avatar",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const service = services[dataIndex].user;
          return <UserAvatar name={service.name} roleId={service.roleId} />;
        },
      },
    },
    {
      name: "name",
      label: "Servicio",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Descripcion",
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
          const serviceType = services[dataIndex];
          return (
            <ServiceTypeChip
              serviceTypeId={serviceType.id}
              serviceTypeName={serviceType.serviceTypeName}
            />
          );
        },
      },
    },
    {
      name: "createdAt",
      label: "Fecha de Creación",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "updatedAt",
      label: "Fecha de Actualización",
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
                onClick={() => onEdit(services[dataIndex])}
              >
                <EditIcon />
              </CustomIconButton>
              <CustomIconButton
                aria-label="delete"
                onClick={() => onDelete(services[dataIndex].id)}
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

export default useServiceTableColumn;
