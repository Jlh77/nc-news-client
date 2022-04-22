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
  }, [article.article_id]);

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
          console.log(comment);
          return (
            <div key={comment.comment_id}>
              <h4>{comment.author}</h4> {comment.body}
            </div>
          );
        })}
      </section>
    </>
  );
};
export default CommentSection;
