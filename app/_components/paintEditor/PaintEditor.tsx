"use client";

import React, { useState } from "react";
import {
  HowToSaveBtn,
  InputStyle,
  SubmitBtn,
  TextAreaStyle,
} from "@/app/_styles/editorPageStyles";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import initialData from "./initialData";

import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ImageResponse } from "next/server";
import Image from "next/image";

const PaintEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("weeklyThese");
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [blobUrl, setBlobUrl] = useState("");

  const handleOnClick = async () => {
    if (!excalidrawAPI) return;

    const blob = await exportToBlob({
      elements: excalidrawAPI?.getSceneElements(),
      mimeType: "image/png",
      appState: {
        ...initialData.appState,
      },
      files: excalidrawAPI.getFiles(),
    });
    setBlobUrl(window.URL.createObjectURL(blob));
    console.log("blob", blob);
    console.log("blobURL", blobUrl);
  };

  return (
    <div className="flex p-3 rounded-xl bg-PurplePale gap-3">
      <div className="h-[650px] w-[1200px] bg-white p-2 rounded-xl">
        <Excalidraw
          langCode="ko-KR"
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      </div>
      <div className="w-[300px]">
        <form className="flex flex-col gap-5">
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={InputStyle}
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={TextAreaStyle}
          />
          <div className="flex gap-3 justify-center">
            <label>
              <input
                type="radio"
                name="theme"
                checked={theme === "weeklyTheme"}
                onChange={(e) => setTheme(e.target.value)}
                value="weeklyTheme"
              />{" "}
              이번주 주제
            </label>
            <label>
              <input
                type="radio"
                name="theme"
                checked={theme === "freeTheme"}
                onChange={(e) => setTheme(e.target.value)}
                value="freeTheme"
              />{" "}
              자유
            </label>
          </div>
          <button
            style={SubmitBtn}
            onClick={(e) => {
              e.preventDefault();
              handleOnClick();
            }}
          >
            등록
          </button>
        </form>
        <Image src={blobUrl} alt="" width={300} height={300} />
      </div>
    </div>
  );
};

export default PaintEditor;
