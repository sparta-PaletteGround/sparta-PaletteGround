export interface UserInfo {
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  googleName: string | null;
  googleProfileImg: string | null;
  setUser: (userData: {
    email: string | null;
    nickname: string | null;
    profileImage: string | null;
    googleName: string | null;
    googleProfileImg: string | null;
  }) => void;
}
