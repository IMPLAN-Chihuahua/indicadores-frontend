import axios from "axios";
import eventBus from "../utils/EventBus";
import { getAuthHeaders } from "./authService";

const options = {
  baseURL: process.env.REACT_APP_LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
};

const publicApi = axios.create(options);
const protectedApi = axios.create(options);

publicApi.interceptors.response.use(
  res => res,
  error => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    return Promise.reject(message)
  }
)

protectedApi.interceptors.request.use(
  req => {
    req.headers.common.Authorization = getAuthHeaders();
    return req;
  },
  error => Promise.reject(error)
);

const invalidLogin = (error) => {
  return error.response && error.response.status === 403
    && (error.response.data === 'Invalid or expired token'
      || error.response.data === 'Esta cuenta se encuentra deshabilitada')
}

const isValidationError = (error) => {
  return error.response && error.response.status === 422;
}

protectedApi.interceptors.response.use(
  res => res,
  error => {
    let message = "";
    if (invalidLogin(error)) {
      eventBus.dispatch('logout');
    } else if (isValidationError(error)) {
      message += '<ul>'
      message += error.response.data.errors.map(str => {
        str = str.replace('body[', '');
        str = str.replace(']', '');
        return `<li>${str}</li>`;
      })
      message = message.replace(',', '')
      message += '</ul>'
    } else {
      message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
    }
    return Promise.reject(message)
  }
)



export { publicApi, protectedApi };