import axios from 'axios';
import { decryptData, encryptData } from '../hooks/useEncryption';

const SYSTEMAIDE_API_BASE_URL = import.meta.env.VITE_SYSTEMAIDE_BE_API;
const SYSTEMAIDE_BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

const saveToLocalStorage = (key, value) => {
  // const expiry = 1000 * 5; // 5 seconds for testing
  const expiry = 1000 * 60 * 60 * 23; // 23 hours
  const item = {
    value: encryptData(value),
    expiry: Date.now() + expiry,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return null;
    }
    const parsedStoredValue = JSON.parse(storedValue);
    if (Date.now() > parsedStoredValue.expiry) {
    //   localStorage.removeItem(key);
      localStorage.clear();
      return null;
    }
    return decryptData(parsedStoredValue.value);
};

const createSystemaideApiService = (token) => {
    return axios.create({
      baseURL: SYSTEMAIDE_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
};

const authenticateSystemaideApiService = async (token) => {
    const apiService = createSystemaideApiService(token);
    return apiService;
};

export const signIn = async (data) => {
    try {
        const authenticatedApiService = await authenticateSystemaideApiService(SYSTEMAIDE_BEARER_TOKEN);
        const response = await authenticatedApiService.post('/auth/signin', data);
        
        // save accessToken and user to localStorage
        localStorage.clear();
        // localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem("accessToken", response?.data?.accessToken);
        saveToLocalStorage("user", response?.data?.user);

        return response?.data;
    } catch (error) {
        // console.log(error);
        return error?.response?.data;
    }
}; 

export const verifyUser = async (data) => {
    const authenticatedApiService = await authenticateSystemaideApiService();
    const response = await authenticatedApiService.post('/auth/verify', data); 
    return response?.data;
};