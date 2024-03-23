import { supabase } from "@/app/_utils/supabase/supabase";

import type { User } from "../_types/myPageType";

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select();

  if (error) {
    alert(`일시적 오류로 데이터를 불러올 수 없습니다. 잠시후 다시 시도하세요.`);
    return [];
  }

  return data || [];
};

// 로그인한 유저의 profile 이미지 가져오기
export const getProfileImg = async (email: string | null) => {
  const { data: profileImg, error } = await supabase
    .from("users")
    .select("profile_img")
    .eq("email", email);
  if (error) {
    throw error;
  }
  return profileImg;
};
