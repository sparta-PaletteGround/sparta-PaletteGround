import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDrawingUrls } from "../detail-api/detail-api";

const DrawingsByPainter = ({ drawingIds }: { drawingIds: number[] }) => {
  // 유저가 그린 그림url 배열(지금 그림의 url은 제외해야함)
  const {
    data: drawingUrls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["drawingUrls"],
    queryFn: () => getDrawingUrls(drawingIds),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  console.log("drawingUrls", drawingUrls);

  return (
    <>
      {/* 유저가 그린 그림 3 */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">🏆 유저가 그린 그림 Top 3</p>
        <div className="w-60 h-16  flex flex-wrap gap-2 items-center">
          {/* 그림 url 배열을 map으로 돌리기 */}
          <div className="w-[70px] h-full bg-white"></div>
          <div className="w-[70px] h-full bg-white"></div>
          <div className="w-[70px] h-full bg-white"></div>
          <div className="w-[70px] h-full bg-white"></div>
          <div className="w-[70px] h-full bg-white"></div>
        </div>
      </div>
    </>
  );
};

export default DrawingsByPainter;
