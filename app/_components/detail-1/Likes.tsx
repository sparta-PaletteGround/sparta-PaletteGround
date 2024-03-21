"use client";

import { useEffect, useState } from "react";

import { PostProps } from "@/app/_types/detail1/posts";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getLoginUserInfo } from "../authComponents/authInfo-api";
import { insertDrawingId, isCheckLikeState } from "../detail-api/likes-api";
import { useQuery } from "@tanstack/react-query";

const Likes = ({ id, post }: PostProps) => {
  const [isLike, setIsLike] = useState(false);
  // 현재 그림의 url
  const drawingUrl = post.drawing_url;

  // 화면 렌더링시
  // 1. 현재 유저가 이 그림을 좋아요한 상태인지 확인하기 - 좋아요 상태이면 isLike -> true
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

  // 2. 이 그림의 좋아요 개수 가져오기

  // ===== 3.20까지 작성한 부분

  // 임시 email
  // const email = "testtest@gmail.com";

  // useEffect로 current user email가져오기, setEmail하기, 로그인상태까지 가져오기(현진님 코드 복붙))
  // 아래에서 email 사용하기 (화면 렌더링시 하트 채울지 말지, 좋아요 클릭)

  // 하트 색채운거 어떻게 유지할건지?
  // 로그인 유저의 drawings_array에 id와 일치하는 값 있으면
  // -> setIsLike를 true로!
  // const {
  //   data: likes,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["likes"],
  //   queryFn: () => getLikesArray(email),
  // });
  // const likes_array = likes?.[0];

  // 좋아요 클릭시 - 로그인한 유저정보 불러와서 email 뽑기 (로그인 유저정보가 zustand에 있다면 zustand에서 가져오기)
  const handleLikeOnClick = async () => {
    const data = await getLoginUserInfo();
    // console.log("data", data);
    const loggedInUserEmail = data?.email;
    if (loggedInUserEmail) {
      // 로그인한 유저 있을 경우
      // 1) 임시 useState로 하트 색 바꾸기
      // 2) 임시 email 전달 -> 해당 유저의 drawings_array에 id추가하기 성공
      setIsLike((prev) => !prev);
      await insertDrawingId(loggedInUserEmail, id);
    } else if (!loggedInUserEmail) {
      // 로그인한 유저 없을 경우
      alert("로그인이 필요합니다.");
      // 로그인 모달창 띄우기?
    }

    // 좋아요 취소 로직도 생각해야함
    // onClick함수를 별도로 두면 될듯
  };

  return (
    <>
      {isLike ? (
        <FaHeart onClick={handleLikeOnClick} className="text-rose-600" />
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
