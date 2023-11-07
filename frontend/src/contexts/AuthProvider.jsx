import { createContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { authService } from "../services/authService"; // Suponiendo que tienes un módulo de servicios de autenticación

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const queryClient = useQueryClient();

  // Cargar datos de usuario autenticado.
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(
    "authUser",
    () => authService.validateToken(localStorage.getItem("token")),
    {
      //  La consulta está habilitada (enabled) solo si hay un token en localStorage. Si no hay token, useQuery no ejecutará la consulta automáticamente.
      enabled: !!localStorage.getItem("token"),
      onSettled: (data, error) => {
        console.log("obtener usuario:" + JSON.stringify(data));

        if (error) {
          localStorage.removeItem("token");
        }
      },
    }
  );

  // Mutación para el inicio de sesión
  const loginMutation = useMutation(authService.login, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("authUser");
      localStorage.setItem("token", data.access_token);
    },
  });

  // Mutación para el cierre de sesión
  const logoutMutation = useMutation(authService.logout, {
    onSuccess: () => {
      queryClient.setQueryData("authUser", null); // Limpiamos los datos del usuario
      localStorage.removeItem("token");
      console.log("Etro a auth");
    },
  });

  // Context value ahora incluye las mutaciones y la consulta
  const value = {
    user: user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Loading...Provider</div> : children}
    </AuthContext.Provider>
  );
};
