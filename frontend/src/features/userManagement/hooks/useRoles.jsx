import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

const useRoles = () => {
  console.log("useRoles hook");
  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: userService.getRoles,
    onError: (error) => {
      console.error("Error al cargar los roles: ", error);
    },
    // onSettled: (data, error) => {
    //   if (error) {
    //     console.error("Error al cargar los roles: ", error);
    //   } else {
    //     console.log("Roles cargados: ", data);
    //   }
    // },
  });

  return { roles: data };
};

export default useRoles;
