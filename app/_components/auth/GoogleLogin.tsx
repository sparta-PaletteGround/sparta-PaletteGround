import { supabase } from "@/app/_utils/supabase/supabase";
import React from "react";
import { getLoginUserInfo } from "./authInfo-api";
import { useAuthStore } from "@/app/_store/authStore";
import { socialAuthClickBtn } from "@/app/_styles/authModalStyle";
import Image from "next/image";
import googleLogo from "@/public/image/google.png";

const GoogleLogin = () => {
  const { setIsLoggedIn, setIsLoginOpen } = useAuthStore();

  //Google 로그인 (구글 로그인 보류)
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error(error);
      } else {
        // 구글 로그인 성공 시에만 로그인 상태를 변경하고 모달을 닫음
        setIsLoggedIn(true); // 로그인 상태 업데이트
        setIsLoginOpen(false); // 로그인 모달창 닫기
        // alert("로그인 되었습니다.");
        getLoginUserInfo();
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={socialAuthClickBtn}
      className="flex justify-center items-center gap-4"
    >
      <Image src={googleLogo} alt="google log" className="w-5 h-5" />
      <span className="text-zinc-600">Google Login</span>
    </button>
  );
};

export default GoogleLogin;
