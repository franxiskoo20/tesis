import httpClient from "./api/httpClient";

export const adminService = {

  async register({ name, email, password, role_id }) {
    // await httpClient.get("/sanctum/csrf-cookie");
    const { data } = await httpClient.post("/api/register", {
      name,
      email,
      password,
      role_id
    });
    return data;
  },

  async getRoles(token) {
    const { data } = await httpClient.get("/api/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  
}
