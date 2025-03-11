import axios from "axios";

const SYSTEMAIDE_API_BASE_URL = import.meta.env.VITE_SYSTEMAIDE_BE_API;

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

export const getAllUsers = async (accessToken) => {
  try {    
    const authenticatedApiService = await authenticateSystemaideApiService(accessToken);
    const response = await authenticatedApiService.get("/users");
    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};

export const createUser = async (accessToken, user, data) => {
  try {
    const authenticatedApiService = await authenticateSystemaideApiService();
    const response = await authenticatedApiService.post("/users", data);

    return response?.data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};
// CONTINUE FROM HERE ...