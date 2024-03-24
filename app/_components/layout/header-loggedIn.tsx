import { getProfileImg } from "@/app/_api/getUsers";
import { useAuthStore, useUserInfoStore } from "@/app/_store/authStore";
import { supabase } from "@/app/_utils/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const LoggedIn = () => {
  const { setIsLoggedIn } = useAuthStore();
  const { setUser, email } = useUserInfoStore();

  /** 현재 로그인한 유저의 프로필 이미지 가져오기 **/
  const {
    data: profileImgArray,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user", { type: "profileImg" }],
    queryFn: () => getProfileImg(email),
    enabled: !!email,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const profileImg = profileImgArray[0].profile_img;

  /** 로그인한 유저가 로그아웃 클릭 시 */
  const handleOnClickLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      alert("로그아웃 되었습니다.");
      sessionStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUser({
        email: null,
        nickname: null,
        profileImage: null,
        googleName: null,
        googleProfileImg: null,
      });
    }
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center mr-10 gap-4">
        <p className="text-white cursor-pointer" onClick={handleOnClickLogout}>
          로그아웃
        </p>
        <Link href="/mypage">
          <img
            src={profileImg}
            alt="사용자 이미지"
            className="rounded-3xl w-[50px] h-[50px]"
          />
        </Link>
      </div>
    </>
  );
};

export default LoggedIn;
