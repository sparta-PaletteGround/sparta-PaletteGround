import { supabase } from '@/app/_utils/supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { data } from 'autoprefixer';

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

export const uploadImage = async (img: any, filePath: any) => {
  const { data, error } = await supabase.storage
    .from('profileImage')
    .upload(filePath, img, {
      cacheControl: '3600',
      upsert: true,
    });
  if (error) {
    console.log('이미지 수정 실패', error);
  } else {
    console.log('이미지 수정 완료', data);
    return data;
  }
};
