import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { handleApiError } from "../errorHandler";
import { showToast } from "@/components/Toast";
import { getApiErrorMessage } from "../utilis/apiError";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 30 * 1000,
    },
  },
  queryCache: new QueryCache({
  onError: (error, query) => {
    if (query.meta?.silent) return;
    showToast.error("Something went wrong", getApiErrorMessage(error));
  },
}),
  mutationCache: new MutationCache({
    onError: (error) => handleApiError(error),
  }),
});
