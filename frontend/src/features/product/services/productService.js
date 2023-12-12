import makeRequest from "../../../services/api/makeRequest";

export const productService = {
  addProduct({ name, description, status, logo, business_id, user_id }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status ? 1 : 0);
    formData.append("logo", logo);
    formData.append("business_id", business_id);
    formData.append("user_id", user_id);

    return makeRequest("post", "/api/products", formData);
  },

  getProducts() {
    return makeRequest("get", "/api/products");
  },

  deleteProduct(productId) {
    return makeRequest("delete", `/api/products/${productId}`);
  },

  updateProduct(
    ProductId,
    { name, description, status, logo, business_id, user_id }
  ) {
    const formDataUpdate = new FormData();
    formDataUpdate.append("name", name);
    formDataUpdate.append("description", description);
    formDataUpdate.append("status", status ? 1 : 0);
    formDataUpdate.append("logo", logo);
    formDataUpdate.append("business_id", business_id);
    formDataUpdate.append("user_id", user_id);

    return makeRequest("post", `/api/products/${ProductId}`, formDataUpdate);
  },

  addBusinesses(data) {
    return makeRequest("post", "/api/businesses", {
      data,
    });
  },

  getBusinesses() {
    return makeRequest("get", "/api/businesses");
  },

  deleteBusinesses(businessesId) {
    return makeRequest("delete", `/api/businesses/${businessesId}`);
  },

  updateBusinesses(businessesId, data) {
    return makeRequest("post", `/api/businesses/${businessesId}`, data);
  },
};
