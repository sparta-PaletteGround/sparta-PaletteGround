import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getDrawingUrls } from "../detail-api/detail-api";

const DrawingsByPainter = ({ drawingIds }: { drawingIds: number[] }) => {
  // 유저가 그린 그림url 배열
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
                  src={url}
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
