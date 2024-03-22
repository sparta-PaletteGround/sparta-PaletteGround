import { create } from "zustand";
import { AuthState } from "../_types/auth/authStateType";
import { UserInfo } from "../_types/auth/userInfoState";

export const useAuthStore = create<AuthState>()((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
  isSignUpOpen: false,
  setIsSignUpOpen: (isOpen) => set({ isSignUpOpen: isOpen }),
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));

export const useUserInfoStore = create<UserInfo>()((set) => ({
  email: null,
  nickname: null,
  profileImage: null,
  googleName: null,
  googleProfileImg: null,
  setUser: (userInfo) => set(userInfo),
}));
