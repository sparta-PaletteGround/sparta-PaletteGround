"use client";

import {
  AttachFileBtn,
  InputStyle,
  SubmitBtn,
  TextAreaStyle,
} from "@/app/_styles/editorPageStyles";
import React, { useRef, useState } from "react";

const WriteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const fileInputRef = useRef(null);

  return (
    <div className="rounded-xl bg-PurplePale p-3 w-[300px]">
      <form className="flex flex-col gap-5">
        <button type="button" style={AttachFileBtn}>
          저장한 그림 첨부하기
        </button>
        <input placeholder="제목" style={InputStyle} />
        <textarea placeholder="내용" style={TextAreaStyle} />
        <div className="flex gap-3 justify-center">
          <label>
            <input type="radio" value="weeklyTheme" /> 이번주 주제
          </label>
          <label>
            <input type="radio" value="freeTheme" /> 자유
          </label>
        </div>
        <button style={SubmitBtn}>등록</button>
      </form>
    </div>
  );
};

export default WriteForm;
