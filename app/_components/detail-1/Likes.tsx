"use client";

import { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getLikesArray, insertDrawingId } from "../detail-api/likes-api";
import { getLoginUserInfo } from "../authComponents/authInfo-api";
import { useQuery } from "@tanstack/react-query";

const Likes = ({ id }: { id: number }) => {
  const [isLike, setIsLike] = useState(false);
  // 임시 email
  const email = "testUserId@test.com";
  // useEffect로 current user email가져오기, setEmail하기, 로그인상태까지 가져오기(현진님 코드 복붙))
  // 아래에서 email 사용하기 (화면 렌더링시 하트 채울지 말지, 좋아요 클릭)

  // 하트 색채운거 어떻게 유지할건지?
  // 로그인 유저의 drawings_array에 id와 일치하는 값 있으면
  // -> setIsLike를 true로!
  const {
    data: likes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["likes"],
    queryFn: () => getLikesArray(email),
  });
  const likes_array = likes?.[0];
  console.log("likes_array", likes_array);

  // 좋아요 클릭시 - 로그인한 유저정보 불러와서 email 뽑기 (로그인 유저정보가 zustand에 있다면 zustand에서 가져오기)
  const handleLikeOnClick = async () => {
    const data = await getLoginUserInfo();
    const loggedInUserEmail = data?.user?.email;
    if (loggedInUserEmail) {
      // 로그인한 유저 있을 경우
      // 1) 임시 useState로 하트 색 바꾸기
      // 2) 임시 email 전달 -> 해당 유저의 drawings_array에 id추가하기 성공
      setIsLike((prev) => !prev);
      await insertDrawingId(email, id);
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
