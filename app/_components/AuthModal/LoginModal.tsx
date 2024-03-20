"use client";

interface LoginModalProps {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUpOpen: boolean;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

import React, { useState } from "react";
import logo from "@/public/image/logo-line.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

import { supabase } from "@/app/_utils/supabase/supabase";
import { ModalBackground, ModalContainer } from "@/app/_styles/modalStyles";

const LoginModal = ({
  isLoginOpen,
  setIsLoginOpen,
  isSignUpOpen,
  setIsSignUpOpen,
}: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getLoginUserInfo = async () => {
    const { data } = await supabase.auth.getUser();
    console.log(data);
    return data;
  };
  const handleSignIn = async () => {
    const loginUserInfo = await getLoginUserInfo();
    console.log("loginUserInfo", loginUserInfo);
    //   try {
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //       // 로그인 요청
    //       email,
    //       password,
    //     });
    //     console.log("data", data);
    //     if (error) throw error;
    //     alert("로그인이 완료되었습니다.");
    //   } catch (error) {
    //     console.error("로그인 에러:", error);
    //   }
  };

  // 로그인 창 닫기 버튼
  const handleOnCloseBtn = () => {
    setIsLoginOpen(false);
  };

  // 아직 회원이 아니신가요? 회원가입 클릭시
  const handleOnClickToSignUP = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };
  return (
    <div style={isLoginOpen ? ModalBackground : "none"}>
      <section style={ModalContainer}>
        <div className="modal, flex flex-col justify-center items-center bg-Background w-96 h-[500px]">
          <button className="text-black" onClick={handleOnCloseBtn}>
            X
          </button>
          <Link href="/">
            <Image src={logo as StaticImageData} alt="로고이미지" />
          </Link>
          <h2>로그인</h2>
          <br />

          <input
            type="text"
            // value="email"
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일(123@gmail.com)을 입력하세요."
          />
          <br />
          <input
            type="password"
            // value="password"
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요."
          />
          <br />
          <button>Google Login</button>
          <br />
          <button>Kakao Login</button>
          <br />
          <button type="button" onClick={handleSignIn}>
            로그인하기
          </button>
          <br />
          <div>
            아직 회원이 아니신가요?
            <p className="cursor-pointer" onClick={handleOnClickToSignUP}>
              회원가입
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginModal;
