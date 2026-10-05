import authservice from "@/services/authservices";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authservice.logout,
    retry: 1,
  });
};