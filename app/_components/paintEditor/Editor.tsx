"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import initialData from "./initialData";
import { uploadImageToStorage } from "@/app/_api/uploadImgToStorage";

import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import {
  InputStyle,
  SubmitBtn,
  TextAreaStyle,
} from "@/app/_styles/editorPageStyles";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("weeklyThese");
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [blobUrl, setBlobUrl] = useState("");
  const imageRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const [fileName, setFileName] = useState("");

  const handleOnClick = async () => {
    try {
      if (!excalidrawAPI) return;
      const timestamp = new Date().getTime();
      const fileName = `image_${timestamp}.png`;

      const blob = await exportToBlob({
        elements: excalidrawAPI?.getSceneElements(),
        mimeType: "image/png",
        appState: {
          ...initialData.appState,
        },
        files: excalidrawAPI.getFiles(),
      });
      setBlobUrl(window.URL.createObjectURL(blob));
      const file = new File([blob], "name");

      console.log("file", file);

      console.log("뭡니까", blob);
      const result = await uploadImageToStorage(file, fileName);
      console.log(`그림 업로드 성공`, result);
    } catch (error) {
      console.error(`그림 업로드 중 오류 발생:`, error);
    }
  };

  // const handleOnClick = async (file: File, fileName: string) => {
  //   try {
  //     const result = await uploadImageToStorage(file, fileName);
  //     console.log(`그림 업로드 성공`, result);
  //   } catch (error) {
  //     console.error(`그림 업로드 중 오류 발생:`, error);
  //   }
  // };

  // const handleFileChange = async () => {
  //   const selectedFile = fileInputRef.current.files[0];
  //   if (selectedFile) {
  //     const fileName = selectedFile.name;
  //     setFileName(fileName);
  //     console.log("선택한 파일", selectedFile);
  //   } else {
  //     console.log("파일이 선택되지 않았습니다.");
  //   }
  // };

  console.log(imageRef.current);

  return (
    <div className="flex p-3 rounded-xl bg-PurplePale gap-3">
      <div className="h-[650px] w-[1200px] bg-white p-2 rounded-xl">
        <Excalidraw
          langCode="ko-KR"
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      </div>
      <div className="w-[300px]">
        <form className="flex flex-col gap-3">
          {/* <input type="file" ref={fileInputRef} onChange={handleFileChange} /> */}
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
          <div className="flex gap-10 justify-center">
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
              자유 주제
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

export default Editor;
