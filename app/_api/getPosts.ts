import { supabase } from "@/app/_utils/supabase/supabase";

import type { Posts } from "../_types/detail1/posts";
import { CommentOfPainter } from "../_types/detail1/comments";

export const getPosts = async (): Promise<Posts[]> => {
  const { data, error } = await supabase.from("posts").select();
  if (error) {
    alert(`일시적 오류로 데이터를 불러올 수 없습니다. 잠시후 다시 시도하세요.`);
    return [];
  }
  return data as Posts[];
};

export const getDrawings = async (userEmail: string): Promise<Posts[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("painter_email", userEmail);
  if (error) {
    alert(`일시적 오류로 데이터를 불러올 수 없습니다. 잠시후 다시 시도하세요.`);
    return [];
  }
  return data as Posts[];
};

export const getPainterComment = async (
  userEmail: string
): Promise<CommentOfPainter[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select()
    .filter("user_email", "eq", userEmail);
  if (error) {
    alert(`일시적 오류로 데이터를 불러올 수 없습니다. 잠시후 다시 시도하세요.`);
    return [];
  }

  return data || [];
};
