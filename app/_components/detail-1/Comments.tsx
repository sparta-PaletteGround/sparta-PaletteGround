"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  deleteComment,
  getCommentsList,
  insertComment,
} from "../detail-api/comments-api";
import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { InsertingComment } from "@/app/_types/detail1/comments";

const Comments = () => {
  // 현재 로그인한 유저의 닉네임, email
  const { nickname, email } = useUserInfoStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoginOpen = useAuthStore((state) => state.setIsLoginOpen);
  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");

  // 댓글 리스트 가져오기
  const {
    data: commentsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["commentsList"],
    queryFn: getCommentsList,
  });

  // 댓글 등록
  const { mutate: insertCommentMutation } = useMutation({
    mutationFn: async (data: InsertingComment) => {
      const { email, nickname, comment } = data;
      await insertComment({ email, nickname, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentsList"],
      });
    },
  });

  // 댓글 삭제
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: ({ email, id }: { email: string | null; id: number }) =>
      deleteComment(email, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentsList"],
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const handleInputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록 핸들러
  const handleInsertComment = (comment: string) => {
    if (isLoggedIn) {
      insertCommentMutation({ email, nickname, comment });
      setComment("");
      alert("댓글이 등록되었습니다.");
    } else if (!isLoggedIn) {
      setIsLoginOpen(true);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (id: number) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      alert("삭제되었습니다.");
      deleteCommentMutation({ email, id });
    }
    return;
  };

  return (
    <>
      {/* 댓글 입력창 */}
      <p className="text-sm">
        댓글
        <span className="text-rose-600 ml-2">3</span>
      </p>
      <div className="w-full h-[100px] bg-YellowPale my-2 pt-2 pl-3 rounded-md">
        <div className="flex">
          <p className="text-sm">닉네임 : {isLoggedIn ? nickname : "guest"} </p>
        </div>
        <textarea
          className="text-sm w-[98%] h-[60%] p-2 resize-none"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleInputComment}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => handleInsertComment(comment)}
          className="bg-amber-500 w-14 h-6 text-sm rounded-md"
        >
          등록하기
        </button>
      </div>
      {/* 댓글 리스트 Wrapper */}
      <div>
        {/* 댓글 리스트 map 돌기 */}
        {commentsList?.map((comment) => {
          return (
            <div
              key={comment.id}
              className="w-full h-[100px] flex flex-col justify-between bg-YellowPale my-2 py-2 pl-3 rounded-md"
            >
              <div>
                <p className="text-sm">닉네임 : {comment.user_nickname}</p>
                <p className="text-sm">{comment.comment}</p>
              </div>
              <div className="flex justify-end gap-2 mr-4">
                {comment.user_email === email && (
                  <>
                    <button className="bg-rose-100 w-10 h-6 rounded-md text-sm">
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="bg-gray-100 w-10 h-6 rounded-md text-sm"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
