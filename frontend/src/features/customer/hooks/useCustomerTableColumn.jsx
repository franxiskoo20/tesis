import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import { customerTableStaticColumn } from "../constants/customerTableColumn";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";

const customerTableColumn = (customers, onEdit, onDelete) => {
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const customer = customers[dataIndex].user;
          return <UserAvatar name={customer.name} role={customer.roleId} />;
        },
      },
    },
    ...customerTableStaticColumn,
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
                onClick={() => onEdit(customers[dataIndex])}
              >
                <EditIcon />
              </CustomIconButton>
              <CustomIconButton
                aria-label="delete"
                onClick={() => onDelete(customers[dataIndex].id)}
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

export default customerTableColumn;
