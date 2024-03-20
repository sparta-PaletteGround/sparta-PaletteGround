import React from "react";

const Comments = () => {
  return (
    <>
      {/* 좌측 하단 댓글창 */}
      <p className="text-sm">
        댓글
        <span className="text-rose-600 ml-2">3</span>
      </p>
      <div className="w-full h-[100px] bg-YellowPale my-2 pt-2 pl-3 rounded-md">
        <div className="flex">
          <p className="text-sm">닉네임 : </p>
        </div>
        <textarea
          className="text-sm w-[98%] h-[60%] p-2 resize-none"
          placeholder="댓글을 입력해주세요."
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-amber-500 w-14 h-6 text-sm rounded-md">
          등록하기
        </button>
      </div>
      {/* 댓글 리스트 Wrapper */}
      <div>
        {/* 댓글 map 돌기 */}
        {/* 댓글 item 1 */}
        <div className="w-full h-[100px] flex flex-col justify-between bg-YellowPale my-2 py-2 pl-3 rounded-md">
          <div>
            <p className="text-sm">닉네임 : test</p>
            <p className="text-sm">This comment is for the testing.</p>
          </div>
          <div className="flex justify-end gap-2 mr-4">
            <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
              수정
            </button>
            <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
              삭제
            </button>
          </div>
        </div>
        {/* 댓글 item 2 */}
        <div className="w-full h-[100px] flex flex-col justify-between bg-YellowPale my-2 py-2 pl-3 rounded-md">
          <div>
            <p className="text-sm">닉네임 : test</p>
            <p className="text-sm">This comment is for the testing.</p>
          </div>
          <div className="flex justify-end gap-2 mr-4">
            <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
              수정
            </button>
            <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
              삭제
            </button>
          </div>
        </div>
        {/* 댓글 item 3 */}
        <div className="w-full h-[100px] flex flex-col justify-between bg-YellowPale my-2 py-2 pl-3 rounded-md">
          <div>
            <p className="text-sm">닉네임 : test</p>
            <p className="text-sm">This comment is for the testing.</p>
          </div>
          <div className="flex justify-end gap-2 mr-4">
            <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
              수정
            </button>
            <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;