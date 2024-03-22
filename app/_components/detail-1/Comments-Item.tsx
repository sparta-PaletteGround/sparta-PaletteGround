import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";

import { deleteComment } from "../detail-api/comments-api";

import type { Comment } from "@/app/_types/detail1/comments";

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [nextComment, setNextComment] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { email } = useUserInfoStore();
  const textarea = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();

  // 수정버튼 클릭시 - 커서를 textarea에 auto focusing
  useEffect(() => {
    isEdit && textarea.current?.focus();
    setNextComment(comment.comment);
  }, [isEdit]);

  // 댓글 삭제 mutation
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: ({ email, id }: { email: string | null; id: number }) =>
      deleteComment(email, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentsList"],
      });
    },
  });

  // 댓글 삭제 핸들러
  const handleDeleteComment = (id: number) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      alert("삭제되었습니다.");
      deleteCommentMutation({ email, id });
    }
    return;
  };

  // 댓글 수정 핸들러
  const handleEditOnClick = () => {
    setIsEdit((prev) => !prev);
  };

  // nextComment onChange
  const handleNextComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNextComment(e.target.value);
  };

  return (
    <>
      <div
        key={comment.id}
        className="w-full min-h-[100px] flex flex-col justify-between bg-YellowPale my-2 py-2 pl-3 rounded-md"
      >
        <div>
          <p className="text-sm">닉네임 : {comment.user_nickname}</p>
          {!isEdit && <p className="text-sm">{comment.comment}</p>}
          {isEdit && comment.user_email === email && (
            <textarea
              ref={textarea}
              value={nextComment}
              onChange={handleNextComment}
              className="w-[98%] resize-none text-wrap text-sm"
            />
          )}
        </div>
        <div className="flex justify-end gap-2 mr-4">
          {comment.user_email === email && isLoggedIn && !isEdit && (
            <>
              <button
                onClick={handleEditOnClick}
                className="bg-rose-100 w-10 h-6 rounded-md text-sm"
              >
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
          {comment.user_email === email && isLoggedIn && isEdit && (
            <>
              <button
                onClick={handleEditOnClick}
                className="bg-rose-100 w-16 h-6 rounded-md text-sm"
              >
                수정완료
              </button>
              <button className="bg-gray-100 w-10 h-6 rounded-md text-sm">
                취소
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentItem;
