import { InsertingComment } from "@/app/_types/detail1/comments";
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

// 댓글 등록하기
export const insertComment = async ({
  nickname,
  email,
  comment,
  id,
}: InsertingComment) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        comment,
        user_nickname: nickname,
        user_email: email,
        drawing_id: id,
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
