import Link from 'next/link';
import React from 'react';

const MypageNonAuth = () => {
  return (
    <div className="border bg-PurpleLight h-screen flex flex-col items-center justify-center gap-20">
      <div className="text-[40px] font-bold text-PurpleDark">
        로그인이 필요한 서비스 입니다.
      </div>
      <div className="text-[30px] border-4  rounded-xl text-center font-bold ">
        <Link className="p-10 " href={'/'}>
          메인으로
        </Link>
      </div>
    </div>
  );
};

export default MypageNonAuth;
