import { useQuery } from "@tanstack/react-query";
import { getPainterInfo } from "../detail-api/painter-api";

import DrawingsByPainter from "./DrawingsByPainter";

import type { PostProps } from "@/app/_types/detail1/posts";

import { countLikesNumber } from "../detail-api/likes-api";
import Likes from "./Likes";

const Painter = ({ post, id }: PostProps) => {
  // 그림 작성자 nickname, profile_img, 그린 그림들 가져오기
  const {
    data: painterInfoArray,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["painterInfo"],
    queryFn: () => getPainterInfo(post.painter_email),
  });

  // 좋아요수 가져오기
  const {
    data: likesNumber,
    isLoading: countLikesLoading,
    isError: countLikesError,
  } = useQuery({
    queryKey: ["countLikesNumber"],
    queryFn: () => countLikesNumber(id),
  });

  if (isLoading || countLikesLoading) {
    return <div>Loading...</div>;
  }
  if (isError || countLikesError || !Array.isArray(painterInfoArray)) {
    return <div>Error</div>;
  }

  const painterInfo = painterInfoArray[0];

  // 날짜 형식 변환
  const inputDate = post.created_at;
  const parsedDate = new Date(inputDate);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      {/* 우측 박스 Wrapper */}
      <div className="w-[260px] h-[370px] flex flex-col justify-between bg-PurplePale p-4 rounded-md">
        {/* 프로필 이미지, 닉네임, 별 */}
        <div className=" flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              className="w-10 object-cover rounded-full"
              src={painterInfo?.profile_img}
              alt=""
            />
            <p className="text-md font-semibold">{painterInfo?.nickname}</p>
          </div>
        </div>
        {/* 날짜, 제목, 설명, 댓글, 좋아요 수*/}
        <div className="flex flex-col my-4 gap-2">
          <p className="mb-3 text-sm">날짜 : {formattedDate}</p>
          <p className="text-md font-semibold">제목 : {post.title}</p>
          <p className="text-sm">설명 : {post.description}</p>
          <div className="flex gap-2 items-center mt-7 ">
            <Likes id={id} post={post} />
            <p className="text-sm ">
              좋아요{" "}
              <span className="text-sm text-rose-600 mr-4">{likesNumber}</span>
              댓글 <span className="text-sm text-rose-600 ">3</span>
            </p>
          </div>
        </div>
        {/* 유저가 그린 그림 Best 3 */}
        <DrawingsByPainter post={post} />
      </div>
    </>
  );
};

export default Painter;
