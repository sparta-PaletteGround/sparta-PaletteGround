import { supabase } from '@/app/_utils/supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getUser = async (payload: any) => {
  const { email } = payload;
  const { data }: PostgrestSingleResponse<any[]> = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
  console.log(data);
  return data;
};
export const updateUser = async (payload: any) => {
  const { email, nickname, profile_img } = payload;
  if (!profile_img) {
    alert('닉네임만 변경됨 !');
    const { error } = await supabase
      .from('users')
      .update({ nickname })
      .eq('email', email);
  }
  if (!nickname) {
    alert('이미지만 변경됨 !');
    const { error } = await supabase
      .from('users')
      .update({ profile_img })
      .eq('email', email);
  }
  if (nickname && profile_img) {
    alert('둘다 변경 됨!');
    const { error } = await supabase
      .from('users')
      .update({ nickname, profile_img })
      .eq('email', email);
  }
  return;
};
// 둘다 변경시 supabase 반짝거림
