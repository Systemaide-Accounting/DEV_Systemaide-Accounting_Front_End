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
    const response = await authenticatedApiService.patch(`/chart-of-account/delete/${id}`);
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
    const response = await authenticatedApiService.patch(`/location/delete/${id}`);
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
    const response = await authenticatedApiService.patch(`/branch/delete/${id}`);
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