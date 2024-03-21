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

// 좋아요 클릭시 로그인한 user의 likes_array에 그림id 추가하기
export const insertDrawingId = async (email: string, drawingId: number) => {
  // email을 사용하여 해당 사용자 찾기 - users 반환값은 배열 안의 객체
  const { data: users, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  if (error) {
    console.error("Error fetching user:", error.message);
    return;
  }

  // 해당 사용자의 likes_array에 drawingId 추가하기
  const selectedUser = users[0];
  const updatedBookmarksArray = [...selectedUser.likes_array, drawingId];

  // 수정한 배열을 해당 유저의 likes_array에 업데이트하기
  const { error: updateError } = await supabase
    .from("users")
    .update({ likes_array: updatedBookmarksArray })
    .eq("email", email);

  if (updateError) {
    console.error("Error updating user drawings array:", updateError.message);
    return;
  }
};
