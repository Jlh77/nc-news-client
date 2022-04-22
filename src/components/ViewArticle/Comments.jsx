import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../utils/api";

const Comments = ({ article }) => {
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
    <section className="comments-section">
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="comment">
            <h4>{comment.author}</h4> {comment.body}
          </div>
        );
      })}
    </section>
  );
};
export default Comments;
