import { api } from "../client/axios/client";
import { IAuthUser } from "../types/auth.user.type";

interface IAuthUserExtends {
  user: IAuthUser;
}

class AuthServices {
  getCurrentUser = async () => {
    const { data } = await api.get<IAuthUserExtends>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    );
    return data;
  };
}

const authservice = new AuthServices();

export default authservice;
