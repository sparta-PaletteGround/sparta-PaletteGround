import React from 'react';
import MypageUser from '@/app/_components/myPageComponents/MypageUser';
import MypageList from '../_components/myPageComponents/MypageList';

const MyPage = () => {
  return (
    <div className="flex">
      <div>
        <MypageUser />
      </div>
      <div>
        <MypageList />
      </div>
    </div>
  );
};

export default MyPage;
