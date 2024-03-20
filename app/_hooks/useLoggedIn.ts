import { useAuthStore } from "../_store/authStore";

export const useLoggedIn = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn;
};
