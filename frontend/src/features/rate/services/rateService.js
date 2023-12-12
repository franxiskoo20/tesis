import makeRequest from "../../../services/api/makeRequest";

export const rateService = {
  addRate({
    customer_id,
    service_type_id,
    service_id,
    product_id,
    start_date,
    end_date,
    user_id,
  }) {
    return makeRequest("post", "/api/rates", {
      customer_id,
      service_type_id,
      service_id,
      product_id,
      start_date,
      end_date,
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
    return makeRequest("post", `/api/rates/${rateId}`, data);
  },
};
