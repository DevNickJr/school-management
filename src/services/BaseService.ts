import axios from "axios";
import appConfig from "@/configs/app.config";
// import { apiRefreshToken } from "./AuthService";


const BaseService = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
})

const NoAuthServcie = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
})

BaseService.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log("config", config)
  // let user: IAuthContext = JSON.parse(localStorage.getItem("user") || "{}");
  // config.headers.Authorization = `Bearer ${user.accessToken}`
  return config;
}, function (error) {
  console.log("request error", error)
  // Do something with request error
  return Promise.reject(error);
});



export default BaseService
export {
  NoAuthServcie
}
