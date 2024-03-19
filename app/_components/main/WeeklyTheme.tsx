import React from "react";
import { ThemeImageStyle } from "@/app/_styles/imageStyles";
import theme from "@/app/_constant/theme";
import { YellowLinkBtn } from "../common/Button";

const WeeklyTheme = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="w-[1000px] mt-10 flex flex-col gap-2">
        <h1 className="text-large font-bold">💜이번주 주제</h1>
        <div style={ThemeImageStyle} className="flex-col">
          <h1 className="text-xLarge font-bold">{theme.theme}</h1>
          <p>{theme.description}</p>
        </div>
      </div>
      <div className="w-[1000px] flex justify-end mt-2">
        <YellowLinkBtn href="/" text="자세히 보기" />
      </div>
    </section>
  );
};

export default WeeklyTheme;
