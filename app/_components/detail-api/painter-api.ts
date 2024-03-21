import { supabase } from "@/app/_utils/supabase/supabase";

// 그림 그린 painter 정보 가져오기
export const getPainterInfo = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);
  if (error) {
    console.error(error);
    return error;
  }

  return data;
};

// painter의 다른 그림들 url 가져오기
export const getDrawingUrls = async (drawingIds: number[]) => {
  const response = await supabase
    .from("posts")
    .select("drawing_url")
    .in("drawing_id", drawingIds)
    .then(({ data: postsData, error }) => {
      if (error) throw error;
      const drawingUrls = postsData.map((post) => post.drawing_url);
      return drawingUrls;
    });
  return response;
};
