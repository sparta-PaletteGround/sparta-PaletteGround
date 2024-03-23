import { supabase } from '@/app/_utils/supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getUser = async (payload: any) => {
  const { email } = await payload;
  const { data }: PostgrestSingleResponse<any[]> = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
  return data;
};
export const updateUser = async (payload: any) => {
  const { email, nickname, profile_img } = payload;
  if (!profile_img) {
    const { error } = await supabase
      .from('users')
      .update({ nickname })
      .eq('email', email);
  }
  if (!nickname) {
    const { error } = await supabase
      .from('users')
      .update({ profile_img })
      .eq('email', email);
  }
  if (nickname && profile_img) {
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
    return data;
  }
};

export const getPosts = async (payload: any) => {
  const { email } = await payload;
  const { data }: PostgrestSingleResponse<any[]> = await supabase
    .from('posts')
    .select('*')
    .eq('painter_email', email);
  return data;
};
