import { socialAuthClickBtn } from "@/app/_styles/authModalStyle";
import React from "react";
import kakaoLogo from "@/public/image/kakao.png";
import Image from "next/image";

const KakaoLogin = () => {
  return (
    <button
      style={socialAuthClickBtn}
      className="flex justify-center items-center gap-4"
    >
      <Image src={kakaoLogo} alt="google log" className="w-6 h-6" />
      <span className="text-zinc-600">Kakao Login</span>
    </button>
  );
};

export default KakaoLogin;
