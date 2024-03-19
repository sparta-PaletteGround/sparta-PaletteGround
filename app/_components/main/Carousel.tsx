import Image from "next/image";
import React from "react";
import ExampleImg from "@/public/image/example.jpg";

const Carousel = () => {
  return (
    <section className="flex flex-col justify-center items-center bg-PurpleLight h-[400px]">
      <div className="flex flex-col gap-1">
        <h1 className="text-large font-bold">🖌️최신 게시글</h1>
        <div className="flex justify-center gap-5">
          <Image src={ExampleImg} alt="유저의 그림" width="300" height="300" />
          <Image src={ExampleImg} alt="유저의 그림" width="300" height="300" />
          <Image src={ExampleImg} alt="유저의 그림" width="300" height="300" />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
