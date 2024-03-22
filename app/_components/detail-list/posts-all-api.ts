import { supabase } from "@/app/_utils/supabase/supabase";

// 모든 post 가져오기
export const getAllPost = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};
