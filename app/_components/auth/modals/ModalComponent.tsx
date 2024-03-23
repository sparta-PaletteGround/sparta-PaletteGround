import Image, { StaticImageData } from "next/image";

import logo from "@/public/image/logo-line.png";
import { useAuthStore } from "@/app/_store/authStore";
import { Children, useRef } from "react";

const ModalComponent = ({ children }: any) => {
  const { setIsLoginOpen, setIsSignUpOpen } = useAuthStore();
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 창 닫기 버튼
  const handleOnCloseBtn = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  // 모달 내부 클릭 시, 이벤트 버블링 방지
  const handleModalInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleOnCloseBtn}
      className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
    >
      <section className="z-[100] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          onClick={handleModalInnerClick}
          ref={modalRef}
          className="modal relative flex flex-col justify-center items-center bg-Background w-[400px] h-[550px] rounded-3xl"
        >
          <button
            className="text-medium absoulte fixed top-4 right-6  text-zinc-600"
            onClick={handleOnCloseBtn}
          >
            X
          </button>
          <Image src={logo} alt="로고이미지" className="absoulte top-12 p-6" />
          {children}
        </div>
      </section>
    </div>
  );
};

export default ModalComponent;
