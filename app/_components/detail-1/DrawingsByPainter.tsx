import React from "react";

import type { PostProps } from "@/app/_types/detail1/posts";
import { useQuery } from "@tanstack/react-query";
import { getDrawingUrls, getPainterInfo } from "../detail-api/painter-api";

type OwnProp = Omit<PostProps, "id">;

const DrawingsByPainter = ({ post }: OwnProp) => {
  // 그림 작성자 nickname, profile_img, 그린 그림들 가져오기
  const {
    data: painterInfoArray,
    isLoading: painterInfoIsLoading,
    isError: painterInfoIsError,
  } = useQuery({
    queryKey: ["painterInfo"],
    queryFn: () => getPainterInfo(post.painter_email),
  });

  // posts테이블에서 post.painter_email과 일치하는 그림 url들을 가져와서 배열로 저장, 아래에서 뿌려주기
  const email = post.painter_email;
  const {
    data: drawingUrls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["drawingUrls"],
    queryFn: () => getDrawingUrls(email),
  });

  if (isLoading || painterInfoIsLoading) {
    return <div>Loading...</div>;
  }
  if (isError || painterInfoIsError || !Array.isArray(painterInfoArray)) {
    return <div>Error</div>;
  }

  const painterNickname = painterInfoArray?.[0].nickname;

  return (
    <>
      {/* 유저가 그린 그림 3 */}
      <div className="flex flex-col gap-2 min-h-[100px]">
        <p className="text-sm font-semibold">
          🏆 {painterNickname}의 다른 그림
        </p>
        <div className="w-60 min-h-16 flex gap-2 items-center">
          <div className="w-full h-full flex flex-wrap gap-2 ">
            {/* 그림 url 배열을 map으로 돌리기 */}
            {drawingUrls?.map((url: string, index): React.ReactNode => {
              return (
                <img
                  key={index}
                  src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${url}`}
                  alt=""
                  className="w-[72px] h-[72px] rounded-md"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawingsByPainter;
