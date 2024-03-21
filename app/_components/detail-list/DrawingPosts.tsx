import { Posts } from "@/app/_types/detail1/posts";

interface PostsProps {
  post: Posts;
}
const DrawingPosts = ({ post }: PostsProps) => {
  return (
    <li className="bg-white w-1/3 p-4 m-4 rounded-2xl flex flex-col items-center">
      <img
        src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${post.drawing_url}`}
        alt=""
      />
      <div>{post.title}</div>
    </li>
  );
};

export default DrawingPosts;
