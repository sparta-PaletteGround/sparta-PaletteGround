"use client";

import Image from "next/image";
import React from "react";
import { SquareImageStyle } from "@/app/_styles/imageStyles";
import { Posts } from "@/app/_types/detail1/posts";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { Likes } from "@/app/_types/likes";

const Carousel = ({
  postsData,
  likesData,
}: {
  postsData: Posts[];
  likesData: Likes[];
}) => {
  /** likes로부터 가장 많이 언급된 게시글 뽑아내기 */
  const userCounts: { [drawingId: string]: number } = {};
  likesData?.forEach((post) => {
    if (!post.drawing_id) return;
    if (post.drawing_id in userCounts) {
      userCounts[post.drawing_id]++;
    } else {
      userCounts[post.drawing_id] = 1;
    }
  });

  const sortedPosts = Object.entries(userCounts)
    .map(([drawing_id, postCount]) => ({ drawing_id, postCount }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  /** like를 가장 많이 받은 bestPosts 그리고 각 post의 상세 정보 */
  const bestPosts = sortedPosts.map((post) => Number(post.drawing_id));
  const filteredData = postsData.filter((post) =>
    bestPosts.includes(Number(post.drawing_id))
  );

  /** 캐러셀 설정 */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className="flex flex-col justify-center items-center bg-gray-100 h-[400px]">
      <div className="flex flex-col gap-2 w-[1000px]">
        <h1 className="text-large font-bold">👑베스트 드로잉</h1>
        <Slider {...settings}>
          {filteredData.map((item) => (
            <div key={item.drawing_id}>
              <Image
                src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${item.drawing_url}`}
                alt="유저의 그림"
                style={SquareImageStyle}
                width={300}
                height={300}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Carousel;
