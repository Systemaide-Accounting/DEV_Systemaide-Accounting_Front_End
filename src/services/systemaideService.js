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