import axios from "axios";

const SYSTEMAIDE_API_BASE_URL = import.meta.env.VITE_SYSTEMAIDE_BE_API;
const accessToken = localStorage.getItem("accessToken");

const createSystemaideApiService = (token) => {
  return axios.create({
    baseURL: SYSTEMAIDE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const authenticateSystemaideApiService = async (token) => {
  const apiService = createSystemaideApiService(token);
  return apiService;
};

export const getAllUsers = async () => {
  try {    
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/users");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createUser = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/users", data);

    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getUserById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/users/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateUser = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/users/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
}

export const deleteUser = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/users/block/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllRoles = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/roles");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createRole = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/roles", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getRoleById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/roles/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateRole = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/roles/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteRole = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/roles/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllPermissions = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/permissions");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createPermission = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/permissions", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getPermissionById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/permissions/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updatePermission = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/permissions/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deletePermission = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/permissions/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllAccounts = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/chart-of-account");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllParentAccounts = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/chart-of-account/accounts/parent");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
    
  }
};

export const getChildAccounts = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/chart-of-account/accounts/${id}/child`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllChildAccounts = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/chart-of-account/accounts/child");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createAccount = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/chart-of-account", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const addSubAccount = async (parentAccountId, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post(`/chart-of-account/${parentAccountId}/child`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
}

export const getAccountById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/chart-of-account/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateAccount = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/chart-of-account/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteAccount = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/chart-of-account/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllLocations = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/location");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createLocation = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/location", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getLocationById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/location/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/location/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteLocation = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/location/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllBranches = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/branch");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createBranch = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/branch", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getBranchById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/branch/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateBranch = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/branch/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteBranch = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/branch/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getLatestCompany = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/company/latest");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createCompany = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/company", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateCompany = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/company/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllAgents = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/agent");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createAgent = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/agent", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAgentById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/agent/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateAgent = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/agent/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteAgent = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/agent/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllCashDisbursementTransactions = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/cash-disbursement");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createCashDisbursementTransaction = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/cash-disbursement", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getCashDisbursementTransactionById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/cash-disbursement/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateCashDisbursementTransaction = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/cash-disbursement/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteCashDisbursementTransaction = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/cash-disbursement/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllCashReceiptTransactions = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/cash-receipts");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createCashReceiptTransaction = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/cash-receipts", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getCashReceiptTransactionById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/cash-receipts/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateCashReceiptTransaction = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/cash-receipts/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteCashReceiptTransaction = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/cash-receipts/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
}

export const getAllSalesAccountTransactions = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/sales-on-account");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createSalesAccountTransaction = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/sales-on-account", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getSalesAccountTransactionById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/sales-on-account/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateSalesAccountTransaction = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/sales-on-account/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteSalesAccountTransaction = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/sales-on-account/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllGeneralJournalTransactions = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/general-journal");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createGeneralJournalTransaction = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/general-journal", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getGeneralJournalTransactionById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/general-journal/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updateGeneralJournalTransaction = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/general-journal/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deleteGeneralJournalTransaction = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/general-journal/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getAllPurchasesAccountTransactions = async () => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/purchase-on-account");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createPurchasesAccountTransaction = async (data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.post("/purchase-on-account", data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const getPurchasesAccountTransactionById = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get(`/purchase-on-account/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const updatePurchasesAccountTransaction = async (id, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.patch(`/purchase-on-account/${id}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const deletePurchasesAccountTransaction = async (id) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.delete(`/purchase-on-account/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
}