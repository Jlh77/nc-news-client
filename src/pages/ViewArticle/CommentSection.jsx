import { useEffect, useState } from "react";
import { getCommentsByArticleId, deleteCommentById } from "../../utils/api";
import "./CommentSection.css";
import NewComment from "./NewComment";
import { useAuth } from "../../contexts/User";

const CommentSection = ({ article }) => {
  const [comments, setCommments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useAuth();

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
            <div key={comment.comment_id} className="comment">
              <img
                src={
                  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                }
                alt="default_avatar"
              />
              <h4>{comment.author}</h4>
              <p>{comment.body}</p>
              {currentUser?.username === comment.author ? (
                <button
                  onClick={(e) => {
                    deleteComment(e, comment.comment_id);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          );
        })}
      </section>
    </>
  );
};
export default CommentSection;
