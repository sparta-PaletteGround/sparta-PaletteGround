import { useEffect } from 'react';
import { useAuthStore, useUserInfoStore } from '../../_store/authStore';
import { getLoginUserInfo } from '../../_components/auth/authInfo-api';

export const useLoggedIn = () => {
  const { setIsLoggedIn } = useAuthStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { setUser } = useUserInfoStore();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userInfo = await getLoginUserInfo();

      if (userInfo !== null) {
        const email = userInfo?.user_metadata?.email;
        const nickname = userInfo?.user_metadata?.nickname;
        const profileImage = userInfo?.user_metadata?.profileImage;

        // Zustand useUserInfoStore에 저장
        setUser({ email, nickname, profileImage });

        // data가 존재 시, 로그인 상태로 설정
        console.log(
          '사용자 정보가 있습니다. 사용자는 로그인했습니다.',
          userInfo
        );
        setIsLoggedIn(true);
      } else {
        // data가 존재하지 않으면, 로그아웃 상태로 설정
        console.log(
          '사용자 정보가 없습니다. 사용자는 로그아웃했습니다.',
          userInfo
        );
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return isLoggedIn;
};
