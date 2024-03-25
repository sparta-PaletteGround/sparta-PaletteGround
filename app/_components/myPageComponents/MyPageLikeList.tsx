import React from "react";
import { useRouter } from "next/navigation";

const MyPageLikeList = ({ data, isPending }: any) => {
  const router = useRouter();

  if (isPending) {
    return <div>불러오는 중 ....</div>;
  }
  const handleNavigate = (id: any) => {
    router.push(`/detail/${id}`);
  };

  return (
    <>
      {data?.length === 0 ? (
        <div className="w-[500px] h-[500px] p-20 ">
          <h1 className="font-bold text-2xl">좋아요한 그림이 없습니다 !!</h1>
        </div>
      ) : (
        data?.map((item: any) => {
          return (
            <div
              key={item.like_id}
              onClick={() => handleNavigate(item.drawing_id)}
              className="w-84  flex flex-col bg-white items-center border-2 rounded-xl border-white cursor-pointer hover:scale-105 transition-transform ease-in-out"
            >
              {/* 이미지 */}
              <div className="w-4/5  table text-center ">
                <div className="table-cell align-middle max-w-[320px] max-h-[320px]">
                  <img
                    src={`https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/${item.drawing_url}`}
                    className="w-full h-full p-4"
                    style={{ objectFit: "contain" }}
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
            </div>
          );
        })
      )}
    </>
  );
};

export default MyPageLikeList;
