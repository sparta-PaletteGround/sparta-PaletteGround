"use client";

import { useAuthStore } from "@/app/_store/authStore";
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

  const handleSignIn = async () => {
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

  // 아직 회원이 아니신가요? 회원가입 클릭시
  const handleOnClickToSignUP = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <ModalComponent>
      <h2>로그인</h2>
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일(123@gmail.com)을 입력하세요."
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요."
      />
      <br />
      <button onClick={handleGoogleLogin}>Google Login</button>
      <button>Kakao Login</button>
      <br />
      <button type="button" onClick={handleSignIn}>
        로그인하기
      </button>
      <br />
      <div className="flex gap-2">
        <p>아직 회원이 아니신가요?</p>
        <p className="cursor-pointer" onClick={handleOnClickToSignUP}>
          회원가입
        </p>
      </div>
    </ModalComponent>
  );
};

export default LoginModal;
