import React from "react";
import logo from "@/public/image/logo-line.png";
import Image, { StaticImageData } from "next/image";

const LoginModal = () => {
  return (
    <section className="position : absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="modal, flex flex-col justify-center items-center bg-Background w-96 h-[500px]">
        <Image src={logo as StaticImageData} alt="로고이미지" />
        <h2>로그인</h2>
        <br />
        <input
          type="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <br />
        <input
          type="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <br />
        <button>Google Login</button>
        <button>Kakao Login</button>
        <br />
        <button>로그인하기</button>
        <br />
        <div>
          아직 회원이 아니신가요? <button>회원가입</button>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
