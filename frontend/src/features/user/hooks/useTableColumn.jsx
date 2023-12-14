import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import RoleChip from "../components/UserUI/RoleChip";

const useTableColumn = (users, onEdit, onDelete) => {
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const user = users[dataIndex];
          return <UserAvatar name={user.name} roleId={user.roleId} />;
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
      label: "Nombre",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Correo Electronico",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "roleName",
      label: "Rol",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const user = users[dataIndex];
          return <RoleChip roleId={user.roleId} roleName={user.roleName} />;
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
          const isDisabled = dataIndex === 0;
          return (
            <>
              <CustomIconButton
                aria-label="edit"
                onClick={() => !isDisabled && onEdit(users[dataIndex])}
                disabled={isDisabled}
              >
                <EditIcon />
              </CustomIconButton>
              <CustomIconButton
                aria-label="delete"
                onClick={() => !isDisabled && onDelete(users[dataIndex].id)}
                disabled={isDisabled}
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

export default useTableColumn;
