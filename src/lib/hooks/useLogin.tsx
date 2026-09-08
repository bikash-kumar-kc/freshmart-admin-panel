import authservice from "@/src/services/authservices";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: authservice.login,
    retry: 1,
  });
};
