import React from 'react';

const MyPageMyWrite = () => {
  return (
    <>
      <div className="w-84  flex flex-col bg-white items-center border-2 rounded-xl border-black cursor-pointer hover:scale-105 transition-transform ease-in-out">
        {/* 이미지 */}
        <div className="w-4/5 h-52 table text-center ">
          <div className="table-cell align-middle ">
            <img
              className="max-w-[320px] max-h-[320px] "
              src="https://pmduqgivaolwydqssren.supabase.co/storage/v1/object/public/drawings/image_1711125450947.png"
            />
          </div>
        </div>
        <div className="flex flex-col text-center p-2 gap-1">
          <span className="font-bold text-xl text-PurpleMedium ">냐옹</span>
          <span className="text-ml text-PurpleLight">내 하트를 받아랏!</span>
        </div>
      </div>
    </>
  );
};

export default MyPageMyWrite;
