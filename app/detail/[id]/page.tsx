"use client";

import { useQuery } from "@tanstack/react-query";

import { getSinglePost } from "@/app/_components/detail-api/detail-api";

import Comments from "@/app/_components/detail-1/Comments";
import Drawing from "@/app/_components/detail-1/Drawing";
import Painter from "@/app/_components/detail-1/Painter";

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

  const post = data[0];

  return (
    <>
      <section className="flex gap-8 justify-center mt-6">
        {/* 좌측 박스 Wrapper */}
        <div className="w-[600px]">
          <Drawing post={post} />
          <Comments />
        </div>
        <Painter post={post} />
      </section>
    </>
  );
};

export default DetailPage;
