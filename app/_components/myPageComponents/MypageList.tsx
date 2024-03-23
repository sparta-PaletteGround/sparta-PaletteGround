'use client';
import React, { useState } from 'react';
import MyPageMyWrite from './MyPageMyWrite';
import MyPageLikeList from './MyPageLikeList';

const MypageList = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <section className="border-2 bg-PurpleLight rounded-lg w-[900px] ml-20 mt-36">
        <div className="flex gap-8 p-8 font-bold text-ml">
          <span
            className="cursor-pointer bg-YellowDark border border-transparent rounded-lg p-1 hover:text-PurpleDark hover:scale-105 transition-transform ease-in-out"
            onClick={() => setToggle(true)}
          >
            🖌️ 내 그림 목록
          </span>
          <span
            className="cursor-pointer bg-YellowDark border border-transparent rounded-lg p-1 hover:text-PurpleDark hover:scale-105 transition-transform ease-in-out"
            onClick={() => setToggle(false)}
          >
            🧡 좋아요한 그림 목록
          </span>
        </div>
        <div className="grid grid-cols-2 gap-10 ml-5 mr-5 mb-10 ">
          {/* 카드 */}
          {toggle ? <MyPageMyWrite /> : <MyPageLikeList />}
        </div>
      </section>
    </>
  );
};

export default MypageList;
