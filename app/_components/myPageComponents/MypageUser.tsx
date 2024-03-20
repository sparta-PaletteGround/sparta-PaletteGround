'use client';
import React, { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUser } from './myPageSupabase';
import Modal from './modals/Modal';

const MypageUser = () => {
  const [isOpenMidal, setIsOpenModal] = useState(false);

  const fileInputRef: React.MutableRefObject<any> = useRef(null);
  const [updateNickName, setUpdateNickName] = useState('');

  const { data, isLoading }: { data: any | null | undefined; isLoading: any } =
    useQuery({
      queryKey: ['data'],
      queryFn: getUser,
    });

  if (isLoading) {
    return <div>로딩중 ... </div>;
  }
  const userInfo = data[0];
  const { nickname, profile_img } = userInfo;

  const handleNickName = (e: any) => {
    setUpdateNickName(e.target.value);
  };
  const handleImageUpdate = () => {
    fileInputRef.current.click();
  };

  return (
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
      {/* 모달 섹션 */}
      <Modal isVisible={isOpenMidal} onClose={() => setIsOpenModal(false)}>
        <div>
          <div className=" m-8 flex justify-center">
            <img
              src={profile_img}
              alt="프로필 이미지"
              className="w-40 h-40 rounded-full cursor-pointer"
              onClick={handleImageUpdate}
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <input
              className="text-xl font-bold text-PurpleMedium rounded-lg p-2"
              defaultValue={nickname}
              onChange={handleNickName}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div>
              <button
                className="w-40 h-10 border-2 rounded-xl bg-PurpleDark text-PurplePale font-bold"
                onClick={() => setIsOpenModal(true)}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default MypageUser;
