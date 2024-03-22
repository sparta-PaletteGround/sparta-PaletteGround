"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/image/logo-curve.png";
import defaultUser from "@/public/image/defaultUser.png";
import LoginModal from "../auth/modals/LoginModal";
import SignupModal from "../auth/modals/SignupModal";
import { supabase } from "@/app/_utils/supabase/supabase";
import { YellowLinkBtn } from "../common/Button";
import Link from "next/link";
import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { useLoggedIn } from "@/app/_hooks/login/useLoggedIn";
import { useRouter } from "next/navigation";

const HeaderNav = () => {
  const router = useRouter();
  const {
    setIsLoggedIn,
    isLoginOpen,
    setIsLoginOpen,
    isSignUpOpen,
    setIsSignUpOpen,
  } = useAuthStore();

  /** 로그인한 유저가 있는지 확인 */
  const { setUser } = useUserInfoStore();
  const isLoggedIn = useLoggedIn();

  /** 로그인, 회원가입 클릭 시 모달창 오픈 */
  const handleOnClickToLogin = () => {
    setIsLoginOpen(true);
  };

  const handleOnClickToSignUp = () => {
    setIsSignUpOpen(true);
  };

  /** 로그인한 유저가 로그아웃 클릭 시 */
  const handleOnClickLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      alert("로그아웃 되었습니다.");
      setIsLoggedIn(false);
      setUser({
        email: null,
        nickname: null,
        profileImage: null,
        googleName: null,
        googleProfileImg: null,
      });
    }
  };

  /** 로그인 안된 유저가 그림그리기 메뉴 클릭 시 */
  const handleOnClickGoDrawing = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      router.push("/paint-editor");
    }
  };

  return (
    <section className="bg-PurpleDark min-h-40 flex justify-end items-center">
      <div className="flex flex-col justify-center items-center p-5 gap-4 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <Image src={Logo} alt="로고 이미지" width="200" />
        </Link>

        <nav className="flex flex-rows gap-5">
          <button
            onClick={handleOnClickGoDrawing}
            className="bg-YellowDark px-2.5 py-1 rounded-xl hover:bg-YellowPale"
          >
            🖌️그림그리기
          </button>
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
            <Link href="/mypage">
              <Image
                src={defaultUser}
                alt="사용자 이미지"
                width="50"
                height="50"
              />
            </Link>
          </div>
        )}
      </div>
      {isLoginOpen && <LoginModal />}
      {isSignUpOpen && <SignupModal />}
    </section>
  );
};

export default HeaderNav;
