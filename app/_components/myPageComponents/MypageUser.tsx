"use client";
import React, { useEffect, useRef, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "./myPageSupabase";
import Modal from "./modals/Modal";
import { supabase } from "@/app/_utils/supabase/supabase";
import MypageNonAuth from "./MypageNonAuth";
import { useUserInfoStore } from "@/app/_store/authStore";

const MypageUser = () => {
  const [isOpenMidal, setIsOpenModal] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [loginUserEmail, setLoginUserEmail] = useState("dkdk@naver.com");

  const currentUser = useUserInfoStore();
  console.log("currentUser", currentUser);

  const fileInputRef: React.MutableRefObject<any> = useRef(null);

  const [updateNickName, setUpdateNickName] = useState<any>("");
  const [updateImage, setUpdateImage] = useState<any>("");

  const { data, isLoading }: { data: any | null | undefined; isLoading: any } =
    useQuery({
      queryKey: ["user"],
      queryFn: () => getUser({ email: loginUserEmail }),
    });
  useEffect(() => {
    const loginUser = async () => {
      const { userInfo }: any = await supabase.auth.getUser();
      if (userInfo) {
        console.log("로그인한 유저의 정보", data.user);
        //로그인한 유저email state에 전달
        // setLoginUserEmail()
        //전달 한 email queryFn에 매개변수로 전달
        // loginUserEmail
        return userInfo;
      } else {
        setIsLogin(true);
      }
    };
    loginUser();
  }, [data]);

  const queryClient = useQueryClient();

  const updateMutate = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  if (isLoading) {
    return <div>로딩중 ... </div>;
  }
  const userInfo = data[0];
  const { nickname, profile_img, email } = userInfo;

  const handleNickName = (e: any) => {
    setUpdateNickName(e.target.value);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files;
    if (file.length === 0) {
      return;
    }
    const reder = new FileReader();
    reder.onload = () => {
      if (reder.readyState === 2) {
        setUpdateImage(reder.result);
      }
    };
    reder.readAsDataURL(e.target.files[0]);
  };

  const handleUpdateSubmit = () => {
    if (!updateNickName && !updateImage) {
      return alert("변경 사항이 없습니다"), setIsOpenModal(false);
    }
    if (!updateImage) {
      console.log("닉네임만 바뀜");
      const updateData = {
        nickname: updateNickName,
        email,
      };
      updateMutate.mutate(updateData);
    }
    if (!updateNickName) {
      console.log("이미지만 바뀜");
      const updateData = {
        profile_img: updateImage,
        email,
      };
      updateMutate.mutate(updateData);
    }
    if (updateNickName && updateImage) {
      console.log("둘다 바뀜!");
      const updateData = {
        nickname: updateNickName,
        profile_img: updateImage,
        email,
      };
      updateMutate.mutate(updateData);
    }
  };

  return (
    <>
      {isLogin ? (
        <>
          <h1 className="mt-24 ml-20 text-2xl font-bold">💘 마이페이지</h1>
          <section className="border-2 bg-PurpleLight rounded-lg w-96 h-96 ml-20 mt-4">
            <div>
              <div className=" m-8 flex justify-center">
                <img
                  src={profile_img}
                  alt="프로필 이미지"
                  className="w-40 h-40 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-5 items-center">
                <div className="text-xl font-bold text-PurpleMedium">
                  {nickname} 페인터
                </div>
                <div>
                  <button
                    className="w-40 h-10 border-2 rounded-xl bg-PurpleDark text-PurplePale font-bold"
                    onClick={() => setIsOpenModal(true)}
                  >
                    정보 수정하기
                  </button>
                </div>
                <div className="flex gap-28 text-lg">
                  <span>PT. 3600</span>
                  <span>LV. 3</span>
                </div>
              </div>
            </div>
          </section>
          {/* //모달섹션 */}
          <Modal isVisible={isOpenMidal} onClose={() => setIsOpenModal(false)}>
            <div>
              <div className=" m-8 flex justify-center">
                <img
                  src={updateImage ? updateImage : profile_img}
                  alt="프로필 이미지"
                  className="w-40 h-40 rounded-full cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                />
              </div>
              <div className="flex flex-col gap-5 items-center">
                <input
                  className="text-xl font-bold text-PurpleMedium rounded-lg p-2"
                  defaultValue={nickname}
                  onChange={handleNickName}
                />
                {/* 이미지  클릭 */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div>
                  <button
                    className="w-40 h-10 border-2 rounded-xl bg-PurpleDark text-PurplePale font-bold"
                    onClick={handleUpdateSubmit}
                  >
                    수정
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <MypageNonAuth />
      )}
    </>
  );
};

export default MypageUser;
