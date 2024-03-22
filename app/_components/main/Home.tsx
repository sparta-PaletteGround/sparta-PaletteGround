import React from "react";
import Carousel from "./Carousel";
import WeeklyTheme from "./WeeklyTheme";
import Latest from "./Latest";
import BestPainter from "./BestPainter";

import type { Posts } from "@/app/_types/detail1/posts";
import type { Likes } from "@/app/_types/likes";

const Home = async () => {
  const resForPosts = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts`,
    {
      next: { revalidate: 10 },
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
    }
  );
  const postsData: Posts[] = await resForPosts.json();

  /** likes 테이블에서 모든 데이터 가져오기 */
  const resForLikes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/likes`,
    {
      next: { revalidate: 10 },
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
    }
  );
  const likesData: Likes[] = await resForLikes.json();

  return (
    <>
      <Carousel postsData={postsData} likesData={likesData} />
      <WeeklyTheme />
      <Latest />
      <BestPainter data={postsData} />
    </>
  );
};

export default Home;
