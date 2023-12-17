import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";
// import StatusChip from "../../../components/ui/StatusChip";

const useRateTableColumn = (rates, onEdit, onDelete) => {
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rate = rates[dataIndex].user;
          return <UserAvatar name={rate.name} role={rate.roleId} />;
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
    // {
    //   name: "status",
    //   label: "Estado",
    //   options: {
    //     filter: false,
    //     sort: true,
    //     customBodyRenderLite: (dataIndex) => {
    //       const productState = products[dataIndex].status;
    //       return <StatusChip enabled={productState} />;
    //     },
    //   },
    // },
    // {
    //   name: "bussinessName",
    //   label: "Tipo de Negocio",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRenderLite: (dataIndex) => {
    //       const user = users[dataIndex];
    //       return <RoleChip roleId={user.roleId} roleName={user.roleName} />;
    //     },
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
