import { supabase } from "@/app/_utils/supabase/supabase";

export const uploadImageToStorage = async (blob: File, fileName: string) => {
  try {
    const mimeType = blob.type;
    const { data, error } = await supabase.storage
      .from("drawings")
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: false,
        contentType: mimeType,
      });
    if (error) {
      alert(`일시적인 오류가 발생했습니다. 다시 시도하세요.`);
      return { error };
    }
    alert(`드로잉이 등록되었습니다!`);
    return data.path;
  } catch (error) {
    alert(`일시적인 오류가 발생했습니다. 다시 시도하세요.`);
    return { error };
  }
};
