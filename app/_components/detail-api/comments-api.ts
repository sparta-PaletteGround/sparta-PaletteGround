import { supabase } from "@/app/_utils/supabase/supabase";

export const getCommentsList = async () => {
  const { data: comments, error } = await supabase.from("comments").select();
  if (error) {
    throw error;
  }
  return comments;
};
