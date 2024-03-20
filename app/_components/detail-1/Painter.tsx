import { PostProps } from "@/app/_types/detail1/posts";
import { useQuery } from "@tanstack/react-query";
import { getPainterInfo } from "../detail-api/detail-api";
import DrawingsByPainter from "./DrawingsByPainter";

const Painter = ({ post }: PostProps) => {
  // 그림 작성자 nickname, profile_img, 그린 그림들 가져오기
  const {
    data: painterInfoArray,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["painterInfo"],
    queryFn: () => getPainterInfo(post.painter_email),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !Array.isArray(painterInfoArray)) {
    return <div>Error</div>;
  }

  const painterInfo = painterInfoArray[0];

  // 유저가 그린 그림id 배열
  const drawingIds = painterInfo.drawings_array;

  // 유저가 그린 그림url 배열(지금 그림의 url은 제외해야함)
  // const {
  //   data: drawingUrls,
  //   isLoading: drawingUrlsIsLoading,
  //   isError: drawingUrlsIsError,
  // } = useQuery({
  //   queryKey: ["drawingUrls"],
  //   queryFn: () => getDrawingUrls(drawingIds),
  // });

  // if (painterInfoIsLoading || drawingUrlsIsLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (
  //   painterInfoIsError ||
  //   !Array.isArray(painterInfoArray) ||
  //   drawingUrlsIsError
  // ) {
  //   return <div>Error</div>;
  // }

  // console.log("drawingUrls", drawingUrls);

  // 날짜 형식 변환
  const inputDate = post.created_at;
  const parsedDate = new Date(inputDate);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return (
    <>
      {/* 우측 박스 Wrapper */}
      <div className="w-[260px] h-[370px] flex flex-col justify-between bg-PurplePale p-4 rounded-md">
        {/* 프로필 이미지, 닉네임, 별 */}
        <div className=" flex gap-4 items-center">
          <img
            className="w-10 object-cover"
            src={painterInfo.profile_img}
            alt=""
          />
          <p className="text-md font-semibold">{painterInfo.nickname}</p>
          <p>⭐️</p>
        </div>
        {/* 날짜, 제목, 설명, 댓글, 좋아요 */}
        <div className="flex flex-col my-4 gap-2">
          <p className="mb-3 text-sm">날짜 : {formattedDate}</p>
          <p className="text-md font-semibold">제목 : {post.title}</p>
          <p className="text-sm">설명 : {post.description}</p>
          <p className="text-sm mt-7">
            댓글 <span className="text-sm text-rose-600 mr-2">3</span>
            좋아요 <span className="text-sm text-rose-600">20</span>
          </p>
        </div>
        {/* 유저가 그린 그림 3 */}
        {/* <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">🏆 유저가 그린 그림 Top 3</p>
          <div className="w-60 h-16  flex flex-wrap gap-2 items-center">
            <div className="w-[70px] h-full bg-white"></div>
            <div className="w-[70px] h-full bg-white"></div>
            <div className="w-[70px] h-full bg-white"></div>
            <div className="w-[70px] h-full bg-white"></div>
            <div className="w-[70px] h-full bg-white"></div>
          </div>
        </div> */}
        <DrawingsByPainter drawingIds={drawingIds} />
      </div>
    </>
  );
};

export default Painter;
