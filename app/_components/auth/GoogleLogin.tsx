import { supabase } from "@/app/_utils/supabase/supabase";
import React from "react";
import { getLoginUserInfo } from "./authInfo-api";
import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { socialAuthClickBtn } from "@/app/_styles/authModalStyle";
import Image from "next/image";
import googleLogo from "@/public/image/google.png";

const GoogleLogin = () => {
  const { setIsLoggedIn, setIsLoginOpen } = useAuthStore();
  const { email, googleName, googleProfileImg } = useUserInfoStore();

  //Google 로그인
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

      // 이미 supabase에 등록한 로그인 정보 확인
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

      if (userError) {
        console.error("구글 로그인 사용자 정보 조회 중 에러", userError);
        alert("로그인 중 오류가 발생했습니다.");
        return;
      }

      // 등록된 유저가 아닌 경우, 새로운 정보 저장
      if (!existingUser) {
        // 구글 로그인한 유저 정보가 supabase에 없으면, 유저 정보 추가
        const { error: profileError } = await supabase.from("users").insert([
          {
            email: email,
            nickname: googleName,
            profile_img: googleProfileImg,
          },
        ]);
        if (profileError) {
          console.error("구글 로그인 정보 저장에 실패했습니다.", profileError);
          alert("구글 로그인에 실패했습니다.");
          return;
        }
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
