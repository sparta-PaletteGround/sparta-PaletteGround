"use client";

import React, { useEffect, useState } from "react";
import DrawingPosts from "./DrawingPosts";
import { getAllPost } from "./posts-all-api";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "@/app/_types/detail1/posts";
import { ThemeImageStyle } from "@/app/_styles/imageStyles";
import theme from "@/app/_constant/theme";

const DetailList = () => {
  const [isTopicSelected, setIsTopicSelected] = useState(false);
  const [postData, setPostData] = useState<Posts[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    data,
    isLoading,
    isError,
  }: { data: Posts[] | undefined; isLoading: boolean; isError: any } = useQuery(
    {
      queryKey: ["post"],
      queryFn: async () => {
        const postData = await getAllPost();
        setIsDataLoaded(true);
        return postData;
      },
    }
  );

  useEffect(() => {
    if (isDataLoaded) {
      const queryParams = new URLSearchParams(window.location.search);
      const paramCheck = queryParams.has("onlyWeeklyTopic");
      if (paramCheck) {
        handleWeeklyTopicClick();
      }
    }
  }, [isDataLoaded]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !Array.isArray(data)) {
    return <div>Error</div>;
  }
  // console.log(data);

  // 이번주 주제 클릭 시, 이번주 주제에 맞는 그림만 보여주기
  const handleWeeklyTopicClick = () => {
    setIsTopicSelected(true);
    const weeklyPost = data?.filter(
      (post: Posts) => post.chooseTheme === "weeklyTheme"
    );

    setPostData(weeklyPost);
  };

  // 전체 그림 다 보여주기
  const handelAllDrawingsClick = () => {
    setIsTopicSelected(false);
    setPostData([]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-PurpleMedium p-1 m-4 h-10 rounded-full gap-4 flex items-center">
        <span
          onClick={handleWeeklyTopicClick}
          className={
            isTopicSelected ? "rounded-full bg-PurpleLight p-1" : "p-1"
          }
        >
          이번주 주제
        </span>
        <span
          onClick={handelAllDrawingsClick}
          className={
            !isTopicSelected ? "rounded-full bg-PurpleLight p-1" : "p-1"
          }
        >
          그림 모아보기
        </span>
      </div>

      {isTopicSelected ? (
        <div style={ThemeImageStyle} className="flex-col w-[965px]">
          <h1 className="text-xLarge font-bold text-white">{theme.theme}</h1>
          <p className="text-white">{theme.description}</p>
        </div>
      ) : (
        ""
      )}

      <ul className="w-[1200px] rounded-xl mt-4 flex flex-wrap justify-center">
        {isTopicSelected
          ? postData?.map((post) => (
              <DrawingPosts key={post.drawing_id} post={post} />
            ))
          : data?.map((post) => (
              <DrawingPosts key={post.drawing_id} post={post} />
            ))}
      </ul>
    </div>
  );
};

export default DetailList;
