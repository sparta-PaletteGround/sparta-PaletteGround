import { supabase } from "@/app/_utils/supabase/supabase";

// 유저가 좋아요 했는지 미리 확인하기 - likes에서 email, drawing_id 존재하는지 확인
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

// 좋아요! - likes테이블에 email, id, url 추가하기
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
  return data;
};

// 좋아요 취소 - likes 테이블에서 그림id가 같은 열 삭제
export const deleteLike = async (id: number) => {
  const { data, error } = await supabase
    .from("likes")
    .delete()
    .eq("drawing_id", id)
    .select();
  if (error) {
    throw error;
  }
  return data;
};

export const countLikesNumber = async (id: number) => {
  const { data, error } = await supabase
    .from("likes")
    .select()
    .eq("drawing_id", id);
  if (error) {
    throw error;
  }
  return data.length;
};
