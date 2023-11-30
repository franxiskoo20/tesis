import userTableStaticColumns from "../UserTable/userTableColumns";
import { StyledIconButton } from "../styles/UserTableStyledComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const useTableColumns = (users, handleDelete, onEdit) => {
  const columns = [
    ...userTableStaticColumns,
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <StyledIconButton onClick={() => onEdit(users[dataIndex])}>
                <EditIcon />
              </StyledIconButton>
              <StyledIconButton
                onClick={() => handleDelete(users[dataIndex].id)}
              >
                <DeleteIcon />
              </StyledIconButton>
            </>
          );
        },
      },
    },
  ];

  return columns;
};

export default useTableColumns;
