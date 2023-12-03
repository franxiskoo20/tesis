import userTableStaticColumns from "../components/UserTable/userTableColumns";
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
          const isDisabled = dataIndex === 0;
          return (
            <>
              <StyledIconButton
                onClick={() => !isDisabled && onEdit(users[dataIndex])}
                disabled={isDisabled}
              >
                <EditIcon />
              </StyledIconButton>
              <StyledIconButton
                onClick={() => !isDisabled && handleDelete(users[dataIndex].id)}
                disabled={isDisabled}
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
