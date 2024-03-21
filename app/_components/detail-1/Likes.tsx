"use client";

import { useState } from "react";

import type { PostProps } from "@/app/_types/detail1/posts";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  countLikesNumber,
  deleteLike,
  insertLike,
  isCheckLikeState,
} from "../detail-api/likes-api";

const Likes = ({ id, post }: PostProps) => {
  const [isLike, setIsLike] = useState(false);
  // 현재 그림의 url
  const drawingUrl = post.drawing_url;

  // 화면 렌더링시 1. 현재 유저가 이 그림을 좋아요한 상태인지 확인하기 - 좋아요 상태이면 isLike -> true
  const {
    data: checkLikeState,
    isLoading: checkLikeLoading,
    isError: checkLikeError,
  } = useQuery({
    queryKey: ["checkLike"],
    queryFn: async () => {
      const response = await isCheckLikeState(id);
      response && setIsLike(true);
      return response;
    },
  });

  if (checkLikeLoading) {
    return <div>Loading...</div>;
  }
  if (checkLikeError) {
    return <div>Error</div>;
  }

  // 화면 렌더링시 2. 이 그림의 좋아요 개수 가져오기

  // 좋아요 클릭시
  // - 좋아요 : likes 테이블에 email, id, url 추가, 하트색 변경
  // - 좋아요 취소 : likes 테이블에서 id가 같은 열 삭제
  const handleLikeOnClick = async () => {
    if (!checkLikeState) {
      await insertLike(id, drawingUrl);
      setIsLike((prev) => !prev);
    } else if (checkLikeState) {
      await deleteLike(id);
      setIsLike((prev) => !prev);
    }
  };

  return (
    <>
      {isLike ? (
        <FaHeart
          onClick={handleLikeOnClick}
          className="hover:cursor-pointer text-rose-600"
        />
      ) : (
        <FaRegHeart
          onClick={handleLikeOnClick}
          className="hover:cursor-pointer text-rose-600"
        />
      )}
    </>
  );
};

export default Likes;
