import React from "react";

const DetailPage = () => {
  return (
    <>
      <div className="w-full h-28 bg-yellow-200 mb-10"></div>
      <section className="flex gap-12 justify-center">
        <div className="w-[600px]">
          <div className="w-full h-[400px] bg-teal-900 mb-6"></div>
          <p>댓글 3</p>
          <div className="w-full h-[100px] bg-yellow-200 my-2 pt-2 pl-3">
            <p>닉네임 : </p>
            <p>댓글을 입력해주세요.</p>
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-500">등록하기</button>
          </div>
        </div>
        <div className="w-[250px] h-[400px] bg-teal-900"></div>
      </section>
    </>
  );
};

export default DetailPage;
