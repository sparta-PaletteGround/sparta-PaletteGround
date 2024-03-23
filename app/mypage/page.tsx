import React from 'react';
import MypageUser from '../_components/myPageComponents/MypageUser';
import MypageList from '../_components/myPageComponents/MyPageList';

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
