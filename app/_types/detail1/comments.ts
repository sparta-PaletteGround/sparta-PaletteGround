export interface InsertingComment {
  email: string | null;
  nickname: string | null;
  comment: string;
  id: number;
}

export interface Comment {
  id: number;
  created_at: string;
  comment: string;
  drawing_id: number;
  user_email: string;
  user_nickname: string;
}
