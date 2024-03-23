"use client";

import React from "react";
import Image from "next/image";
import { SmallSquareImageStyle } from "@/app/_styles/imageStyles";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/_api/getPosts";

import type { Posts } from "@/app/_types/detail1/posts";
import Link from "next/link";

const Latest = () => {
  /** posts 테이블의 모든 게시글을 불러옴 */
  const { data, isLoading, isError } = useQuery<Posts[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const postData = await getPosts();
        return postData;
      } catch (error) {
        return [];
      }
    },
  });

  if (isLoading) return <div>데이터 로드 중...</div>;
  if (isError) return <div>데이터 로드 실패</div>;
  if (!data) return;

  /** created_at 기준으로 최신순으로 정렬 */
  const sortedPosts = data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const latestPosts = sortedPosts.slice(0, 4);

  const handleOnClickImg = () => {};

  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-10 flex flex-col gap-2">
        <h1 className="text-large font-bold">✨최신 드로잉</h1>
        <div className="flex flex-wrap justify-center gap-5">
          {latestPosts.length === 0 && (
            <div>등록된 드로잉이 아직 없습니다.</div>
          )}
          {latestPosts.map((item) => (
            <Link key={item.drawing_url} href={`/detail/${item.drawing_id}`}>
              <div onClick={handleOnClickImg}>
                <Image
                  src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${item.drawing_url}`}
                  alt="유저의 그림"
                  width={230}
                  height={230}
                  style={SmallSquareImageStyle}
                  className="w-full h-full p-4 object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Latest;
