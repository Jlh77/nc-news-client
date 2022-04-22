import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../utils/api";
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
  }, []);

  if (isLoading) return <p>Loading Comments...</p>;
  return (
    <>
      <NewComment comments={comments} />
      <section className="comment-section">
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <h1>{comment.author}</h1> {comment.body}
            </div>
          );
        })}
      </section>
    </>
  );
};
export default CommentSection;
