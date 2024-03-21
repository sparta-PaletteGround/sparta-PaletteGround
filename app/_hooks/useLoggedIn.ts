import { useEffect } from "react";
import { useAuthStore } from "../_store/authStore";
import { getLoginUserInfo } from "../_components/authComponents/authInfo-api";

export const useLoggedIn = () => {
  const { setIsLoggedIn } = useAuthStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userInfo = await getLoginUserInfo();
      if (userInfo !== null) {
        // data가 존재 시, 로그인 상태로 설정
        console.log(
          "사용자 정보가 있습니다. 사용자는 로그인했습니다.",
          userInfo
        );
        setIsLoggedIn(true);
      } else {
        // data가 존재하지 않으면, 로그아웃 상태로 설정
        console.log(
          "사용자 정보가 없습니다. 사용자는 로그아웃했습니다.",
          userInfo
        );
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return isLoggedIn;
};
