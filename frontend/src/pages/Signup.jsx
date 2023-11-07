import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const {
    mutate: signup,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // login({ email, password });
      console.log({ email, password });
      navigate("/");
    },
    onError: (error) => {},
  });

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  // Si está cargando, podríamos mostrar un indicador de carga
  if (isLoading) {
    return <div>Loading...Sigup</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {isError && <p style={{ color: "red" }}>{error?.message}</p>}
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          // required
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          // required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit" disabled={isLoading}>
          Create Account
        </button>
      </form>
    </DefaultLayout>
  );
};

export default Signup;
