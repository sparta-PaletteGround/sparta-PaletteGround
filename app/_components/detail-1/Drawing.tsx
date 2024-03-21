import { PostProps } from "@/app/_types/detail1/posts";

type OwnProp = Omit<PostProps, "id">;

const Drawing = ({ post }: OwnProp) => {
  return (
    <>
      {/* 좌측 상단 박스 */}
      <div className="w-full h-[370px] bg-PurplePale mb-4 p-4 rounded-md flex justify-center items-center">
        <img
          src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${post.drawing_url}`}
          alt=""
          className="mx-auto max-w-full max-h-full object-cover rounded-md"
        />
      </div>
    </>
  );
};

export default Drawing;
