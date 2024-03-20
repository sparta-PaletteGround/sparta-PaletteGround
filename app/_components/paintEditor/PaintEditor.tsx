"use client";

import { HowToSaveBtn } from "@/app/_styles/editorPageStyles";
import { Excalidraw } from "@excalidraw/excalidraw";
import React from "react";

const PaintEditor = () => {
  return (
    <div className="h-[600px] w-[1200px] p-3 rounded-xl bg-PurplePale">
      <Excalidraw
        langCode="ko-KR"
        renderTopRightUI={() => {
          return (
            <button
              style={HowToSaveBtn}
              onClick={() => window.alert("This is dummy top right UI")}
            >
              그림 저장방법
            </button>
          );
        }}
      />
    </div>
  );
};

export default PaintEditor;
