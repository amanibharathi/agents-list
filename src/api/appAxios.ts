import axios from "axios";
import getHostAPIUrl from "./appConfig";
//import { clearTokenAndUserData } from "../utils/functions/tokenAndUserData";

export default function appAxios() {
  const axiosCreate = axios.create({
    baseURL: getHostAPIUrl(),
    timeout: 30000,
    responseType: "json",
  });

  // axiosCreate.interceptors.response.use(
  //   (res) => res,
  //   (err) => {
  //     if (err.response?.status === 403) {
  //       clearTokenAndUserData();
  //       window.location.href = "/login";
  //     }

  //     return Promise.reject(err);
  //   }
  // );

  return axiosCreate;
}
