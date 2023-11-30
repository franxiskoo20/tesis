import { StyledChip } from "../styles/UserTableStyledComponents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const useAddUserButton = (onAddUser) => {
  const renderAddUserButton = () => (
    <StyledChip
      variant="outlined"
      icon={<PersonAddIcon color="inherit" />}
      label={"Agregar Usuario"}
      onClick={onAddUser}
    />
  );

  return {
    renderAddUserButton,
  };
};
export default useAddUserButton;
