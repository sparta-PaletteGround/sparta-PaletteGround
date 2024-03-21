import { supabase } from "@/app/_utils/supabase/supabase";

// drawing id에 해당하는 post 가져오기
export const getSinglePost = async (id: number) => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("drawing_id", id);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};
