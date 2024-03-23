"use client";

import React from "react";
import DrawingsList from "./DrawingsList";
import PainterInfo from "./PainterInfo";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPainter } from "@/app/_api/getPainter";
import { getDrawings } from "@/app/_api/getPosts";

const GalleryHome = () => {
  const { id }: { id: string } = useParams();
  const painterId = parseInt(id);

  /** 선택한 유저의 user 데이터 불러오기 */
  const { data: userData, isLoading: loadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getPainter(painterId);
      return data;
    },
  });

  /** 해당 유저의 drawing 데이터 불러오기 */
  const { data: drawingData, isLoading: loadingDrawings } = useQuery({
    queryKey: ["drawings"],
    queryFn: async () => {
      if (!userData) return [];
      const data = await getDrawings(userData?.email);
      return data;
    },
    enabled: !!userData,
  });

  if (loadingUser || loadingDrawings) return <div>데이터 로드 중</div>;
  if (!userData || !drawingData)
    return <div>사용자 데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      <PainterInfo userData={userData} drawingData={drawingData} />
      <DrawingsList drawingData={drawingData} />
    </>
  );
};

export default GalleryHome;
