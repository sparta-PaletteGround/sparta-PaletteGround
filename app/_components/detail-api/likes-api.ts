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

// 유저의 likes_array 가져오기
export const getLikesArray = async (email: string) => {
  console.log("email", email);
  const { data, error } = await supabase
    .from("users")
    .select("likes_array")
    .eq("email", email);
  if (error) {
    console.error(error);
  }

  return data;
};

// likes에서 email, drawing_id 존재하는지 확인 - 유저가 좋아요 했는지 확인하기
export const isCheckLikeState = async (drawingId: number) => {
  // current loggedIn user의 email 가져오기
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const email = user.user.email;

  // likes테이블에서 email, drawingId 모두 일치하는값 있는지 확인하기
  const { data: like, error } = await supabase
    .from("likes")
    .select()
    .eq("user_email", email)
    .eq("drawing_id", drawingId);

  if (error) {
    throw error;
  }

  return like.length > 0;
};

// likes테이블에 email, id, url 추가하기
export const insertLike = async (id: number, url: string) => {
  // current loggedIn user의 email 가져오기
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  const email = user.user.email;

  // likes 테이블에 insert
  const { data, error } = await supabase.from("likes").insert([
    {
      user_email: email,
      drawing_id: id,
      drawing_url: url,
    },
  ]);
  if (error) {
    throw error;
  }
  console.log("data", data);
  return data;
};
