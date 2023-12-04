import makeRequest from "../../../services/api/makeRequest";

export const customerService = {
  addCustomer({ name, description, status, logo, user_id }) {
    return makeRequest("post", "/api/customers", {
      name,
      description,
      status,
      logo,
      user_id,
    });
  },

  getCustomers() {
    return makeRequest("get", "/api/customers");
  },

  deleteCustomer(customerId) {
    return makeRequest("delete", `/api/customers/${customerId}`);
  },

  updateCustomer(customerId, data) {
    return makeRequest("put", `/api/customers/${customerId}`, data);
  },
};
