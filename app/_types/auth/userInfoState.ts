export interface UserInfo {
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  setUser: (userData: {
    email: string | null;
    nickname: string | null;
    profileImage: string | null;
  }) => void;
}
