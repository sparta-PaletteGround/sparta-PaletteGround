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
    console.log("연결됐나?");
    if (error) {
      console.error("Error uploading image:", error.message);
      return { error };
    }

    console.log("Image uploaded successfully:", data.path);
    return data.path;
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error };
  }
};
