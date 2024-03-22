import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { deleteComment, updateComment } from "../detail-api/comments-api";

import type {
  Comment,
  DeleteCommentType,
  UpdateCommentType,
} from "@/app/_types/detail1/comments";

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
    mutationFn: ({ email, id }: DeleteCommentType) => deleteComment(email, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  // 댓글 수정 mutation
  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: ({ email, id, nextComment }: UpdateCommentType) =>
      updateComment({ nextComment, email, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  // nextComment onChange
  const handleNextComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNextComment(e.target.value);
  };

  // 수정, 수정완료 버튼 핸들러
  const handleEditHandler = (id: number) => {
    // 수정완료버튼
    if (isEdit) {
      if (nextComment !== comment.comment) {
        const confirm = window.confirm("수정하시겠습니까?");
        if (confirm) {
          // insert하는 api mutation 호출
          updateCommentMutation({ nextComment, email, id });
          setIsEdit((prev) => !prev);
        }
        return;
      } else if (nextComment === comment.comment) {
        alert("수정사항이 없습니다.");
      }

      // 수정 버튼
    } else if (!isEdit) {
      setIsEdit((prev) => !prev);
    }
  };

  // 삭제, (수정)취소 버튼
  const handleDeleteCancelHandler = (id: number) => {
    // (수정)취소 버튼
    if (isEdit) {
      const confirm = window.confirm("취소하시겠습니까?");
      if (confirm) {
        setNextComment(comment.comment);
        setIsEdit((prev) => !prev);
      }
      return;

      // 삭제 버튼
    } else if (!isEdit) {
      const confirm = window.confirm("삭제하시겠습니까?");
      if (confirm) {
        deleteCommentMutation({ email, id });
      }
      return;
    }
  };

  return (
    <>
      <div
        key={comment.id}
        className="w-full min-h-[100px] flex flex-col justify-between bg-YellowPale my-2 py-2 pl-3 rounded-md"
      >
        <div>
          <p className="text-sm mb-1">닉네임 : {comment.user_nickname}</p>
          {/* 수정 전 댓글창 */}
          {!isEdit && (
            <div className="w-[98%] min-h-[53px] bg-Background mb-2">
              <p className="text-sm p-2 h-auto">{comment.comment}</p>
            </div>
          )}
          {/* 수정 중 댓글창 textarea */}
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
          {/* 수정 전 버튼*/}
          {!isEdit && comment.user_email === email && isLoggedIn && (
            <>
              <button
                onClick={() => handleEditHandler(comment.id)}
                className="bg-rose-100 w-10 h-6 rounded-md text-sm"
              >
                수정
              </button>
              <button
                onClick={() => handleDeleteCancelHandler(comment.id)}
                className="bg-gray-100 w-10 h-6 rounded-md text-sm"
              >
                삭제
              </button>
            </>
          )}
          {/* 수정 중 버튼*/}
          {isEdit && (
            <>
              <button
                onClick={() => handleEditHandler(comment.id)}
                className="bg-rose-100 w-16 h-6 rounded-md text-sm"
              >
                수정완료
              </button>
              <button
                onClick={() => handleDeleteCancelHandler(comment.id)}
                className="bg-gray-100 w-10 h-6 rounded-md text-sm"
              >
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
