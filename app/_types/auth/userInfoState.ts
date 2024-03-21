export interface UserInfo {
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  setUser: (userData: {
    email: string;
    nickname: string;
    profileImage: string;
  }) => void;
}
