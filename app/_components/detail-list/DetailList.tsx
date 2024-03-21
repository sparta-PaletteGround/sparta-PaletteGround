"use client";

import React from "react";
import DrawingPosts from "./DrawingPosts";
import { getAllPost } from "./posts-all-api";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "@/app/_types/detail1/posts";

const DetailList = () => {
  const {
    data,
    isLoading,
    isError,
  }: { data: any; isLoading: any; isError: any } = useQuery({
    queryKey: ["post"],
    queryFn: () => getAllPost(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !Array.isArray(data)) {
    return <div>Error</div>;
  }
  console.log(data);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white p-1 m-4 h-10 rounded-full gap-4 flex items-center">
        <span className="rounded-full p-1">이번주 주제</span>
        <span className="rounded-full bg-PurpleLight p-1">그림 모아보기</span>
      </div>

      <ul className="w-[1280px] h-[960px] rounded-xl m-4 ">
        {data.map((post) => (
          <DrawingPosts key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default DetailList;
