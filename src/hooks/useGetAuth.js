import { decryptData } from "./useEncryption";

function useGetAuth() {
    
    const getFromLocalStorage = (key) => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) {
        return null;
      }
      const parsedStoredValue = JSON.parse(storedValue);
    //   clear localStorage if token is expired
      if (Date.now() > parsedStoredValue.expiry) {
        // localStorage.removeItem(key);
        localStorage.clear();
        return null;
      }
      return decryptData(parsedStoredValue.value);
    };

    return getFromLocalStorage("user");
};

export default useGetAuth;