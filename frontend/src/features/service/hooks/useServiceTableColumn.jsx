import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";

const useServiceTableColumn = (services, onEdit, onDelete) => {
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const service = services[dataIndex].user;
          return <UserAvatar name={service.name} role={service.roleId} />;
        },
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => dataIndex + 1,
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
      name: "serviceTypeNane",
      label: "Tipo de Servicio",
      options: {
        filter: true,
        sort: true,
        // customBodyRenderLite: (dataIndex) => {
        //   const serviceTypeName = services[dataIndex].serviceType.name;
        //   return <span>{serviceTypeName}</span>;
        // },
      },
    },
    // {
    //   name: "serviceType.name",
    //   label: "Tipo de Servicio",
    //   options: {
    //     filter: false,
    //     sort: true,
    // customBodyRenderLite: (dataIndex) => {
    //   const servicestatus = services[dataIndex].;
    //   return <StatusChip enabled={servicestatus} />;
    // },
    //   },
    // },
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
