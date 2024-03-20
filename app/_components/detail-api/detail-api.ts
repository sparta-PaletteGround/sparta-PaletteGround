import { supabase } from "@/app/_utils/supabase/supabase";

export const getPost = async () => {
  const { data, error } = await supabase.from("posts").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

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
