"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { authClickBtn, authModalInput } from "@/app/_styles/authModalStyle";
import { supabase } from "@/app/_utils/supabase/supabase";
import { useState } from "react";
import { getLoginUserInfo } from "../authInfo-api";
import ModalComponent from "./ModalComponent";

const LoginModal = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    isLoginOpen,
    setIsLoginOpen,
    isSignUpOpen,
    setIsSignUpOpen,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        // 로그인 요청
        email,
        password,
      });

      if (error) {
        console.error(error.message);
        alert("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.");
      } else {
        setIsLoggedIn(true); // 로그인 상태 업데이트
        setIsLoginOpen(false); // 로그인 모달창 닫기

        alert("로그인이 완료되었습니다.");
        getLoginUserInfo();
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // 아직 회원이 아니신가요? 회원가입 클릭시
  const handleOnClickToSignUP = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <ModalComponent>
      <h2 className="text-PurpleLight text-xLarge font-extrabold">로그인</h2>
      <br />
      <form onSubmit={handleSignIn} className="flex flex-col justify-center">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 (123@gmail.com)"
          style={authModalInput}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          style={authModalInput}
        />
        <button type="submit" style={authClickBtn}>
          로그인하기
        </button>
      </form>
      {/* <GoogleLogin />
      <KakaoLogin /> */}
      <br />
      <div className="flex gap-2 absolute  bottom-4">
        <span className="text-zinc-400">아직 회원이 아니신가요?</span>
        <span
          className="cursor-pointer text-zinc-600"
          onClick={handleOnClickToSignUP}
        >
          회원가입
        </span>
      </div>
    </ModalComponent>
  );
};

export default LoginModal;
