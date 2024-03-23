import { supabase } from "@/app/_utils/supabase/supabase";

// 그림 그린 painter 정보 가져오기
export const getPainterInfo = async (email: string | null) => {
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

// posts테이블에서 일치하는 email의 그림 url들을 배열로 반환하기
export const getDrawingUrls = async (
  email: string | null,
  drawingId: number | undefined
) => {
  const { data: urlArray, error } = await supabase
    .from("posts")
    .select("drawing_url")
    .eq("painter_email", email)
    .not("drawing_id", "eq", drawingId);

  if (error) {
    throw error;
  }
  const urls = urlArray.map((urlObj) => urlObj.drawing_url);
  return urls;
};
