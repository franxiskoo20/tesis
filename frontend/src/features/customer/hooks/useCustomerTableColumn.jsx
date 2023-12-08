import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import UserAvatar from "../components/UserAvatar/UserAvatar";

import CustomIconButton from "../../../components/common/Button/CustomIconButton";
// import { userTableStaticColumn } from "../constants/userTableColumn";
import { customerTableStaticColumn } from "../constants/customerTableColumn";

const customerTableColumn = (customers, onEdit, onDelete) => {
  const columns = [
    // {
    //   name: "",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       const user = users[dataIndex];
    //       return <UserAvatar name={user.name} role={user.roleId} />;
    //     },
    //   },
    // },
    // ...userTableStaticColumn,
    ...customerTableStaticColumn,
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
                onClick={() => !isDisabled && onEdit(customers[dataIndex])}
                disabled={isDisabled}
              >
                <EditIcon />
              </CustomIconButton>
              <CustomIconButton
                aria-label="delete"
                onClick={() => !isDisabled && onDelete(customers[dataIndex].id)}
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

export default customerTableColumn;
