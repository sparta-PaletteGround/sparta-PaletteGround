// import { writeFile, mkdir } from "fs/promises";
// import { NextRequest, NextResponse } from "next/server";
// import { dirname } from "path";

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.formData();
//     const file: File | null = data.get("file") as unknown as File;

//     if (!file) {
//       return NextResponse.json({ success: false });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const path = `./files/${Date.now() + file.name}`;

//     // 파일이 저장될 폴더 생성 (이미 존재하는 경우 무시됨)
//     const directory = dirname(path);
//     await mkdir(directory, { recursive: true });

//     await writeFile(path, buffer);
//     console.log(`open ${path} to see the uploaded file`);
//     return NextResponse.json({ path });
//   } catch (error) {
//     return new NextResponse(
//       `파일업로드 중 시스템 오류가 발생하였습니다. 관리자에게 문의하세요.\n\n${error}`,
//       {
//         status: 500,
//       }
//     );
//   }
// }
