"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import logo from "@/public/image/logo-line.png";
import Link from "next/link";
import { supabase } from "@/app/_utils/supabase/supabase";
import { ModalBackground, ModalContainer } from "@/app/_styles/modalStyles";

interface SignupModalProps {
  isSignUpOpen: boolean;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupModal = ({
  isSignUpOpen,
  setIsSignUpOpen,
  isLoginOpen,
  setIsLoginOpen,
}: SignupModalProps) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

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
      } else {
        alert("회원가입 되었습니다.");
        // setIsSignUpOpen(false); // 회원가입 여부 false(=로그인 페이지)로 설정

        //   // 회원가입 성공 시 사용자 추가 정보를 Supabase 데이터베이스에 저장
        //   const { data, error: profileError } = await supabase
        //     .from("users")
        //     .insert([
        //       {
        //         email,
        //         nickname,
        //         profileImage,

        //       },
        //     ]);
        //   if (profileError) {
        //     throw profileError;
        //   }
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
    }
  };

  const handleOnCloseBtn = () => {
    setIsSignUpOpen(false);
  };
  const handleOnClickToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };
  return (
    // <div className="z-10">
    //   <section className="z-[100] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">

    <div style={isSignUpOpen ? ModalBackground : "none"}>
      <section style={ModalContainer}>
        <div className="modal, flex flex-col justify-center items-center bg-Background w-96 h-[500px]">
          <button className="text-black" onClick={handleOnCloseBtn}>
            X
          </button>
          <Link href="/">
            <Image src={logo as StaticImageData} alt="로고이미지" />
          </Link>
          <h2>회원가입</h2>
          <form onSubmit={handleOnSubmitSignUp}>
            <input
              type="email"
              name="email"
              placeholder="이메일(123@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="비밀번호 (최소 6자리 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <br />
            <button className="border-solid border-2" type="submit">
              회원가입 하기
            </button>
          </form>

          <div>
            이미 회원이신가요?
            <p className="cursor-pointer" onClick={handleOnClickToLogin}>
              로그인
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupModal;
