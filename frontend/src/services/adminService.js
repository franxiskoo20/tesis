import makeRequest from "./api/makeRequest";

export const adminService = {
  register({ name, email, password, role_id }) {
    return makeRequest("post", "/api/register", {
      name,
      email,
      password,
      role_id,
    });
  },

  getRoles() {
    return makeRequest("get", "/api/roles");
  },
};
