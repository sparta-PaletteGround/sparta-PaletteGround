import { supabase } from '@/app/_utils/supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getUser = async (payload: any) => {
  const { email } = await payload;
  console.log(email);
  const { data }: PostgrestSingleResponse<any[]> = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
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

export const updateStorage = async (img, storagePath, newPath) => {
  const imgUpdate = await supabase.storage
    .from('profileImage')
    .upload(newPath, img, {
      cacheControl: '3600',
      upsert: true,
    });
  if (imgUpdate.error) {
    console.log('이미지 수정 실패', imgUpdate.error);
  } else {
    console.log('이미지 수정 완료', imgUpdate);
    return imgUpdate.data.path;
  }
};
