import Image from "next/image";
import React from "react";
import { BestPainterCard } from "@/app/_styles/bestPainterStyles";
import { Newpost } from "@/app/_types/detail1/posts";
import { getUsers } from "@/app/_api/getUsers";

const BestPainter = async ({ data }: { data: Newpost[] }) => {
  const users = await getUsers();
  console.log("깨앵", users);
  /** 게시글을 가장 많이 작성한 유저 3명 뽑아내기 */
  const userCounts: { [email: string]: number } = {};
  data?.forEach((post) => {
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

  console.log("끼잉", sortedUsers);

  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-10 flex flex-col gap-2 mb-10">
        <h1 className="text-large font-bold">👍🏼명예의 전당</h1>
        <div className="w-[1000px] bg-PurplePale flex gap-10 rounded-xl p-5 justify-center">
          {sortedUsers.map((item) => (
            <div style={BestPainterCard} key={item.email} className="flex-col">
              <img
                src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
                alt="사용자 이미지"
                width="70"
                height="70"
              />
              <p>그림마스터</p>
            </div>
          ))}
          <div style={BestPainterCard} className="flex-col">
            <img
              src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
              alt="사용자 이미지"
              width="70"
              height="70"
            />
            <p>그림마스터</p>
          </div>
          <div style={BestPainterCard} className="flex-col">
            <img
              src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
              alt="사용자 이미지"
              width="70"
              height="70"
            />
            <p>그림마스터</p>
          </div>
          <div style={BestPainterCard} className="flex-col">
            <img
              src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
              alt="사용자 이미지"
              width="70"
              height="70"
            />
            <p>그림마스터</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestPainter;
