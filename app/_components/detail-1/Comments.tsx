"use client";

import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import {
  getCommentsCount,
  getCommentsList,
  insertComment,
} from "../detail-api/comments-api";
import CommentsList from "./Comments-list";

import type { Comment, InsertingComment } from "@/app/_types/detail1/comments";

const Comments = ({ drawingId }: { drawingId: number }) => {
  // 현재 로그인한 유저의 닉네임, email
  const { nickname, email } = useUserInfoStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoginOpen = useAuthStore((state) => state.setIsLoginOpen);
  const queryClient = useQueryClient();

  // 정렬된 댓글 리스트 상태
  const [sortedCommentsList, setSortedCommentsList] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  // 댓글 리스트 가져오기
  const {
    data: commentsList,
    isLoading: listIsLoading,
    isError: listIsError,
  } = useQuery({
    queryKey: ["comments", { type: "list" }],

    queryFn: () => getCommentsList(drawingId),
  });

  // 댓글 개수 가져오기
  const {
    data: commentsCount,
    isLoading: countingIsLoading,
    isError: countingIsError,
  } = useQuery({
    queryKey: ["comments", { type: "count" }],

    queryFn: () => getCommentsCount(drawingId),
  });

  // 댓글 등록 mutation
  const { mutate: insertCommentMutation } = useMutation({
    mutationFn: async (data: InsertingComment) => {
      const { email, nickname, comment } = data;
      await insertComment({ email, nickname, comment, drawingId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  // 쿼리로 가져온 commentsList를 날짜순으로 최신순 정렬
  useEffect(() => {
    if (commentsList && commentsList.length > 0) {
      const sortedList = commentsList.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      setSortedCommentsList(sortedList);
    }
  }, [commentsList]);

  if (listIsLoading || countingIsLoading) {
    return <div>Loading...</div>;
  }
  if (listIsError || countingIsError) {
    return <div>Error</div>;
  }

  // 댓글 입력창 onChange
  const handleInputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록 핸들러
  const handleInsertComment = (comment: string) => {
    if (isLoggedIn) {
      insertCommentMutation({ email, nickname, comment, drawingId });
      setComment("");
      alert("댓글이 등록되었습니다.");
    } else if (!isLoggedIn) {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <p className="text-md">
        댓글
        <span className="text-rose-600 ml-2">{commentsCount}</span>
      </p>
      <div className="w-full h-[100px] bg-YellowPale my-2 pt-2 pl-3 rounded-md">
        <div className="flex">
          <p className="text-sm mb-1">
            닉네임 : {isLoggedIn ? nickname : "guest"}
          </p>
        </div>
        <textarea
          readOnly={!isLoggedIn}
          className="text-sm w-[98%] h-[60%] p-2 resize-none"
          placeholder={
            isLoggedIn ? "댓글을 입력해주세요." : "로그인이 필요합니다."
          }
          value={comment}
          onChange={handleInputComment}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => handleInsertComment(comment)}
          className="bg-orange-400 w-20 h-6 text-sm rounded-md"
        >
          등록하기
        </button>
      </div>
      <CommentsList commentsList={sortedCommentsList} />
    </>
  );
};

export default Comments;
