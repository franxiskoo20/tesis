import makeRequest from "../../../services/api/makeRequest";

export const rateService = {
  addRate({
    customer_id,
    service_type_id,
    service_id,
    product_id,
    start_date,
    end_date,
    status,
    user_id,
  }) {
    // const statusValue = status ? 1 : 0;
    return makeRequest("post", "/api/rates", {
      customer_id,
      service_type_id,
      service_id,
      product_id,
      start_date,
      end_date,
      status,
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
};
