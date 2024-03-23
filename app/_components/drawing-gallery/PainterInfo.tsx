"use client";

import React from "react";

import type { User } from "@/app/_types/user";
import type { Posts } from "@/app/_types/detail1/posts";
import { useQuery } from "@tanstack/react-query";
import { getPainterComment } from "@/app/_api/getPosts";

const PainterInfo = ({
  userData,
  drawingData,
}: {
  userData: User;
  drawingData: Posts[];
}) => {
  /** 해당 유저의 comment 데이터 불러오기 */
  const { data: commentData, isLoading: loadingComments } = useQuery({
    queryKey: ["painterComment"],
    queryFn: async () => {
      const data = await getPainterComment(userData?.email);
      return data;
    },
  });

  if (loadingComments) return <div>데이터 로드 중</div>;
  if (!commentData) return <div>사용자 데이터를 불러오지 못했습니다.</div>;

  return (
    <section className="w-[700px] h-[100px] flex p-5 gap-5 justify-center">
      <div>
        <img
          src={userData?.profile_img}
          alt="프로필 이미지"
          width={60}
          height={60}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="flex items-center font-bold text-xLarge">
        {userData.nickname}
      </div>
      <div className="w-[1px] bg-black mt-3 mb-3"></div>
      <div className="flex gap-5 items-center text-large">
        <div>
          등록한 드로잉{" "}
          <span className="text-PurpleMedium font-bold">
            {drawingData.length}
          </span>
          건
        </div>
        <div>
          작성한 댓글{" "}
          <span className="text-PurpleMedium font-bold">
            {commentData.length}
          </span>
          개
        </div>
      </div>
    </section>
  );
};

export default PainterInfo;
