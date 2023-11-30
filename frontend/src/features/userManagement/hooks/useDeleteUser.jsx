import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (userId) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return deleteMutation;
};

export default useDeleteUser;
