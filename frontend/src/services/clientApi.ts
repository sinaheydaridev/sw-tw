import axios, { AxiosInstance } from "axios";

const clientApi : AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
});


export default clientApi;