import { supabase } from "@/app/_utils/supabase/supabase";

import type { User } from "../_types/myPageType";

export const getPainter = async (uid: number): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", uid)
    .single();

  if (error) {
    alert(`일시적 오류로 데이터를 불러올 수 없습니다. 잠시후 다시 시도하세요.`);
    return null;
  }

  return data || null;
};
