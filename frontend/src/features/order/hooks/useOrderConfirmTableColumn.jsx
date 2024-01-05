import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomIconButton from "../../../components/common/Button/CustomIconButton";
import StatusChip from "../../../components/ui/StatusChip";
import UserAvatar from "../../user/components/UserAvatar/UserAvatar";
const useOrderTrunkTableColumn = (orders, onEdit) => {
  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const order = orders[dataIndex];
          return <UserAvatar name={order.userName} roleId={order.userRoleId} />;
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
      name: "status",
      label: "Estado",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const orderStatus = orders[dataIndex].status;
          return <StatusChip enabled={orderStatus} />;
        },
      },
    },
    {
      name: "date",
      label: "fecha",
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
                onClick={() => onEdit(orders[dataIndex])}
              >
                <CheckCircleIcon />
              </CustomIconButton>
            </>
          );
        },
      },
    },
  ];

  return columns;
};

export default useOrderTrunkTableColumn;
