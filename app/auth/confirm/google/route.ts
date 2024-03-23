import { useUserInfoStore } from "@/app/_store/authStore";
import { parse } from "path";
import { ParsedUrlQuery } from "querystring";

export async function GET(req: Request) {
  /* 해결 안 되고 있는 로직... */

  // GoogleLogin 컴포넌트에서 구글 로그인에 성공 했을 때, redirectTo를 통해 route.ts 파일이 열린다.
  // 그때 access_token과 refresh_token 등 구글 로그인을 진행한 로그인 정보를 가지고 이동함.
  // https://localhost:3000/auth/confirm/google#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6InhzRmRTekQ0YUt5VlB6T2QiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExMDk5MTY5LCJpYXQiOjE3MTEwOTU1NjksImlzcyI6Imh0dHBzOi8vcG1kdXFnaXZhb2x3eWRxc3NyZW4uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImZlZDk4Yjc0LWUzZTAtNDI4YS05MmZkLTY5ODBjOWJhZTBmZCIsImVtYWlsIjoia291amllMTFAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnb29nbGUiLCJwcm92aWRlcnMiOlsiZ29vZ2xlIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLRmdRYTFQMVdNMzktejJKdnZuS2YxYUZ0MkxpZTh0YWQ5UElwaEluNWM9czk2LWMiLCJlbWFpbCI6ImtvdWppZTExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiLquYDtmITsp4QiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoi6rmA7ZiE7KeEIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS0ZnUWExUDFXTTM5LXoySnZ2bktmMWFGdDJMaWU4dGFkOVBJcGhJbjVjPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMTE4MzkzNTU2OTEyOTk5NTgyOTMiLCJzdWIiOiIxMTE4MzkzNTU2OTEyOTk5NTgyOTMifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTcxMTA5NTU2OX1dLCJzZXNzaW9uX2lkIjoiODAxYzlhNzgtNzIzMy00NDI2LTliNjQtYWUxNzY3NWI2NmVmIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.ZY8Y4TrB5xFUqWW2IMpS_G5SPwl0Br0qT2tt4cbGmsc&expires_at=1711099169&expires_in=3600&provider_refresh_token=1%2F%2F0erYEFiS02KYRCgYIARAAGA4SNwF-L9Irpsb4s1S27s8a2kUAmFkCqLifugBYCzltLa9O0efrU5TXcmCF2SkHLGAdMq5N5MDwiHc&provider_token=ya29.a0Ad52N3-LBsXuY7BgrENZnVMahslP32StC8PVM496RzBGYUHGIQUhy0K16MT6CngexkxR6mLmBQ8F3xbN1jytChIKKAN-uAa0WcksuHNZaQLGfyLQsGgkGNPy-as3kaBlILURq5pVUVdyS3iXZsb5w7ol2oeGL42Lb8VYaCgYKAdASARISFQHGX2MiuYHHMXlNIKQu-u1z0fL-xQ0171&refresh_token=FxsQYY-CKNjNqCCL48M_Ww&token_type=bearer

  // 1. url 뒤에 붙어서 딸려오는 개별 access_token 추출한다.

  // 2. accsee_token으로 사용자 정보 조회 가능
  // const { data: { user } } = await supabase.auth.getUser(jwt)
  // jwt 자리에 추출한 access token을 넣으면 user 정보 확인 가능

  // 3. email을 확인하여 위 로직 실행한다...

  // console.log("GET /api/test"); // 터미널 콘솔 확인용...
  // console.log(req.url);

  // 현재 url 확인하기
  // 요청 URL을 파싱하여 URL 객체로 변환
  const parsedUrl = new URL(req.url || "");
  console.log("parsedUrl", parsedUrl);

  // 쿼리 문자열을 가져옴
  const queryParams = parsedUrl.searchParams;
  console.log("queryParams", queryParams);

  // access_token 파라미터의 존재 여부 확인
  const accessToken = queryParams.get("access_token");
  const paramCheck = !!accessToken;
  console.log(paramCheck); // access_token이 존재하면 true, 아니면 false

  // access_token 파라미터의 존재 여부 확인
  // const accessToken = queryParams.access_token;
  // console.log(accessToken);

  // 현재 url을 확인하고 params를 가져오는 로직?
  // const urlParams = new URLSearchParams(req.url); // 요청의 URL에서 파라미터를 추출합니다.
  // console.log("urlParams", urlParams);
  // const accessToken = urlParams.get("access_token");

  // 가져온 토큰을 jwt 자리에 넣어서 유저 정보 확인
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser(accessToken);
  // console.log("data", data);

  // 현재 route.ts 파일이 열렸을 때 보이는 데이터
  return Response.json({ hi: "hi" });
}

// supabase에서 등록된 user 정보가 있는지 확인하고, 없다면 최초 로그인 시 user 정보 등록하기
// => 등록만 완료되면 일반 로그인처럼 users Table의 회원정보 불러다 쓸 수 있음.

// // 이미 supabase에 등록한 로그인 정보 확인
// const { data: existingUser, error: userError } = await supabase
//   .from("users")
//   .select("email")
//   .eq("email", email)
//   .single();
// console.log("existingUser", existingUser);

// if (userError) {
//   console.error("구글 로그인 사용자 정보 조회 중 에러", userError);
//   alert("로그인 중 오류가 발생했습니다.");
//   return;
// }

// // 등록된 유저가 아닌 경우, 새로운 정보 저장
// if (!existingUser) {
//   // 구글 로그인한 유저 정보가 supabase에 없으면, 유저 정보 추가
//   const { error: insertError } = await supabase.from("users").insert([
//     {
//       email: email,
//       nickname: googleName,
//       profile_img: googleProfileImg,
//     },
//     // { onConflict: "email", ignoreDuplicates: true },
//   ]);
//   if (insertError) {
//     console.error("구글 로그인 정보 저장에 실패했습니다.", insertError);
//     alert("구글 로그인에 실패했습니다.");
//     return;
//   }
// }
