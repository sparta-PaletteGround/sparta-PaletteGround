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
import LoginModal from "../AuthModal/LoginModal";
import SignupModal from "../AuthModal/SignupModal";
import { supabase } from "@/app/_utils/supabase/supabase";
import { YellowLinkBtn } from "../common/Button";
import Link from "next/link";

const HeaderNav = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  // 로그인 상태 관리 (로그인이 안 된 상태 : false / 로그인이 된 상태 : true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleOnClickToLogin = () => {
    setIsLoginOpen(true);
    // console.log("isLoginOpen", isLoginOpen);
  };

  const handleOnClickToSignUp = () => {
    setIsSignUpOpen(true);
    // console.log("isSignUpOpen", isSignUpOpen);
  };

  const handleOnClickLogout = async () => {
    // alert("로그아웃 하러 갑니당");
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsLoggedIn(false);
    }
  };

  return (
    <section className="bg-PurpleDark min-h-40 flex justify-end items-center">
      <div className="flex flex-col justify-center items-center p-5 gap-4 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <Image src={Logo} alt="로고 이미지" width="200" />
        </Link>

        <nav className="flex flex-rows gap-5">
          <YellowLinkBtn href="/" text="🖌️그림그리기" />
          <YellowLinkBtn href="/" text="🎮게임하기" />
        </nav>
      </div>
      <div>
        {!isLoggedIn ? (
          /* 로그인 하기 전 */
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
        ) : (
          /* 로그인 상태 */
          <div className="flex items-center mr-10 gap-4">
            <p
              className="text-white cursor-pointer"
              onClick={handleOnClickLogout}
            >
              로그아웃
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
              alt="사용자 이미지"
              width="50"
              height="50"
            />
          </div>
        )}
      </div>
      {isLoginOpen && (
        <LoginModal
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
          isSignUpOpen={isSignUpOpen}
          setIsSignUpOpen={setIsSignUpOpen}
        />
      )}
      {isSignUpOpen && (
        <SignupModal
          isSignUpOpen={isSignUpOpen}
          setIsSignUpOpen={setIsSignUpOpen}
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      )}
    </section>
  );
};

export default HeaderNav;
