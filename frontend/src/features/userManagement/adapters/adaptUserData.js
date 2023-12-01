import { formatDate } from "../../../utils/dateUtils"; // Asumiendo que la función está en dateUtils.js

export const adaptUserData = (userData) => {
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    // emailVerified: userData.email_verified_at !== null,
    roleId: userData.role_id,
    createdAt: formatDate(userData.created_at),
    updatedAt: formatDate(userData.updated_at),
    roleName: userData.role ? userData.role.role_type : null,
  };
};
