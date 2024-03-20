import { create } from "zustand";

interface AuthState {
  isLoginOpen: boolean;
  isSignUpOpen: boolean;
  isLoggedIn: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  setIsSignUpOpen: (isOpen: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
  isSignUpOpen: false,
  setIsSignUpOpen: (isOpen) => set({ isSignUpOpen: isOpen }),
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));
