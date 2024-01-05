import { formatDate } from "../../../utils/dateUtil"; //

export const adaptOrderData = (order) => {
  return {
    id: order.id,
    date: order.date,
    code: order.code,
    planningId: order.planning_id,
    customer_id: order.customer,
    serviceTypeId: order.service_type_id,
    serviceId: order.service_id,
    productId: order.product_id,
    businessId: order.business_id,
    routeId: order.route_id,
    userId: order.user_id,
    container: order.container,
    truckPlate: order.truck_plate,
    entry: order.entry,
    exit: order.exit,
    comment: order.comment,
    status: order.status,
    statusDate: order.status_date,
    createdAt: formatDate(order.created_at),
    updatedAt: formatDate(order.updated_at),
    customerName: order.customer.name,
    serviceName: order.service.name,
    serviceTypeName: order.service_type.name,
    productName: order.product.name,
    businessName: order.business.name,
    routeName: order.route.name,
    userName: order.user.name,
    userRoleId: order.user.role_id,
  };
};
