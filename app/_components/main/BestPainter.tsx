import Image from "next/image";
import React from "react";
import { BestPainterCard } from "@/app/_styles/bestPainterStyles";

const BestPainter = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-10 flex flex-col gap-2 mb-10">
        <h1 className="text-large font-bold">👍🏼명예의 전당</h1>
        <div className="w-[1000px] bg-PurplePale flex gap-10 rounded-xl p-5 justify-center">
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
