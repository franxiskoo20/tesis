import makeRequest from "../../../services/api/makeRequest";

export const rateService = {
  addRate({
    customer_id,
    service_type_id,
    service_id,
    product_id,
    business_id,
    route_id,
    status,
    price,
    currency,
    user_id,
  }) {
    return makeRequest("post", "/api/rates", {
      customer_id,
      service_type_id,
      service_id,
      product_id,
      business_id,
      route_id,
      status,
      price,
      currency,
      user_id,
    });
  },
  getRates() {
    return makeRequest("get", "/api/rates");
  },

  deleteRate(rateId) {
    return makeRequest("delete", `/api/rates/${rateId}`);
  },

  updateRate(rateId, data) {
    return makeRequest("put", `/api/rates/${rateId}`, data);
  },

  getRoutes() {
    return makeRequest("get", "/api/routes");
  },

  getByCode(code) {
    return makeRequest("get", `/api/rates/getByCode/${code}`);
  },
};
