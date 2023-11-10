import { createContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // const userQuery = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: () => authService.validateToken(localStorage.getItem("token")),
  //   enabled: !!localStorage.getItem("token"),
  // });

  const userQuery = useQuery({
    queryKey: ["authUser"],
    queryFn:() => authService.validateToken(),
    enabled: !!localStorage.getItem("token"),
  });

  const user = userQuery.data;
  const isLoading = userQuery.isLoading;

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      localStorage.setItem("token", data.access_token);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueriesData({ queryKey: ["authUser"] }, null);
      localStorage.removeItem("token");
    },
  });
  // const isLoadingLogin = logoutMutation.isLoading;

  const value = {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {isLoadingLogin && <h1>CARGANDPO LOGIN</h1>} */}
      {isLoading ? <div>Loading...Provider</div> : children}
    </AuthContext.Provider>
  );
};
