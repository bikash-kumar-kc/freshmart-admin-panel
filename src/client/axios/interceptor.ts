import Cookies from "js-cookie";
import { api } from "./client";

// intercepting request to attach token
api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  console.log("fghjk")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
