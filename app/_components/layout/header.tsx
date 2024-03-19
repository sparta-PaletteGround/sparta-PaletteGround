"use client";

interface HeaderNavProps {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUpOpen: boolean;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/image/logo-curve.png";

import YellowLinkBtn from "../common/Button";
import LoginModal from "../AuthModal/LoginModal";
import SignupModal from "../AuthModal/SignupModal";
import { supabase } from "@/app/_utils/supabase/supabase";

const HeaderNav = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  const handleOnClickToLogin = () => {
    setIsLoginOpen((prev) => !prev);
    console.log("isLoginOpen", isLoginOpen);
  };

  const handleOnClickToSignUp = () => {
    setIsSignUpOpen((prev) => !prev);
    console.log("isSignUpOpen", isSignUpOpen);
  };

  const handleOnClickLogout = async () => {
    alert("로그아웃 하러 갑니당");
    const { error } = await supabase.auth.signOut();
  };

  return (
    <section className="bg-PurpleDark min-h-40 flex justify-end items-center">
      <div className="flex flex-col justify-center items-center p-5 gap-4 absolute left-1/2 transform -translate-x-1/2">
        <Image src={Logo} alt="로고 이미지" width="200" />
        <nav className="flex flex-rows gap-5">
          <YellowLinkBtn href="/" text="🖌️그림그리기" />
          <YellowLinkBtn href="/" text="🎮게임하기" />
        </nav>
      </div>
      <div>
        {/* {isLogin ?  :} */}

        {/* 로그인 하기 전 */}
        <div className="flex items-center mr-10 gap-4">
          <p
            className="text-white cursor-pointer"
            onClick={handleOnClickToLogin}
          >
            로그인
          </p>
          <p
            className="text-white cursor-pointer"
            onClick={handleOnClickToSignUp}
          >
            회원가입
          </p>
        </div>

        {/* 로그인 상태 */}
        {/* <div className="flex items-center mr-10 gap-4">
        <p className="text-white cursor-pointer" onClick={handleOnClickLogout}>로그아웃</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
          alt="사용자 이미지"
          width="50"
          height="50"
        />
      </div> */}
      </div>
      <LoginModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        isSignUpOpen={isSignUpOpen}
      />
      <SignupModal
        isSignUpOpen={isSignUpOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        isLoginOpen={isLoginOpen}
      />
    </section>
  );
};

export default HeaderNav;
