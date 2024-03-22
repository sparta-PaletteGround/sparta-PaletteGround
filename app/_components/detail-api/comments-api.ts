import { InsertingComment } from "@/app/_types/detail1/comments";
import { supabase } from "@/app/_utils/supabase/supabase";

export const getCommentsList = async () => {
  const { data: comments, error } = await supabase.from("comments").select();
  if (error) {
    throw error;
  }
  return comments;
};

export const insertComment = async ({
  nickname,
  email,
  comment,
}: InsertingComment) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        comment,
        user_nickname: nickname,
        user_email: email,
      },
    ])
    .select("*");
  if (error) {
    throw error;
  }
  return data;
};
