import httpClient from "./api/httpClient";

export const authService = {
  
  async login(credentials) {
    await httpClient.get("/sanctum/csrf-cookie");
    const { data } = await httpClient.post("/api/login", credentials);
    console.log("Creado correctamente", data);
    return data;
  },

  // async validateToken(token) {
  //   const { data } = await httpClient.get("/api/user", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return data;
  // },

  async validateToken() {
    const { data } = await httpClient.get("/api/user");
    return data;
  },
  // async logout(token) {
  //   // await httpClient.get("/sanctum/csrf-cookie");
  //   return await httpClient.post(
  //     "/api/logout",
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  // },
  async logout() {
    // await httpClient.get("/sanctum/csrf-cookie");
    return await httpClient.post("/api/logout");
  },
};
