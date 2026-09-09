import { api } from "../client/axios/client";
import { IAuthUser, ILoginPayload } from "../types/auth.user.type";

interface IAuthUserExtends {
  user: IAuthUser;
}

class AuthServices {
  getCurrentUser = async () => {
    const { data } = await api.get<IAuthUserExtends>(
      `/auth`,
    );
    return data;
  };

  login = async (payload: ILoginPayload) => {
    const { data } = await api.post<IAuthUserExtends>(
      `/auth/login`,
      payload,
    );
    return data;
  };

  logout = async()=>{
    
  }
}

const authservice = new AuthServices();

export default authservice;
