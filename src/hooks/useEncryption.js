import CryptoJS from "crypto-js";

const CRYPTOJS_SECRET = import.meta.env.VITE_CRYPTOJS_SECRET;

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTOJS_SECRET).toString();
};

export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTOJS_SECRET);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));    
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};
