import { Posts } from "@/app/_types/detail1/posts";
import { supabase } from "@/app/_utils/supabase/supabase";

// 모든 post 가져오기
export const getAllPost = async (): Promise<Posts[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
