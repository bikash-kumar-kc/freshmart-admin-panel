import FREEZE_API_CONSTANTS from "@/client/axios/constant";
import { api } from "../client/axios/client";
import { IAuthUser, ILoginPayload } from "../types/auth.user.type";
import Cookies from "js-cookie";

interface IAuthUserExtends {
  user: IAuthUser;
}

class AuthServices {
  getCurrentUser = async () => {
    const { data } = await api.get<IAuthUserExtends>(`/auth`);
    return data;
  };

  login = async (payload: ILoginPayload) => {
    const refinedPayload = {
      ...payload,
      isVendor: false,
    };
    const { data } = await api.post<IAuthUserExtends>(
      `/auth/login`,
      refinedPayload,
    );
    return data;
  };

  logout = async () => {
    // Cookies.remove(FREEZE_API_CONSTANTS.ACCESSTOKENAME);
  };
}

const authservice = new AuthServices();

export default authservice;
