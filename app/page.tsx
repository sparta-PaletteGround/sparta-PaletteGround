import { createClient } from "@/app/_utils/supabase/server";
import Carousel from "./_components/main/Carousel";
import MainContents from "./_components/main/MainContents";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
      <Carousel />
      <MainContents />
    </>
  );
}
