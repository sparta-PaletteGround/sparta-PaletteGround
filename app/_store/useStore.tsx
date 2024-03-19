import { create } from "zustand";

export interface LoginState {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  EmailChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  NicknameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordCheckChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginStore = create((set) => ({
  email: "",
  EmailChangeHandler: (e) => set({ email: e.target.value }),
}));

export default LoginStore;
