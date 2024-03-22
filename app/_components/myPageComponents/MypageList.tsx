'use client';
import React from 'react';

const MypageList = () => {
  return (
    <>
      <section className="border-2 bg-PurpleLight rounded-lg w-[900px] ml-20 mt-36">
        <div className="flex gap-8 p-8 font-bold text-ml">
          <span className="cursor-pointer bg-YellowDark border border-transparent rounded-lg p-1 hover:text-PurpleDark hover:scale-105 transition-transform ease-in-out">
            🖌️ 내 그림 목록
          </span>
          <span className="cursor-pointer bg-YellowDark border border-transparent rounded-lg p-1 hover:text-PurpleDark hover:scale-105 transition-transform ease-in-out">
            🧡 좋아요한 그림 목록
          </span>
        </div>
        <div className="grid grid-cols-2 gap-10 ml-5 mr-5 mb-10 ">
          {/* 카드 */}
          <div className="w-84 h-80 flex flex-col bg-white items-center border-2 rounded-xl border-white cursor-pointer hover:scale-105 transition-transform ease-in-out">
            {/* 이미지 */}
            <div className="w-4/5 h-52 table text-center ">
              <div className="table-cell align-middle">
                <img
                  className="max-w-[320px] max-h-[320px] "
                  src="https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/image_1711106600621.png"
                />
              </div>
            </div>
            <div className="flex flex-col text-center p-2 gap-2">
              <span className="font-bold text-xl text-PurpleMedium ">
                벚꽃 나들이
              </span>
              <span className="text-ml text-PurpleLight">
                🌸 벌써 좀 있으면 벚꽃 시즌 🌸
              </span>
            </div>
          </div>

          <div className="w-84 h-80 border-2 rounded-lg border-black">
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MypageList;
