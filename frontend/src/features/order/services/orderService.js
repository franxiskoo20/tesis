import makeRequest from "../../../services/api/makeRequest";

export const orderService = {
  addOrder({
    date,
    code,
    rate_id,
    planning_id,
    schedule_id,
    customer_id,
    service_type_id,
    service_id,
    product_id,
    business_id,
    route_id,
    container,
    truck_plate,
    entry,
    exit,
    status,
    status_date,
    comment,
    user_id,
  }) {
    return makeRequest("post", "/api/orders", {
      date,
      code,
      rate_id,
      planning_id,
      schedule_id,
      customer_id,
      service_type_id,
      service_id,
      product_id,
      business_id,
      route_id,
      container,
      truck_plate,
      entry,
      exit,
      status,
      status_date,
      comment,
      user_id,
    });
  },
  getOrders() {
    return makeRequest("get", "/api/orders");
  },

  deleteOrder(orderId) {
    return makeRequest("delete", `/api/orders/${orderId}`);
  },

  updateOrder(orderId, data) {
    return makeRequest("put", `/api/orders/${orderId}`, data);
  },

  getSchedule() {
    return makeRequest("get", "/api/schedule");
  },

  getPlanning() {
    return makeRequest("get", "/api/planning");
  },
};
