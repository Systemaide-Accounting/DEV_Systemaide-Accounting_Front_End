import axios from 'axios';

const SYSTEMAIDE_API_BASE_URL = import.meta.env.VITE_SYSTEMAIDE_BE_API;
const SYSTEMAIDE_BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

const createSystemaideApiService = (token) => {
    return axios.create({
        baseURL: SYSTEMAIDE_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
    });
};

const authenticateSystemaideApiService = async (token) => {
    const apiService = createSystemaideApiService(token);
    return apiService;
};

export const signIn = async () => {
    try {
        const authenticatedApiService = await authenticateSystemaideApiService(SYSTEMAIDE_BEARER_TOKEN);
        const response = await authenticatedApiService.post('/auth/signin');
        console.log(response);
        
    } catch (error) {
        console.log(error);
    }
}; 