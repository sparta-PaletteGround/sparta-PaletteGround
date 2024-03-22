"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/app/_store/authStore";
import type { PostProps } from "@/app/_types/detail1/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  deleteLike,
  insertLike,
  isCheckLikeState,
} from "../detail-api/likes-api";

const Likes = ({ id, post }: PostProps) => {
  const [isLike, setIsLike] = useState(false);
  // 로그인, 로그아웃했을때 콘솔창이 바로 바뀌지 않고 새로고침해야 바뀌는데 이거 활용해도 되는건지?
  // const email = useUserInfoStore((state) => state.email);
  // console.log("email", email);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoginOpen = useAuthStore((state) => state.setIsLoginOpen);
  const queryClient = useQueryClient();

  // 현재 그림의 url
  const drawingUrl = post.drawing_url;

  // 화면 렌더링시 - 로그인 상태일때만 이미 좋아요한 그림인지 미리 확인하기
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const response = await isCheckLikeState(id);
          setIsLike(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else if (!isLoggedIn) {
      setIsLike(false);
    }
  }, [id, isLoggedIn]);

  const { mutate: insertLikeMutation } = useMutation({
    mutationFn: ({ id, drawingUrl }: { id: number; drawingUrl: string }) =>
      insertLike(id, drawingUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["countLikesNumber"],
      });
    },
  });

  const { mutate: deleteLikeMutation } = useMutation({
    mutationFn: (id: number) => deleteLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["countLikesNumber"],
      });
    },
  });

  // 좋아요 클릭시
  // - 좋아요 : likes 테이블에 email, id, url 추가, 하트색 변경
  // - 좋아요 취소 : likes 테이블에서 email, id가 같은 열 삭제
  const handleLikeOnClick = async () => {
    if (!isLike) {
      if (isLoggedIn) {
        insertLikeMutation({ id, drawingUrl });
        setIsLike((prev) => !prev);
      } else if (!isLoggedIn) {
        setIsLoginOpen(true);
      }
    } else if (isLike) {
      deleteLikeMutation(id);
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
