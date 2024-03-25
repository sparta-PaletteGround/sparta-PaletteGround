# <img src="public/image/logo-line.png" width="300">

정해진 주제로 그림을 그리고 공유하는 커뮤니티 사이트

<br>

### 🔽 **프로젝트 소개**

**프로젝트명** : 팔레트 그라운드(Palette Ground)

**개발 기간** : 2024.03.18 ~ 2024.03.25(5일간)

**프로젝트 소개** : 매주 새롭게 달라지는 주제로 그림을 그리고 공유하며 소통을 하는 커뮤니티 웹사이트입니다.

**배포 주소** : [https://sparta-palette-ground.vercel.app/](https://sparta-palette-ground.vercel.app/)

**시연 영상** : [https://www.youtube.com/watch?v=TIUmCLkQHmE](https://www.youtube.com/watch?v=TIUmCLkQHmE)

<br>

### 🔽 **팀원 소개**

|                                                             한은범                                                              |                                                              곽인해                                                              |                                                             김현진                                                              |                                                        박지영                                                         |
| :-----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <p align="center"><img src="https://avatars.githubusercontent.com/u/147644376?v=4" style="width:100%; border-radius: 50%"/></p> | <p align="center"><img src="https://avatars.githubusercontent.com/u/148458439?v=4" style="width:120%; border-radius: 50%" /></p> | <p align="center"><img src="https://avatars.githubusercontent.com/u/154870548?v=4" style="width:90%; border-radius: 50%" /></p> | <p align="center"><img src="https://avatars.githubusercontent.com/u/153061626?v=4" style=" border-radius: 50%" /></p> |
|                                              [@CodHan](https://github.com/CodHan)                                               |                                              [@innes-k](https://github.com/innes-k)                                              |                                            [@hyun0zin](https://github.com/hyun0zin)                                             |                                   [@redberry0217](https://github.com/redberry0217)                                    |
|                                                              리더                                                               |                                                               팀원                                                               |                                                              팀원                                                               |                                                         팀원                                                          |
|                                마이페이지, 유저프로필 변경, 내가 쓴 글, 좋아요 누른 글 불러오기                                 |                                          상세 페이지, 댓글 CRUD, 좋아요 기능, supabase                                           |                                로그인, 회원가입 모달 기능, Authentication, 상세 페이지2(리스트)                                 |                                    메인 페이지, 그림 그리기 페이지, 갤러리 페이지                                     |

<br>

### 🔽 **개발 환경**

- **Environment :** vscode, github
- **Development :** Next.js, Typescript
- **Database :** Supabase Firestore, Supabase Storage
- **Library :** react-icons, zustand, excalidraw, react-slick, @tanstack/react-query
- **Design :** Figma
- **Login :** Supabase Authentication
- **Deployment :** Vercel

<br>

### 🔽 **기술스택 선정 이유**

- **Supabase :** 기존에 사용하던 noSQL방식인 firebase와는 다른 SQL방식의 데이터베이스
- **Zustand :** 현업에서 많이 사용, 기존에 배웠던 RTK과 유사한 형식의 전역상태관리
- **Excalidraw :** 다른 에디터 라이브러리에 비해 공식문서가 잘 되어있고, 제공하는 기능이 많음
- **React slick :** 간편하게 캐러셀 기능을 구현할 수 있고, 기본적인 설정하는 부분과 캐러셀을 구성하는 코드가 비교적 간단

<br>

### **🔽 시작 가이드**

**1. git clone**

```bash
$ git clone https://github.com/sparta-PaletteGround/sparta-PaletteGround.git
```

**2. Firebase 환경변수 설정**

![.env](/public/image/env.png)

**3. yarn start**

```bash
yarn start
```

<br>

### **🔽 와이어프레임**

|                          **메인 페이지**                          |                         **로그인/회원가입 모달**                         |
| :---------------------------------------------------------------: | :----------------------------------------------------------------------: |
|     ![메인페이지](/public/image/wireframe/마이페이지.PNG.png)     | ![로그인/회원가입 모달](/public/image/wireframe/로그인,회원가입.PNG.png) |
|                         **디테일 페이지**                         |                            **리스트 페이지**                             |
|  ![디테일 페이지](/public/image/wireframe/디테일페이지1.PNG.png)  |     ![리스트 페이지](/public/image/wireframe/디테일페이지2.PNG.png)      |
|                      **그림 그리기 페이지**                       |                              **마이페이지**                              |
| ![그림 그리기 페이지](/public/image/wireframe/그림그리기.PNG.png) |        ![마이페이지](/public/image/wireframe/마이페이지.PNG.png)         |

<br>

## 🔽 화면 구성 및 기능

## 1. 메인 페이지

### 1.1 로그인 / 회원가입 모달창

|                                                      |                                                        |
| ---------------------------------------------------- | ------------------------------------------------------ |
| <div style="text-align:center">**로그인 모달**</div> | <div style="text-align:center">**회원가입 모달**</div> |
| ![image](/public/image/pages/login.png)              | ![image](/public/image/pages/singup.png)               |

- 로그인
  - 헤더의 로그인을 눌러 로그인을 할 수 있습니다.
  - 로그인을 누르면 모달창이 뜨고, 이메일과 비밀번호를 입력하고 로그인합니다.
  - 아직 로그인 하지 않은 경우, ‘회원가입’을 눌러 회원가입을 할 수 있습니다.
- 회원가입
  - 이메일과 닉네임, 비밀번호를 입력하고 회원가입합니다.
  - 입력한 회원의 정보는 supabase에 저장됩니다.
  - 이미 회원가입하였다면 ‘로그인하기’를 눌러 로그인을 진행합니다.
- 로그인이 되지 않았을 때는 ‘그림그리기’와 ‘마이페이지’ 접근이 제한됩니다.
- 또한 ‘좋아요’와 ‘댓글’ 기능을 사용할 수 없습니다.
- 로그인 했을 시에는 로그아웃 버튼을 눌러 로그아웃할 수 있습니다.

### 1.2 메인 페이지

| <div style="text-align:center">**메인 페이지**</div> |
| ---------------------------------------------------- |
| ![image](/public/image/pages/mainpage.png)           |

- 캐러셀

  - 좋아요를 많이 받은 게시글 정보를 ISR로 받아와서 5개 출력합니다.
  - 5초에 한번씩 캐러셀이 슬라이딩합니다.
  - 마지막 그림 다음에는 첫번째 그림 순서로 돌아갑니다.

- 이번주 주제

  - '자세히 보기' 버튼 클릭 시 이번주 주제 게시글 카테고리가 선택된 detail-list 페이지로 이동합니다.

- 최신 드로잉

  - 사이트에 등록되는 게시글이 실시간으로 출력됩니다.
  - 그림 클릭 시 해당 그림의 detail페이지로 이동합니다.

- 명예의 전당

  - 사이트에 게시글을 제일 많이 올린 3명의 유저를 출력합니다.
  - 유저의 프로필이미지나 닉네임 클릭 시 해당 유저의 gallery페이지로 이동합니다.

<br>

## 2. 그림그리기 페이지

| <div style="text-align:center">**그림 그리기 페이지**</div> |
| ----------------------------------------------------------- |
| ![image](/public/image/pages/paint-editor-page.png)         |

- 로그인이 필요한 기능
  - 인증되지 않은 유저가 메뉴 클릭 시 로그인 모달창을 띄웁니다.
  - 인증되지 않은 유저가 페이지 주소로 접근 시 알림을 띄우고 home으로 보냅니다.
- excalidraw 툴로 그림을 그릴 수 있습니다.
- 그림을 그린 뒤 그림에 관한 제목과 내용을 작성합니다.
- 이번주 주제에 맞는 그림인지 자유 주제인지 선택합니다.
- 게시글 등록 완료 후 바로 해당 게시글의 detail페이지로 이동합니다.

<br>

## 3. 상세페이지

| <div style="text-align:center">**상세 페이지**</div> |
| ---------------------------------------------------- |
| ![image](/public/image/pages/detail-page.png)        |

### 3-1. 댓글 CRUD

1. 댓글 등록

   - 로그인 상태인 경우

     - textarea에 댓글을 입력하여 ‘등록하기’버튼으로 댓글을 등록합니다.

   - 로그아웃 상태인 경우
     - textarea가 readonly로 바뀌어 댓글 작성이 불가합니다.
     - ‘등록하기’를 누르면 로그인 모달창이 열립니다.
     - 닉네임 부분이 ‘guest’로 고정됩니다.

2. 댓글 리스트 조회

   - 댓글 리스트가 작성일 기준 최신순으로 정렬됩니다.

3. 댓글 수정

   - 현재 로그인한 유저가 작성한 댓글인 경우에만 ‘수정’버튼이 표시됩니다.
   - 수정 내용의 유효성을 검사합니다.
     - 수정된 내용이 없는 경우 : ‘수정사항이 없습니다.’ alert이 생성됩니다.
     - 수정된 내용이 있는 경우 : ‘수정하시겠습니까?’ confirm창이 생성됩니다.
   - ‘취소’를 클릭하면 기존에 작성되어있던 댓글 내용으로 돌아갑니다.

4. 댓글 삭제 - ‘삭제’ 클릭시 ‘삭제하시겠습니까?’ confirm창이 생성되고, 확인 시 해당 댓글이 삭제됩니다.
   <br>

### 3-2. painter 정보 및 그림의 상세 정보 조회

- painter 정보 조회

  - 그림을 그린 painter의 프로필 이미지, 닉네임, painter가 그린 다른 그림들이 표시됩니다.

- 그림의 상세 정보 조회
  - 그림을 그린 날짜, 제목, 그림 설명이 표시됩니다.

### 3-3. 좋아요 기능

- 좋아요 하트 클릭시 좋아요수가 1 증가합니다.
- 좋아요 취소시 좋아요수가 1 감소합니다.
- 좋아요한 그림들은 마이페이지에서 모아보기가 가능합니다.

<br>

## 4. 디테일 리스트페이지 - 그림 리스트 보여주기

|                                                           |                                                        |
| --------------------------------------------------------- | ------------------------------------------------------ |
| <div style="text-align:center">**이번주 주제**</div>      | <div style="text-align:center">**그림 모아보기**</div> |
| ![image](/public/image/pages/detail-list-page-weekly.png) | ![image](/public/image/pages/detail-list-page.png)     |

### 4-1 이번주 주제

- 상단 배너에서 ‘이번주 주제’를 확인 할 수 있습니다.
- 그림 등록시 ‘이번주 주제’에 해당하는 그림을 확인 할 수 있습니다.

### 4-2 그림 모아보기

- 등록한 그림을 모두 확인 할 수 있습니다.
- 그림을 클릭하면, 상세페이지로 이동합니다.

<br>

## 5. 갤러리 페이지

| <div style="text-align:center">**갤러리 페이지**</div> |
| ------------------------------------------------------ |
| ![image](/public/image/pages/gallery-page.png)         |

- 특정 유저의 모든 게시글을 모아 놓은 갤러리입니다.
- 특정 유저의 프로필과 간단한 활동 정보(올린 게시글/댓글 수)를 확인할 수 있습니다.
- 갤러리에서 그림을 클릭하면 해당 그림의 상세페이지로 이동합니다.

<br>

## 6. 마이페이지

| <div style="text-align:center">**마이 페이지**</div> |
| ---------------------------------------------------- |
| ![image](/public/image/pages/mypage.jpg)             |

### 6-1. 유저 프로필 변경

- 유저정보 db조회

  - useQuery를 사용하여 로그인 된 유저의 정보를 supabase에서 불러옵니다.

- 프로필 수정

  - 프로필변경 클릭 시 프로필을 변경 할 수 있는 모달창이 열립니다.
  - 이미지를 클릭 하여 프로필 이미지에 들어갈 파일을 선택 할 수 있습니다.

- 예외처리
  - 닉네임만 변경, 이미지만 변경이 가능 합니다.

### 6-2. 내가 쓴 목록, 좋아요 한 목록

- 버튼을 이용하여 버튼 클릭 시 각각의 버튼에 맞는 데이터를 카드 형식으로 보여줍니다.
- 카드 클릭시 해당 상세페이지로 이동하게 됩니다.

<br>

## 7. 회고📝

**7-1. 기술적 어려움**

1. supabase

   - supabase를 처음 사용하다보니 table및 storage 사용에서부터 어려움을 겪었다.
   - 권한 설정과 관련된 이슈들을 많이 접했다.
   - 로그인/회원가입 기능 구현 시, supabase에 등록된 정보를 가져와 로그인 상태 유지를 하는 부분에서 어려움을 겪었다.
   - 그림 게시글 등록 시 그림을 스토리지에 업로드 할 때 권한 위반 오류가 계속 떠서 해결하는 데 어려움이 있었다.

2. 좋아요 기능

   - 생각보다 로직이 많이 복잡해 난항을 겪었다.

3. 프로필 이미지 변경

   - supabase를 사용하며 이미지를 url화 하는 과정에서 어려움을 겪었다.
   - 이미지를 핸들링 해야 한다면 storage를 거쳐야 한다는 걸 깨달았다.

4. 그림 게시글 등록 기능
   - 그림을 그렸을 때 라이브러리에서 제공하는 자체 저장하기 기능 말고 외부에 직접 만들어 둔 '등록' 버튼을 데이터베이스로 보내는 것을 구현하는 것이 쉽지 않았다.
   - 외부 등록 버튼을 클릭하면 excalidraw 툴에 그린 그림 정보를 받아와서 blob 형식으로 storage에 업로드하고, 다시 그림 url을 가져와서 제목, 내용, 주제와 함께 posts 테이블에 insert했다.

<br>

**7-2. 기술 이외의 어려움**

1. 초기 세팅

   - 초기 데이터베이스 설계를 제대로 해놓지 않았다.
   - supabase table이 서로 연결되는 부분들에서 이해가 어려웠다.
   - 폴더구조를 처음부터 구체적으로 짜놓지 않아 통일성이 부족해졌다.

2. 소통의 부재
   - 타입 지정을 하는 부분이나 api호출을 하는 로직이 반복적으로 작성된 부분이 있었다. 팀원간의 소통을 통해 불필요한 중복되는 api 호출 등이 일어났다.

**7-3. 배운점**

1. 프로젝트 시작시 데이터베이스 설계에 더 신경을 많이 써야 한다는 것을 알았다.
2. 전역 데이터의 관리

- 컴포넌트를 분리 하다 보니 처음엔 전역으로 관리를 안해도 될 것 같아도
  전역으로 상태관리를 한다면 훨씬 더 깔끔한 상태관리가 가능할 것 같다는 생각이 들었다.

3. 쿼리Key에 관한 통일성

- 쿼리를 사용하다 보니 각 데이터를 쿼리Key로 불러오고 invalidate를 사용하는 부분이 있을텐데 다른 페이지에서도 같은 데이터를 invalidate를 해야하다 보니 다른 페이지의 로직을 보거나 소통으로 key를 알아내야 했다.
  초기 세팅 단계 또는 협업에 있어 쿼리Key를 따로 다같이 관리했으면 좋을 것 같다.

4. 디버깅

- 디버깅을 할 때 데이터를 불러오는 과정에서 의심이 간다면 불러오는 데이터가 불러와 지는지 console로 찍어보고 컴포넌트 자체를 주석처리 하면서 점점 에러 scope를 줄여야 한다는 걸 깨달았다.

5. 그림그리기 기능을 위해 excalidraw 라이브러리를, 그리고 캐러셀 기능을 위해 react-slick을 사용하게 됐는데, 라이브러리를 사용한다고 해서 다 쉽게 구현할 수 있는 건 아니라는 것을 깨달았다.
6. 브랜치 관리, PR 과정, 머지 방식 등 github 협업 전반에 대한 이해도가 이전보다 높아졌다.
7. supabase를 활용하여 CRUD를 해보고 firebase와는 어떤 차이점이 있는지 생각해 보는 기회가 되었다.
8. 한 컴포넌트에 여러 개의 useQuery들을 작성하게 되면 이들이 비동기로 작동하기에 문제가 생길 수도 있음을 알게 되었다.

<br>

### 🚦트러블 슈팅

<details>
<summary style="font-weight: bold;">1. supabase table RLS policy 권한 오류</summary>
  <div markdown="1">

- 문제 : supabase table에는 값이 있는데, 데이터를 불러오니 계속 빈 배열만 찍힘

![](https://velog.velcdn.com/images/innes_kwak/post/2b34f1b6-6f11-4bc3-9754-5facf6613405/image.png)

- 원인 : 각 table마다 RLS policy 권한 설정을 해줘야 data를 가져올 수 있음

  - 아래처럼 `Add RLS policy`에 커서를 올리면 바로 안내 문구가 뜨는데, 현재 설정된 policy가 없으며 `empty array` 즉 빈 배열을 return할거라고 이미 말해주고 있다.

  ![](https://velog.velcdn.com/images/innes_kwak/post/9bad46b9-8260-42ca-8b4d-8c26b24be54e/image.png)

- 해결 : RLS policy Get started quickly를 이용하여 권한 생성
  ![](https://velog.velcdn.com/images/innes_kwak/post/94d77c3d-50a2-484f-9203-fcd0af4b0cda/image.png)

</div>
</details>

<details>
  <summary style="font-weight: bold;">2.Query를 사용하여 데이터를 불러올 때 QueryFn의 매개변수가 최초에 null이라서 전달이 제대로 안되는 문제</summary>
  <div markdown="1">

- 문제 : Query를 사용하여 데이터를 불러올 때 QueryFn의 매개변수가 최초에 null이라서 전달이 제대로 안되는 문제.

- 고민 : QueryFn이 비동기로 실행되면 해결 할 수 있지 않을까 고민

- 해결 : Query의 enabled 옵션을 사용해 해결 매개변수가 falsy한 값이면 isPending하다가 truthy하게 되면 실행.

  </div>
</details>
