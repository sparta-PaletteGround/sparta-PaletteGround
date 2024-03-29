"use client";

import React, { useEffect, useState } from "react";
import theme from "@/app/_constant/theme";
import initialData from "./initialData";

import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import { uploadImageToStorage } from "@/app/_api/uploadToStorage";
import { ThemeImageStyle } from "@/app/_styles/imageStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/_utils/supabase/supabase";
import { useUserInfoStore } from "@/app/_store/authStore";
import { useRouter } from "next/navigation";

import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import type { Posts } from "@/app/_types/detail1/posts";
import {
  InputStyle,
  SubmitBtn,
  TextAreaStyle,
} from "@/app/_styles/editorPageStyles";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chooseTheme, setChooseTheme] = useState("weeklyTheme");

  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const currentUserInfo = useUserInfoStore();
  const currentUserEmail = currentUserInfo.email;

  /** 로그인 안된 유저가 페이지에 접근 시 */
  useEffect(() => {
    if (currentUserInfo.email === null) {
      alert("로그인 후 이용할 수 있는 서비스입니다.");
      router.replace("/");
    }
  }, [currentUserInfo]);

  /** 게시글 등록 mutation */
  const insertMutation = useMutation({
    mutationFn: async (newPost: Posts) => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .insert([newPost])
          .select();

        if (error) {
          alert(`서버 오류 발생! 잠시 후 다시 시도하세요.`);
          throw error;
        }
        const updatedPost = data[0] as Posts;
        return updatedPost;
      } catch (error) {
        alert(`게시글 등록에 실패했습니다. 다시 시도하세요.`);
        throw error;
      }
    },
  });

  /** 게시글 등록 버튼 클릭 핸들러 */
  const handleOnClick = async () => {
    if (!title || !description) {
      alert(`제목과 내용을 입력해주세요.`);
      return;
    }

    try {
      if (!excalidrawAPI) return;
      const created_at = new Date().toISOString();
      const timestamp = new Date().getTime();
      const fileName = `image_${timestamp}.png`;

      const blob = await exportToBlob({
        elements: excalidrawAPI.getSceneElements(),
        mimeType: "image/png",
        appState: {
          ...initialData.appState,
        },
        files: excalidrawAPI.getFiles(),
      });
      const file = new File([blob], "name");
      const imgUrl: string | unknown = await uploadImageToStorage(
        file,
        fileName
      );

      if (typeof imgUrl !== "string") {
        console.error(`이미지 URL이 유효하지 않습니다.`);
        return;
      }

      const newPost: Posts = {
        title,
        description,
        created_at,
        drawing_url: imgUrl,
        painter_email: currentUserEmail,
        likes: 0,
        chooseTheme,
      };
      insertMutation.mutate(newPost, {
        onSuccess: (updatedPost) => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          router.replace(`/detail/${updatedPost.drawing_id}`);
        },
      });
    } catch (error) {
      console.error(`그림 업로드 중 오류 발생:`, error);
    }
  };

  return (
    <div className="flex p-3 rounded-xl bg-PurplePale gap-3">
      <div className="h-[650px] w-[1200px] bg-white p-2 rounded-xl">
        <Excalidraw
          langCode="ko-KR"
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      </div>
      <div className="w-[300px] flex flex-col gap-3">
        <div
          className="flex flex-col items-center justify-center"
          style={ThemeImageStyle}
        >
          <span className="text-white">이번주 주제</span>
          <span className="text-large font-bold text-white">{theme.theme}</span>
        </div>
        <form className="flex flex-col gap-3">
          <input
            placeholder="제목(최대 25자)"
            maxLength={25}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={InputStyle}
          />
          <textarea
            placeholder="내용(최대 100자)"
            maxLength={100}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={TextAreaStyle}
          />
          <div className="flex gap-10 justify-center">
            <label>
              <input
                type="radio"
                name="theme"
                checked={chooseTheme === "weeklyTheme"}
                onChange={(e) => setChooseTheme(e.target.value)}
                value="weeklyTheme"
              />{" "}
              이번주 주제
            </label>
            <label>
              <input
                type="radio"
                name="theme"
                checked={chooseTheme === "freeTheme"}
                onChange={(e) => setChooseTheme(e.target.value)}
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
      </div>
    </div>
  );
};

export default Editor;
