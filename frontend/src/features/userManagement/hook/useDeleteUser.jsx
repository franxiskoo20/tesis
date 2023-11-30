import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../../services/adminService";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (userId) => adminService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return deleteMutation;
};

export default useDeleteUser;
