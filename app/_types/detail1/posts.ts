export interface Posts {
  painter_email: string;
  drawing_url: string;
  title: string;
  description: string;
  created_at: string;
  likes: number;
  chooseTheme: string;
}

export interface PostProps {
  post: Posts;
  id: number;
}

export interface PainterInfo {
  bookmarks_array: string[];
  drawing_array: number[];
  email: string;
  id: number;
  nickname: string;
  point: number;
  profile_img: string;
}
