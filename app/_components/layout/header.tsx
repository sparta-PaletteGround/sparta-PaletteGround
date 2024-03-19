import Image from "next/image";
import React from "react";
import Logo from "@/public/image/logo-curve.png";
import Link from "next/link";
import YellowLinkBtn from "../common/Button";

const HeaderNav = () => {
  return (
    <section className="bg-PurpleDark min-h-40 flex justify-end items-center">
      <div className="flex flex-col justify-center items-center p-5 gap-4 absolute left-1/2 transform -translate-x-1/2">
        <Image src={Logo} alt="로고 이미지" width="200" />
        <nav className="flex flex-rows gap-5">
          <YellowLinkBtn href="/" text="🖌️그림그리기" />
          <YellowLinkBtn href="/" text="🎮게임하기" />
        </nav>
      </div>
      <div className="flex mr-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
          alt="사용자 이미지"
          width="50"
          height="50"
        />
      </div>
    </section>
  );
};

export default HeaderNav;
