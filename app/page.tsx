import { createClient } from "@/app/_utils/supabase/server";
import Carousel from "./_components/main/Carousel";
import WeeklyTheme from "./_components/main/WeeklyTheme";

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
      <WeeklyTheme />
    </>
  );
}
