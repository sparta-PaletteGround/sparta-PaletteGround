export interface Posts {
  id: number;
  painter_email: string;
  drawing_id: number;
  drawing_url: string;
  title: string;
  description: string;
  created_at: string;
  likes: number;
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
