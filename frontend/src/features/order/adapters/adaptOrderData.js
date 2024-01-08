import { formatDate, formatToDayMonthYear } from "../../../utils/dateUtil"; //

export const adaptOrderData = (order) => {
  return {
    id: order.id,
    date: order.date ? formatToDayMonthYear(order.date) : null,
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
    entry: order.entry ? formatDate(order.entry) : null,
    exit: order.exit ? formatDate(order.exit) : null,
    dateStatus: order.date_status ? formatDate(order.date_status) : null,
    comment: order.comment,
    status: order.status,
    statusDate: order.status_date,
    statusEnd: order.status_end,
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
    reserve: order.reserve,
    supervisorName: order.supervisor_name,
    customerServiceName: order.customer_service_name,
    rateId: order.rate_id,
    rescheduledOsId: order.rescheduled_os_id,
    weightEntry: order.weight_entry,
    weightExit: order.weight_exit,
  };
};
