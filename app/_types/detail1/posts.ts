export interface Posts {
  id: number;
  user_nickname: string;
  drawing_id: number;
  drawing_url: string;
  title: string;
  description: string;
  created_at: string;
}

export interface PostProps {
  post: Posts;
}
