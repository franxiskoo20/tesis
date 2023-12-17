import { formatDate } from "../../../utils/dateUtil"; //

export const adaptRateData = (rate) => {
  return {
    id: rate.id,
    customer_id: rate.customer_id,
    serviceTypeId: rate.service_type_id,
    productId: rate.product_id,
    createdAt: formatDate(rate.created_at),
    updatedAt: formatDate(rate.updated_at),
    status: rate.status,
    price: rate.price,
    currency: rate.currency,
    user_id: rate.user_id,
    // user: {
    //   id: rate.user.id,
    //   name: rate.user.name,
    //   email: rate.user.email,
    //   roleId: rate.user.role_id,
    // },
  };
};

// {
//   "id": 1,
//   "customer_id": 1,
//   "service_type_id": 1,
//   "service_id": 1,
//   "product_id": 1,
//   "start_date": "2023-12-16",
//   "end_date": "2023-12-16",
//   "status": 0,
//   "price": "3000.00",
//   "currency": "CLP",
//   "user_id": 1,
//   "created_at": "2023-12-17T01:56:10.000000Z",
//   "updated_at": "2023-12-17T01:56:10.000000Z"
// },
