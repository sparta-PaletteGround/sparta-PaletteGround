import Image from "next/image";
import React from "react";
import { BestPainterCard } from "@/app/_styles/bestPainterStyles";
import { Posts } from "@/app/_types/detail1/posts";
import { getUsers } from "@/app/_api/getUsers";
import { User } from "@/app/_types/myPageType";

const BestPainter = async ({ data }: { data: Posts[] }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users`,
    {
      next: { revalidate: 10 },
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
    }
  );
  const usersData: User[] = await response.json();

  /** posts로부터 가장 많이 작성한 유저 3명 뽑아내기 */
  const userCounts: { [email: string]: number } = {};
  data?.forEach((post) => {
    if (!post.painter_email) return;
    if (post.painter_email in userCounts) {
      userCounts[post.painter_email]++;
    } else {
      userCounts[post.painter_email] = 1;
    }
  });

  const sortedUsers = Object.entries(userCounts)
    .map(([email, postCount]) => ({ email, postCount }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 3);

  const bestUserEmails = sortedUsers.map((user) => user.email);
  const bestUsersInfo = usersData.filter((user) =>
    bestUserEmails.includes(user.email)
  );

  console.log("모든 유저", usersData);
  console.log("TOP3 유저", bestUsersInfo);

  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-10 flex flex-col gap-2 mb-10">
        <h1 className="text-large font-bold">👍🏼명예의 전당</h1>
        <p className="pl-6">
          Palette Ground에 가장 많은 그림을 남겨주신 우수회원 Top 3
          소개합니다👏🏼👏🏼👏🏼
        </p>
        <div className="bg-PurplePale flex gap-2 rounded-xl p-1 justify-center">
          {bestUsersInfo.map((item) => (
            <div style={BestPainterCard} key={item.email} className="flex-col">
              <img
                src={item.profile_img}
                alt="사용자 이미지"
                width="70"
                height="70"
              />
              <p>{item.nickname}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestPainter;
