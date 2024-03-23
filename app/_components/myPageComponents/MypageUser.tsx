'use client';
import React, { useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, updateUser, uploadImage } from './myPageSupabase';
import Modal from './modals/Modal';
import { useAuthStore, useUserInfoStore } from '@/app/_store/authStore';
import { supabase } from '@/app/_utils/supabase/supabase';
import MypageNonAuth from '@/app/_components/myPageComponents/MyPageNonAuth';

const MypageUser = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fileInputRef: React.MutableRefObject<any> = useRef(null);

  const [updateNickName, setUpdateNickName] = useState<any>('');
  const [updateImage, setUpdateImage] = useState<any>('');

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const currentUserInfo = useUserInfoStore();
  const currentUserEmail = currentUserInfo.email;

  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser({ email: currentUserEmail }),
    enabled: !!currentUserEmail,
  });

  const queryClient = useQueryClient();

  const updateMutate = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  if (isPending) {
    return <div>로딩중 ... </div>;
  }

  const { nickname, profile_img, email } = data;

  const handleNickName = (e: any) => {
    setUpdateNickName(e.target.value);
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file.length === 0) {
      return;
    }

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setUpdateImage(imgUrl);
    }
  };

  const randomUUID = self.crypto.randomUUID();
  const filePath = email + randomUUID;
  const handleUpdateSubmit = async () => {
    if (!updateNickName && !updateImage) {
      return alert('변경 사항이 없습니다'), setIsOpenModal(false);
    }
    //둘다 변경했을때
    if (updateNickName && updateImage) {
      const img = fileInputRef.current.files[0];
      const data: any = await uploadImage(img, filePath);
      const { data: createPublicUrl } = supabase.storage
        .from('profileImage')
        .getPublicUrl(data.path);
      const imageUrl = createPublicUrl.publicUrl;
      const updateData = {
        nickname: updateNickName,
        profile_img: imageUrl,
        email,
      };
      updateMutate.mutate(updateData);
      alert('프로필 수정 완료!');
      setUpdateImage('');
      setUpdateNickName('');
      setIsOpenModal(false);
    }
    //닉네임만 변경했을때
    if (!updateImage) {
      console.log('닉네임만 바뀜');
      const updateData = {
        nickname: updateNickName,
        email,
      };
      updateMutate.mutate(updateData);
      alert('프로필 수정 완료!');
      setUpdateImage('');
      setUpdateNickName('');
      setIsOpenModal(false);
    }
    //이미지만 변경했을때
    if (!updateNickName) {
      const img = fileInputRef.current.files[0];
      const data: any = await uploadImage(img, filePath);
      const { data: createPublicUrl } = supabase.storage
        .from('profileImage')
        .getPublicUrl(data.path);
      const imageUrl = createPublicUrl.publicUrl;
      const updateData = {
        email,
        profile_img: imageUrl,
      };
      updateMutate.mutate(updateData);
      alert('프로필 수정 완료!');
      setUpdateImage('');
      setUpdateNickName('');
      setIsOpenModal(false);
    }
  };

  return (
    <>
      {isLoggedIn ? (
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
          <Modal isVisible={isOpenModal} onClose={() => setIsOpenModal(false)}>
            <div>
              <div className=" m-8 flex justify-center">
                <img
                  src={updateImage ? updateImage : profile_img}
                  alt="프로필 이미지"
                  className="w-40 h-40 rounded-full cursor-pointer"
                  onClick={handleImageClick}
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
                  style={{ display: 'none' }}
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
