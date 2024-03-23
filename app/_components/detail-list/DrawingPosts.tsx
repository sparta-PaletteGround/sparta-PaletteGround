import { Posts } from "@/app/_types/detail1/posts";
import Image from "next/image";

import Link from "next/link";

interface PostsProps {
  post: Posts;
}

const DrawingPosts = ({ post }: PostsProps) => {
  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <li className="bg-white relative w-[calc(33.33% - 16px)] h-[430px] p-4 m-4 rounded-2xl flex flex-col items-center">
      <Link href={`/detail/${post.drawing_id}`}>
        <div className="flex flex-col justify-center w-[300px] h-[300px]">
          <Image
            src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${post.drawing_url}`}
            alt="post image"
            width={300}
            height={300}
            className="w-full h-full p-4"
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <div className="flex flex-col items-center absolute fixed bottom-1">
        <p className="text-xLarge p-2 font-medium ">{post.title}</p>
        <time className="text-medium p-2  font-light">{formattedDate}</time>
      </div>
    </li>
  );
};

export default DrawingPosts;
