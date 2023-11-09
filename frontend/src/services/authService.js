import httpClient from "./api/httpClient";

export const authService = {
  async register({ name, email, password }) {
    // await httpClient.get("/sanctum/csrf-cookie");
    const { data } = await httpClient.post("/api/register", {
      name,
      email,
      password,
    });
    return data;
  },
  async login(credentials) {
    // await httpClient.get("/sanctum/csrf-cookie");
    const { data } = await httpClient.post("/api/login", credentials);
    console.log("Creado correctamente", data);
    return data;
  },

  async validateToken(token) {
    const { data } = await httpClient.get("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  async logout(token) {
    // await httpClient.get("/sanctum/csrf-cookie");
    return await httpClient.post(
      "/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
