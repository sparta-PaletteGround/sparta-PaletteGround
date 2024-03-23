import Image from "next/image";
import React from "react";
import { BestPainterCard } from "@/app/_styles/bestPainterStyles";
import { Posts } from "@/app/_types/detail1/posts";
import { User } from "@/app/_types/myPageType";
import Link from "next/link";

const BestPainter = async ({ data }: { data: Posts[] }) => {
  /** users 테이블에서 모든 데이터 가져오기 */
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

  /** Top 3 유저의 이메일 그리고 그 이메일에 해당하는 유저 정보 */
  const bestUserEmails = sortedUsers.map((user) => user.email);
  const bestUsersInfo = usersData.filter((user) =>
    bestUserEmails.includes(user.email)
  );

  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-20 flex flex-col gap-2 mb-10">
        <h1 className="text-large font-bold">👍🏼명예의 전당</h1>
        <p className="pl-6">
          Palette Ground에 가장 많은 그림을 남겨주신 우수회원을 소개합니다👏🏼👏🏼👏🏼
        </p>
        <div className="bg-PurplePale flex gap-2 rounded-xl p-1 justify-center">
          {bestUsersInfo.map((item) => (
            <Link
              href={`/gallery/${item.id}`}
              style={BestPainterCard}
              key={item.email}
            >
              <div className="flex flex-col gap-2 items-center">
                <div className="w-[70px] h-[70px] bg-white rounded-full">
                  <img
                    src={item.profile_img}
                    alt="사용자 이미지"
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
                <p>{item.nickname}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestPainter;
