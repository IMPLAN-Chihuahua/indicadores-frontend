import axios from "axios";
import { getAuthHeaders } from "./authService";

const options = {
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 2000,
};

const publicApi = axios.create(options);
const protectedApi = axios.create(options);

protectedApi.interceptors.request.use(
  (req) => {
    req.headers.common.Authorization = getAuthHeaders();
    return req;
  },
  (error) => Promise.reject(error)
);


export { publicApi, protectedApi };
