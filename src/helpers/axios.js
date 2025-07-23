import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3030", // full URL of your backend
    withCredentials: true, // important for cookies / auth
});

export default axiosInstance;

