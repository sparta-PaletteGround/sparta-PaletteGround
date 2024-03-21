import { supabase } from "@/app/_utils/supabase/supabase";

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
