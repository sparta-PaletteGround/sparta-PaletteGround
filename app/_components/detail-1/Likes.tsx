import { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { insertDrawingId } from "../detail-api/detail-api";

const Likes = ({ id }: { id: number }) => {
  const [isLike, setIsLike] = useState(false);
  // 임시 email
  const email = "testUserId@test.com";

  // 좋아요 클릭시 - 로그인한 유저정보 불러와서 email 뽑기 (로그인 유저정보가 zustand에 있다면 zustand에서 가져오기)
  const handleLikeOnClick = async () => {
    // 로그인한 유저 있을 경우
    // 1) 임시 useState로 하트 색 바꾸기
    setIsLike((prev) => !prev);
    // 2) 임시 email 전달 -> 해당 유저의 drawings_array에 id추가하기 성공
    const res = await insertDrawingId(email, id);
    console.log("res", res);

    // 하트 색채운거 어떻게 유지할건지?

    // 로그인한 유저 없을 경우
    // alert '로그인 해주세요'
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
