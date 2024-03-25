import { Posts } from "@/app/_types/detail1/posts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DrawingsList = ({ drawingData }: { drawingData: Posts[] }) => {
  return (
    <section className="w-[980px] bg-PurplePale rounded-xl flex items-center">
      <div className="flex flex-wrap gap-5 p-5">
        {drawingData.map((item) => (
          <div className="flex flex-col gap-5" key={item.drawing_id}>
            <Link href={`/detail/${item.drawing_id}`}>
              <div className="w-[300px] h-[300px] bg-white shadow-lg rounded-xl flex flex-col">
                <Image
                  src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${item.drawing_url}`}
                  width={300}
                  height={300}
                  alt="유저가 그린 그림"
                  className="w-full h-full p-4"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>
            <p className="text-center text-large font-bold">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DrawingsList;
