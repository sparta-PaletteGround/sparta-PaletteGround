import type {
  InsertingComment,
  UpdateCommentType,
} from "@/app/_types/detail1/comments";
import { supabase } from "@/app/_utils/supabase/supabase";

// 댓글 리스트 가져오기
export const getCommentsList = async (id: number) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select()
    .eq("drawing_id", id);
  if (error) {
    throw error;
  }
  return comments;
};

// 댓글 개수 가져오기
export const getCommentsCount = async (drawingId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("drawing_id", drawingId);
  if (error) {
    throw error;
  }
  return data.length;
};

// 댓글 등록하기
export const insertComment = async ({
  nickname,
  email,
  comment,
  drawingId,
}: InsertingComment) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        comment,
        user_nickname: nickname,
        user_email: email,
        drawing_id: drawingId,
      },
    ])
    .select("*");
  if (error) {
    throw error;
  }
  return data;
};

// 댓글 삭제하기
export const deleteComment = async (email: string | null, id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("user_email", email)
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

// 댓글 수정하기 - comments 테이블에서 email, id 일치하는 열 찾아서 comment 업데이트하기
export const updateComment = async ({
  nextComment,
  email,
  id,
}: UpdateCommentType) => {
  console.log(nextComment, email, id);
  const { data, error } = await supabase
    .from("comments")
    .update({ comment: nextComment })
    .eq("user_email", email)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};
