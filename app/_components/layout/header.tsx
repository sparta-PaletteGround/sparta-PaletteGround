"use client";

import { useLoggedIn } from "@/app/_hooks/login/useLoggedIn";
import { useAuthStore } from "@/app/_store/authStore";
import Logo from "@/public/image/logo-curve.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginModal from "../auth/modals/LoginModal";
import SignupModal from "../auth/modals/SignupModal";
import { YellowLinkBtn } from "../common/Button";
import LoggedIn from "./header-loggedIn";

const HeaderNav = () => {
  const router = useRouter();
  const { isLoginOpen, setIsLoginOpen, isSignUpOpen, setIsSignUpOpen } =
    useAuthStore();

  /** 로그인 상태인지 확인 */
  const isLoggedIn = useLoggedIn();

  /** 로그인, 회원가입 클릭 시 모달창 오픈 */
  const handleOnClickToLogin = () => {
    setIsLoginOpen(true);
  };

  const handleOnClickToSignUp = () => {
    setIsSignUpOpen(true);
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
    <section className="bg-PurpleDark min-h-40 flex justify-end items-center border-b">
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
            <p className="cursor-pointer" onClick={handleOnClickToLogin}>
              로그인
            </p>
            <p className="cursor-pointer" onClick={handleOnClickToSignUp}>
              회원가입
            </p>
          </div>
        ) : (
          /* 로그인 상태 */
          <LoggedIn />
        )}
      </div>
      {isLoginOpen && <LoginModal />}
      {isSignUpOpen && <SignupModal />}
    </section>
  );
};

export default HeaderNav;
