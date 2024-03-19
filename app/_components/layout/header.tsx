import Image from "next/image";
import React from "react";
import Logo from "@/public/image/logo-curve.png";
import Link from "next/link";

const HeaderNav = () => {
  return (
    <section className="bg-PurpleDark min-h-40 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        <Image src={Logo} alt="로고 이미지" width="200" />
        <nav className="flex flex-rows gap-5">
          <Link href="/" className="bg-YellowDark px-2.5 py-1 rounded-xl">
            🖌️그림그리기
          </Link>
          <Link href="/" className="bg-YellowDark px-2.5 py-1 rounded-xl">
            🎮게임하기
          </Link>
        </nav>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="사용자 이미지"
          width="40"
          height="40"
        />
      </div>
    </section>
  );
};

export default HeaderNav;
