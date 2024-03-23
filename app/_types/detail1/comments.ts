export interface InsertingComment {
  email: string | null;
  nickname: string | null;
  comment: string;
  drawingId: number;
}

export interface Comment {
  id: number;
  created_at: string;
  comment: string;
  drawing_id: number;
  user_email: string;
  user_nickname: string;
}

export interface UpdateCommentType {
  email: string | null;
  id: number;
  nextComment: string;
}

export type DeleteCommentType = Omit<UpdateCommentType, "nextComment">;

export type CommentOfPainter = Pick<Comment, "comment">;
