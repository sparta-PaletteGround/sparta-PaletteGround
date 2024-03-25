import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getPosts } from "./myPageSupabase";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";

const MyPageMyWrite = ({ currentUserEmail }: { currentUserEmail: any }) => {
  const router = useRouter();

  /** 로그인 상태인지 확인 */
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
  }, []);

  const { data, isPending }: any = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts({ email: currentUserEmail }),
    enabled: !!currentUserEmail,
  });

  if (isPending) {
    return <div>불러오는 중 ....</div>;
  }
  // const handleNavigate = (id: any) => {
  //   router.push(`/detail/${id}`);
  // };

  return (
    <>
      {data?.length === 0 ? (
        <div className="w-[500px] h-[500px] p-20 ">
          <h1 className="font-bold text-2xl">아직 그린 그림이 없어요 . .</h1>
        </div>
      ) : (
        data?.map((item: any, idx: any) => {
          return (
            <Link
              href={`/detail/${item.drawing_id}`}
              key={idx}
              className="w-84  flex flex-col bg-white items-center border-2 rounded-xl border-white cursor-pointer hover:scale-105 transition-transform ease-in-out"
            >
              {/* 이미지 */}
              <div className="w-4/5  table text-center ">
                <div className="table-cell align-middle max-w-[320px] max-h-[320px] ">
                  <img
                    className="w-full h-full p-4"
                    style={{ objectFit: "contain" }}
                    src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${item.drawing_url}`}
                  />
                </div>
              </div>
              <div className="flex flex-col text-center p-2 gap-1">
                <span className="font-bold text-xl text-PurpleMedium ">
                  {item.title}
                </span>
                <span className="text-ml text-PurpleLight">
                  {item.description}
                </span>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};

export default MyPageMyWrite;
