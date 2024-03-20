import React from "react";
import Image from "next/image";
import ExampleImg from "@/public/image/example.jpg";
import { SmallSquareImageStyle } from "@/app/_styles/imageStyles";

const Latest = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-10 flex flex-col gap-2">
        <h1 className="text-large font-bold">✨최신 드로잉</h1>
        <div className="flex flex-wrap justify-center gap-5">
          <Image
            src={ExampleImg}
            alt="유저의 그림"
            style={SmallSquareImageStyle}
          />
          <Image
            src={ExampleImg}
            alt="유저의 그림"
            style={SmallSquareImageStyle}
          />
          <Image
            src={ExampleImg}
            alt="유저의 그림"
            style={SmallSquareImageStyle}
          />
          <Image
            src={ExampleImg}
            alt="유저의 그림"
            style={SmallSquareImageStyle}
          />
        </div>
      </div>
    </section>
  );
};

export default Latest;
