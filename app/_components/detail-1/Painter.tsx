import { useQuery } from "@tanstack/react-query";
import { getPainterInfo } from "../detail-api/painter-api";

import DrawingsByPainter from "./DrawingsByPainter";

import type { PostProps } from "@/app/_types/detail1/posts";

import { countLikesNumber } from "../detail-api/likes-api";
import Likes from "./Likes";
import Link from "next/link";

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
    data: likesNumberArray,
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
  const likesNumber = likesNumberArray?.length;

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
      <div>
        <div className="w-[260px] min-h-[370px] flex flex-col justify-between bg-PurplePale p-4 rounded-md">
          {/* 프로필 이미지, 닉네임, 별 */}
          <Link
            href={`/gallery/${painterInfo?.id}`}
            className="flex items-center gap-2"
          >
            <div className="w-[50px] h-[50px] bg-white rounded-full">
              <img
                className="w-full h-full rounded-full object-contain"
                src={painterInfo?.profile_img}
                alt=""
              />
            </div>
            <p className="text-md font-semibold">{painterInfo?.nickname}</p>
          </Link>
          {/* 날짜, 제목, 설명, 댓글, 좋아요 수*/}
          <div className="flex flex-col my-4 gap-2">
            <p className="text-sm">날짜 : {formattedDate}</p>
            <div className="h-[1px] bg-gray-300" />
            <p className="text-md font-semibold mt-2">제목 : {post.title}</p>
            <p className="text-sm">설명 : {post.description}</p>
            <div className="flex gap-2 items-center mt-7 ">
              <Likes id={id} post={post} />
              <p className="text-sm ">
                좋아요{" "}
                <span className="text-sm text-rose-600 mr-4">
                  {likesNumber}
                </span>
              </p>
            </div>
          </div>
          <div className="h-[1px] bg-gray-300" />
          {/* 유저가 그린 그림 Best 3 */}
          <DrawingsByPainter post={post} />
        </div>
      </div>
    </>
  );
};

export default Painter;
