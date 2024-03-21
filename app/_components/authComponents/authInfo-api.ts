import { supabase } from "@/app/_utils/supabase/supabase";

// auth에서 유저 정보 가져오기
export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();
  if (data !== null) {
    // console.log("로그인한 유저의 정보", data.user);
    return data.user;
  } else {
    // console.log("현재 로그인된 사용자가 없습니다.");
    return null;
  }
};
