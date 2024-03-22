export interface Posts {
  painter_email: string | null;
  drawing_url: string;
  title: string;
  description: string;
  created_at: string;
  likes: number;
  chooseTheme: string;
  drawing_id?: number;
}

// export type Newpost = Omit<Posts, "drawing_id">;

export interface PostProps {
  post: Posts;
  id: number;
}

export interface PainterInfo {
  bookmarks_array: string[];
  drawing_array: number[];
  email: string | null;
  id: number;
  nickname: string | null;
  point: number;
  profile_img: string | null;
}
