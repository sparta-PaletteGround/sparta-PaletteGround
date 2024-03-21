import { Posts } from "@/app/_types/detail1/posts";
import Link from "next/link";

interface PostsProps {
  post: Posts;
}

const DrawingPosts = ({ post }: PostsProps) => {
  return (
    <Link href={`/detail/${post.drawing_id}`}>
      <li className="bg-white  w-[calc(33.33% - 16px)] h-[300px] p-4 m-4 rounded-2xl flex flex-col items-center justify-center">
        <img
          src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${post.drawing_url}`}
          alt=""
          className="w-[300px] h-[200px]"
        />
        <div className="text-xLarge p-4 font-medium ">{post.title}</div>
      </li>
    </Link>
  );
};

export default DrawingPosts;
