import React from "react";
import Carousel from "./Carousel";
import WeeklyTheme from "./WeeklyTheme";
import Latest from "./Latest";
import BestPainter from "./BestPainter";
import { Posts } from "@/app/_types/detail1/posts";

const Home = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts`,
    {
      next: { revalidate: 10 },
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
    }
  );
  const postsData: Posts[] = await response.json();

  return (
    <>
      <Carousel data={postsData} />
      <WeeklyTheme />
      <Latest />
      <BestPainter data={postsData} />
    </>
  );
};

export default Home;
