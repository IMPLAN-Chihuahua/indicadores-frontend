import axios from "axios";
import eventBus from "../utils/EventBus";
import { getAuthHeaders } from "./authService";

const options = {
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
};

const publicApi = axios.create(options);
const protectedApi = axios.create(options);

protectedApi.interceptors.request.use(
  req => {
    req.headers.common.Authorization = getAuthHeaders();
    return req;
  },
  error => Promise.reject(error)
);

protectedApi.interceptors.response.use(
  res => res,
  error => {
    if (error.response
      && error.response.status === 403
      && error.response.data === 'Invalid or expired token') {
      eventBus.dispatch('logout');
    }
    return Promise.reject(error)
  }
)


export { publicApi, protectedApi };
