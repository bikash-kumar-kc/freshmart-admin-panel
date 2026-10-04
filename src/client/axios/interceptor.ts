import Cookies from "js-cookie";
import { api } from "./client";
import FREEZE_API_CONSTANTS from "./constant";

// intercepting request to attach token
api.interceptors.request.use((config) => {
  const token = Cookies.get(FREEZE_API_CONSTANTS.ACCESSTOKENAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
