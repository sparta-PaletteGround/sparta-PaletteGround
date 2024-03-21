import { supabase } from "@/app/_utils/supabase/supabase";

// auth에서 유저 정보 가져오기
export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();
  if (data !== null) {
    return data.user;
  } else {
    return null;
  }
};
