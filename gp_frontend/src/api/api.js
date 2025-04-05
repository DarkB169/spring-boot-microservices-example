import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
},{
    withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or sessionStorage
    if (token && !config.url.includes("/users/register") && !config.url.includes("/users/login")) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;