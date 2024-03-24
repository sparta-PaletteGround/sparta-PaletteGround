import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { socialAuthClickBtn } from "@/app/_styles/authModalStyle";
import { supabase } from "@/app/_utils/supabase/supabase";
import googleLogo from "@/public/image/google.png";
import Image from "next/image";
import { getLoginUserInfo } from "./authInfo-api";
import { PainterInfo } from "@/app/_types/detail1/posts";

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
          // redirectTo: `http://localhost:3000/auth/confirm/google`,
        },
      });

      if (error) {
        console.error(error);
      } else {
        // 구글 로그인 성공 시에만 로그인 상태를 변경하고 모달을 닫음
        sessionStorage.setItem("email", `${email}`);
        sessionStorage.setItem("email", `${googleName}`);
        sessionStorage.setItem("email", `${googleProfileImg}`);

        setIsLoggedIn(true); // 로그인 상태 업데이트
        setIsLoginOpen(false); // 로그인 모달창 닫기

        // 현재 url 확인...?
        // const url = new URL(window.location.href);
        // const accessToken = url.searchParams.get("access_token");
        // console.log("Access Token:", accessToken);

        // alert("로그인 되었습니다.");
        getLoginUserInfo();
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // sessionStorage에 저장?
  // sessionStorage.setItem("email", email);
  // sessionStorage.setItem("nickname", googleName);
  // sessionStorage.setItem("profileImage", googleProfileImg);

  // 이미 supabase에 등록한 로그인 정보 확인
  // const { data: existingUser, error: findUserError } = supabase
  //   .from("users")
  //   .select("email")
  //   .eq("email", email)
  //   .single();
  // console.log("existingUser", existingUser);

  // if (findUserError) {
  //   console.error("구글 로그인 사용자 정보 조회 중 에러", findUserError);
  //   alert("로그인 중 오류가 발생했습니다.");
  //   return;
  // }

  // // // 등록된 유저가 아닌 경우, 새로운 정보 저장
  // if (!existingUser) {
  //   // 구글 로그인한 유저 정보가 supabase에 없으면, 유저 정보 추가
  //   const { data, error: insertError } = supabase.from("users").insert([
  //     {
  //       email: email,
  //       nickname: googleName,
  //       profile_img: googleProfileImg,
  //     },
  //     // { onConflict: "email", ignoreDuplicates: true },
  //   ]);
  //   if (insertError) {
  //     console.error("구글 로그인 정보 저장에 실패했습니다.", insertError);
  //     alert("구글 로그인에 실패했습니다.");
  //     return;
  //   }
  // }

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
