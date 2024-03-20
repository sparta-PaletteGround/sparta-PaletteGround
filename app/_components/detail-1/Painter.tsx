import { useQuery } from "@tanstack/react-query";
import { getPainterInfo } from "../detail-api/detail-api";

import DrawingsByPainter from "./DrawingsByPainter";

import type { PostProps } from "@/app/_types/detail1/posts";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !Array.isArray(painterInfoArray)) {
    return <div>Error</div>;
  }

  const painterInfo = painterInfoArray[0];

  // 유저가 그린 그림id 배열(현재 보고있는 그림의 id는 제외)
  const drawingIds = painterInfo.drawings_array.filter(
    (drawingId: number) => drawingId !== id
  );

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
        <div className=" flex gap-4 items-center">
          <img
            className="w-10 object-cover"
            src={painterInfo.profile_img}
            alt=""
          />
          <p className="text-md font-semibold">{painterInfo.nickname}</p>
          <p>⭐️</p>
        </div>
        {/* 날짜, 제목, 설명, 댓글, 좋아요 */}
        <div className="flex flex-col my-4 gap-2">
          <p className="mb-3 text-sm">날짜 : {formattedDate}</p>
          <p className="text-md font-semibold">제목 : {post.title}</p>
          <p className="text-sm">설명 : {post.description}</p>
          <p className="text-sm mt-7">
            댓글 <span className="text-sm text-rose-600 mr-2">3</span>
            좋아요 <span className="text-sm text-rose-600">20</span>
          </p>
        </div>
        {/* 유저가 그린 그림 Best 3 */}
        <DrawingsByPainter drawingIds={drawingIds} />
      </div>
    </>
  );
};

export default Painter;