import React from "react";

import type { PostProps } from "@/app/_types/detail1/posts";
import { useQuery } from "@tanstack/react-query";
import { getDrawingUrls } from "../detail-api/painter-api";

type OwnProp = Omit<PostProps, "id">;

const DrawingsByPainter = ({ post }: OwnProp) => {
  // 변경후 - posts테이블에서 post.painter_email과 일치하는 그림 url들을 가져와서 배열로 저장, 아래에서 뿌려주기
  const email = post.painter_email;
  const {
    data: drawingUrls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["drawingUrls"],
    queryFn: () => getDrawingUrls(email),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {/* 유저가 그린 그림 3 */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">🏆 유저가 그린 그림 Top 3</p>
        <div className="w-60 h-16  flex flex-wrap gap-2 items-center">
          <div className="w-[70px] h-full flex gap-2 ">
            {/* 그림 url 배열을 map으로 돌리기 */}
            {drawingUrls?.map((url: string, index): React.ReactNode => {
              return (
                <img
                  key={index}
                  src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${url}`}
                  alt=""
                  className="max-w-full max-h-full rounded-md"
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
