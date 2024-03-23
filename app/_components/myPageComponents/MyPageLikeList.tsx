import React from 'react';

const MyPageLikeList = ({ currentUserEmail }: any) => {
  return (
    <>
      <div className="w-84  flex flex-col bg-white items-center border-2 rounded-xl border-black cursor-pointer hover:scale-105 transition-transform ease-in-out">
        {/* 이미지 */}
        <div className="w-4/5 h-52 table text-center ">
          <div className="table-cell align-middle">
            <img
              className="max-w-[320px] max-h-[320px] "
              src="https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/image_1711117939984.png"
            />
          </div>
        </div>
        <div className="flex flex-col text-center p-2 gap-1">
          <span className="font-bold text-xl text-PurpleMedium ">
            나는 나비
          </span>
          <span className="text-ml text-PurpleLight">
            아직 애벌레지만 나비가 될거얏!!
          </span>
        </div>
      </div>
    </>
  );
};

export default MyPageLikeList;
