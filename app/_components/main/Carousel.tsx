"use client";

import Image from "next/image";
import React from "react";
import { SquareImageStyle } from "@/app/_styles/imageStyles";
import { Posts } from "@/app/_types/detail1/posts";
import ExampleImage from "@/public/image/example.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data }: { data: Posts[] }) => {
  // /** lkies로부터 가장 많이 작성한 유저 3명 뽑아내기 */
  // const userCounts: { [email: string]: number } = {};
  // data?.forEach((post) => {
  //   if (!post.painter_email) return;
  //   if (post.painter_email in userCounts) {
  //     userCounts[post.painter_email]++;
  //   } else {
  //     userCounts[post.painter_email] = 1;
  //   }
  // });

  // const sortedUsers = Object.entries(userCounts)
  //   .map(([email, postCount]) => ({ email, postCount }))
  //   .sort((a, b) => b.postCount - a.postCount)
  //   .slice(0, 3);

  // const bestUserEmails = sortedUsers.map((user) => user.email);
  // const bestUsersInfo = usersData.filter((user) =>
  //   bestUserEmails.includes(user.email)
  // );

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
          <div>
            <Image
              src={ExampleImage}
              alt="유저의 그림"
              style={SquareImageStyle}
            />
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Carousel;
