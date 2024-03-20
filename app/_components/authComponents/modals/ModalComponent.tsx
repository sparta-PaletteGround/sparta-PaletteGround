import Image, { StaticImageData } from "next/image";

import logo from "@/public/image/logo-line.png";
import { useAuthStore } from "@/app/_store/authStore";
import { Children } from "react";

const ModalComponent = ({ children }: any) => {
  const { setIsLoginOpen, setIsSignUpOpen } = useAuthStore();

  // 로그인 창 닫기 버튼
  const handleOnCloseBtn = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
      <section className="z-[100] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="modal flex flex-col justify-center items-center bg-Background w-96 h-[500px] rounded-3xl">
          <button className="text-black" onClick={handleOnCloseBtn}>
            X
          </button>
          <Image src={logo} alt="로고이미지" />
          {children}
        </div>
      </section>
    </div>
  );
};

export default ModalComponent;