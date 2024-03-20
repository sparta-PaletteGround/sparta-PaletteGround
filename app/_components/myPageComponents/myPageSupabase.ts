import { supabase } from '@/app/_utils/supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getUser = async () => {
  const { data }: PostgrestSingleResponse<any[]> = await supabase
    .from('users')
    .select();
  return data;
};
