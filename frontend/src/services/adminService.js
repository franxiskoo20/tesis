import makeRequest from "./api/makeRequest";

export const adminService = {
  register({ name, email, password, password_confirmation, role_id }) {
    return makeRequest("post", "/api/register", {
      name,
      email,
      password,
      password_confirmation,
      role_id,
    });
  },

  getRoles() {
    return makeRequest("get", "/api/roles");
  },

  getUsers() {
    return makeRequest("get", "/api/users");
  },
  deleteUser(userId) {
    return makeRequest("delete", `/api/user/${userId}`);
  },
  updateUser(userId, data) {
    return makeRequest("put", `/api/user/${userId}`, data);
  },
  updateUserPassword(userId, data) {
    return makeRequest("put", `/api/user/${userId}/change-password`, data);
  },
};
