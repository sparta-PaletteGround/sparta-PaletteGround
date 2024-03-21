export interface AuthState {
  isLoginOpen: boolean;
  isSignUpOpen: boolean;
  isLoggedIn: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  setIsSignUpOpen: (isOpen: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}
