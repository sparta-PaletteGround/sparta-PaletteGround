"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/image/logo-curve.png";
import LoginModal from "../auth/modals/LoginModal";
import SignupModal from "../auth/modals/SignupModal";
import { supabase } from "@/app/_utils/supabase/supabase";
import { YellowLinkBtn } from "../common/Button";
import Link from "next/link";
import { useAuthStore } from "@/app/_store/authStore";
import { useLoggedIn } from "@/app/_hooks/login/useLoggedIn";

const HeaderNav = () => {
  const {
    setIsLoggedIn,
    isLoginOpen,
    setIsLoginOpen,
    isSignUpOpen,
    setIsSignUpOpen,
  } = useAuthStore();

  // useLoggedIn 훅으로
  const isLoggedIn = useLoggedIn();

  const handleOnClickToLogin = () => {
    setIsLoginOpen(true);
  };

  const handleOnClickToSignUp = () => {
    setIsSignUpOpen(true);
  };

  const handleOnClickLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      alert("로그아웃 되었습니다.");
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
          <YellowLinkBtn href="/paint-editor" text="🖌️그림그리기" />
          <YellowLinkBtn href="/detail-list" text="🖼️보러가기" />
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
      {isLoginOpen && <LoginModal />}
      {isSignUpOpen && <SignupModal />}
    </section>
  );
};

export default HeaderNav;
