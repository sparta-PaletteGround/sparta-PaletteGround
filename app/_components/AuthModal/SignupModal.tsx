import Image, { StaticImageData } from "next/image";
import React from "react";
import logo from "@/public/image/logo-line.png";

const SignupModal = () => {
  // const handleOnClickMoveToLogin =
  return (
    <section className="position : absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="modal, flex flex-col justify-center items-center bg-Background w-96 h-[500px]">
        <Image src={logo as StaticImageData} alt="로고이미지" />
        <h2>회원가입</h2>

        <input
          type="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <br />
        <input
          type="text"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="닉네임"
        />
        <br />
        <input
          type="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <br />
        <input
          type="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <br />

        <button className="border-solid border-2">회원가입 하기</button>
        <br />
        <div>
          이미 회원이신가요? <button>로그인</button>
        </div>
      </div>
    </section>
  );
};

export default SignupModal;
