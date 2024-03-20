"use client";

import { useQuery } from "@tanstack/react-query";

import Comments from "@/app/_components/detail-1/Comments";
import { getSinglePost } from "@/app/_components/detail-api/detail-api";
import Drawing from "@/app/_components/detail-1/Drawing";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const id = +params.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getSinglePost(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !Array.isArray(data)) {
    return <div>Error</div>;
  }

  // console.log("data", data);
  const post = data[0];

  // 날짜 형식 변환
  const inputDate = post.created_at;
  const parsedDate = new Date(inputDate);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  const formattedDate = `${year}년 ${month}월 ${day}일`;

  // 그림 작성자 nickname, profile_img 가져오기

  return (
    <>
      <section className="flex gap-8 justify-center mt-6">
        {/* 좌측 박스 Wrapper */}
        <div className="w-[600px]">
          <Drawing post={post} />
          <Comments />
        </div>
        {/* 우측 박스 Wrapper */}
        <div className="w-[260px] h-[370px] flex flex-col justify-between bg-PurplePale p-4 rounded-md">
          {/* 프로필 이미지, 닉네임, 별 */}
          <div className=" flex gap-4 items-center">
            <img
              className="w-10 object-cover"
              src="https://velog.velcdn.com/images/innes_kwak/post/24d0e46e-8dd7-4e59-becd-52447e2efeb6/image.png"
              alt=""
            />
            <p className="text-md font-semibold">닉네임</p>
            <p>⭐️</p>
          </div>
          {/* 날짜, 제목, 설명, 댓글, 좋아요 */}
          <div className="flex flex-col my-4 gap-2">
            <p className="mb-3 text-sm">날짜 : {formattedDate}</p>
            <p className="text-md font-semibold">제목 : {post.title}</p>
            <p className="text-sm">설명 : {post.description}</p>
            <p className="text-sm mt-7">
              댓글 <span className="text-sm text-rose-600 mr-2">3</span>
              좋아요 <span className="text-sm text-rose-600">20</span>
            </p>
          </div>
          {/* 유저가 그린 그림 3 */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">🏆 유저가 그린 그림 Top 3</p>
            <div className="w-60 h-16  flex flex-wrap gap-2 items-center">
              <div className="w-[70px] h-full bg-white"></div>
              <div className="w-[70px] h-full bg-white"></div>
              <div className="w-[70px] h-full bg-white"></div>
              <div className="w-[70px] h-full bg-white"></div>
              <div className="w-[70px] h-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
