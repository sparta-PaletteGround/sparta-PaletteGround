import type { Comment } from "@/app/_types/detail1/comments";

import CommentItem from "./Comments-Item";

interface OwnProps {
  commentsList: Comment[] | undefined;
}

const CommentsList = ({ commentsList }: OwnProps) => {
  return (
    <>
      <div className="mb-6">
        {commentsList?.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
};

export default CommentsList;
