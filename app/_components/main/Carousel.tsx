import Image from "next/image";
import React from "react";
import ExampleImg from "@/public/image/example.jpg";
import { SquareImageStyle } from "@/app/_styles/imageStyles";
import { Newpost } from "@/app/_types/detail1/posts";

const Carousel = ({ data }: { data: Newpost[] }) => {
  return (
    <section className="flex flex-col justify-center items-center bg-gray-100 h-[400px]">
      <div className="flex flex-col gap-2 w-[1000px]">
        <h1 className="text-large font-bold">👑베스트 드로잉</h1>
        <div className="flex justify-center gap-5">
          <Image src={ExampleImg} alt="유저의 그림" style={SquareImageStyle} />
          <Image src={ExampleImg} alt="유저의 그림" style={SquareImageStyle} />
          <Image src={ExampleImg} alt="유저의 그림" style={SquareImageStyle} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
