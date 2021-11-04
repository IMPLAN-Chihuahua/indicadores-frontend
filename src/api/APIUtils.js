import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});


// TODO: intercept any response error and
// check if token has expired to log out user

export default api;