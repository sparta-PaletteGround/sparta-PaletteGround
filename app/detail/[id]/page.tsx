"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  console.log("id", id);

  return (
    <>
      <div className="w-full h-28 bg-yellow-200 mb-10"></div>
      <section className="flex gap-12 justify-center">
        {/* 좌측 박스 Wrapper */}
        <div className="w-[700px]">
          {/* 좌측 상단 박스 */}
          <div className="w-full h-[440px] bg-slate-200 mb-6 rounded-md"></div>
          {/* 좌측 하단 댓글창 */}
          <p>
            댓글
            <span className="text-rose-600 ml-2">3</span>
          </p>
          <div className="w-full h-[100px] bg-yellow-200 my-2 pt-2 pl-3 rounded-md">
            <p>닉네임 : </p>
            <p>댓글을 입력해주세요.</p>
          </div>
          <div className="flex justify-end">
            <button className="bg-amber-500 w-14 h-6 text-sm rounded-md">
              등록하기
            </button>
          </div>
          {/* 댓글 리스트 Wrapper */}
          <div>
            {/* 댓글 map 돌기 */}
            {/* 댓글 item 1 */}
            <div className="w-full h-[100px] flex flex-col justify-between bg-yellow-200 my-2 py-2 pl-3 rounded-md">
              <div>
                <p>닉네임 : test</p>
                <p>This comment is for the testing.</p>
              </div>
              <div className="flex justify-end gap-2 mr-4">
                <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
                  수정
                </button>
                <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
                  삭제
                </button>
              </div>
            </div>
            {/* 댓글 item 2 */}
            <div className="w-full h-[100px] flex flex-col justify-between bg-yellow-200 my-2 py-2 pl-3 rounded-md">
              <div>
                <p>닉네임 : test</p>
                <p>This comment is for the testing.</p>
              </div>
              <div className="flex justify-end gap-2 mr-4">
                <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
                  수정
                </button>
                <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
                  삭제
                </button>
              </div>
            </div>
            {/* 댓글 item 3 */}
            <div className="w-full h-[100px] flex flex-col justify-between bg-yellow-200 my-2 py-2 pl-3 rounded-md">
              <div>
                <p>닉네임 : test</p>
                <p>This comment is for the testing.</p>
              </div>
              <div className="flex justify-end gap-2 mr-4">
                <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
                  수정
                </button>
                <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 우측 박스 Wrapper */}
        <div className="w-[290px] h-[440px] flex flex-col justify-between bg-slate-200 p-4 rounded-md">
          {/* 프로필 이미지, 닉네임, 별 */}
          <div className=" flex gap-4 items-center">
            <img
              className="w-12 object-cover"
              src="https://velog.velcdn.com/images/innes_kwak/post/24d0e46e-8dd7-4e59-becd-52447e2efeb6/image.png"
              alt=""
            />
            <p className="text-lg font-semibold">닉네임</p>
            <p>⭐️</p>
          </div>
          {/* 날짜, 제목, 설명, 댓글, 좋아요 */}
          <div className="flex flex-col my-4 gap-2">
            <p className="mb-7 text-sm">날짜 2024-03-18</p>
            <p className="text-xl font-semibold">제목 : 그림 제목</p>
            <p className="text-sm">
              설명 : 이 그림은 완전 잘그렸고 어쩌고 저쩌고 우주여행
            </p>
            <p className="mt-7">
              댓글 <span className="text-rose-600 mr-2">3</span>
              좋아요 <span className="text-rose-600">20</span>
            </p>
          </div>
          {/* 유저가 그린 그림 3 */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">🏆 유저가 그린 그림 Top 3</p>
            <div className="w-72 h-20  flex flex-wrap gap-2 items-center">
              <div className="w-20 h-full bg-white"></div>
              <div className="w-20 h-full bg-white"></div>
              <div className="w-20 h-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
