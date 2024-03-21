"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { supabase } from "@/app/_utils/supabase/supabase";
import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { authClickBtn, authModalInput } from "@/app/_styles/authModalStyle";

const SignupModal = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    isLoginOpen,
    setIsLoginOpen,
    isSignUpOpen,
    setIsSignUpOpen,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleOnSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !nickname || !password || !passwordCheck) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // supabase에 회원정보 저장
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            profileImage:
              "https://cdn-icons-png.flaticon.com/512/848/848006.png",
          },
        },
      });

      if (error) {
        console.log(error);
        alert("회원가입에 실패했습니다.");
        return;
      } else {
        alert("회원가입에 성공했습니다.");
      }

      // 회원가입 성공 시 추가 정보를 Supabase 데이터베이스에 저장
      const { data, error: profileError } = await supabase
        .from("users")
        .insert([
          {
            email,
            nickname,
            profile_img:
              "https://cdn-icons-png.flaticon.com/512/848/848006.png",
          },
        ]);

      if (profileError) {
        console.error("회원 추가 정보 저장에 실패했습니다.", profileError);
        alert("회원가입에 실패했습니다.");
        return;
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다.");
    } finally {
      // 입력 초기화
      setEmail("");
      setNickname("");
      setPassword("");
      setPasswordCheck("");

      setIsSignUpOpen(false); // 회원가입 모달창 닫기
      setIsLoginOpen(true); // 로그인 모달창 열기
    }
  };

  // 회원이신가요? 로그인 페이지로 이동
  const handleOnClickToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };
  return (
    <ModalComponent>
      <h2 className="text-PurpleLight text-xLarge font-extrabold">회원가입</h2>
      <br />
      <form
        onSubmit={handleOnSubmitSignUp}
        className="flex flex-col justify-center "
      >
        <input
          type="email"
          name="email"
          placeholder="이메일 (123@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={authModalInput}
        />

        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={authModalInput}
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호 (최소 6자리 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={authModalInput}
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          style={authModalInput}
        />

        <button type="submit" style={authClickBtn}>
          회원가입
        </button>
      </form>
      <br />
      <div className="flex gap-2 absolute fixed bottom-4">
        <span className="text-zinc-400">이미 회원이신가요?</span>
        <span
          className="cursor-pointer text-zinc-600"
          onClick={handleOnClickToLogin}
        >
          로그인하기
        </span>
      </div>
    </ModalComponent>
  );
};

export default SignupModal;
