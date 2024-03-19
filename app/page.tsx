import { createClient } from "@/app/_utils/supabase/server";
import Carousel from "./_components/main/Carousel";
import WeeklyTheme from "./_components/main/WeeklyTheme";
import Latest from "./_components/main/Latest";
import BestPainter from "./_components/main/BestPainter";
import Home from "./_components/main/Home";

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

  return <Home />;
}
