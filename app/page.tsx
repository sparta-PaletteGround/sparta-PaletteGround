import { createClient } from "@/app/_utils/supabase/server";
import logo from "@/app/_assets/image/logo-line.png";
import logoCurve from "@/app/_assets/image/logo-curve.png";
import Image, { StaticImageData } from "next/image";

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

  return <div>mainpage</div>;
}
