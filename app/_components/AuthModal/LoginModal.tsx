"use client";

import React, { useState } from "react";
import logo from "@/public/image/logo-line.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignIn = async () => {
    // try {
    const { data, error } = await supabase.auth.signInWithPassword({
      // 로그인 요청
      email,
      password,
    });
    //   if (error) throw error;
    //   router.push("/"); // 성공 시 홈페이지로 이동
    // } catch (error) {
    //   console.error("로그인 에러:", error.message);
    // }
  };

  // 로그아웃 기능
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="modal, flex flex-col justify-center items-center bg-Background w-96 h-[500px]">
        <Link href="/">
          <Image src={logo as StaticImageData} alt="로고이미지" />
        </Link>
        <h2>로그인</h2>
        <br />

        <input
          type="email"
          value="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일(123@gmail.com)을 입력하세요."
        />
        <br />
        <input
          type="password"
          value="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
        />
        <br />
        <button>Google Login</button>
        <br />
        <button>Kakao Login</button>
        <br />
        <button type="button" onClick={handleSignIn}>
          로그인하기
        </button>
        <br />
        <div>
          아직 회원이 아니신가요? <button>회원가입</button>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
