import { useEffect, useState } from "react";
import { getCommentsByArticleId, deleteCommentById } from "../../utils/api";
import "./CommentSection.css";
import NewComment from "./NewComment";

const CommentSection = ({ article }) => {
  const [comments, setCommments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticleId(article.article_id).then((comments) => {
      setCommments(comments);
      setIsLoading(false);
    });
  }, [article.article_id]);

  const deleteComment = async (e, comment_id) => {
    await deleteCommentById(comment_id);
    setCommments((currComments) => {
      const newList = currComments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      return newList;
    });
  };

  if (isLoading) return <p>Loading Comments...</p>;
  return (
    <>
      <NewComment
        comments={comments}
        setComments={setCommments}
        article_id={article.article_id}
      />
      <section className="comment-section">
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <h4>{comment.author}</h4> {comment.body}
              <button
                onClick={(e) => {
                  deleteComment(e, comment.comment_id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};
export default CommentSection;
