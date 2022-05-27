import { useState } from "react";
import { postCommentOnArticleById } from "../../utils/api";
import { useAuth } from "../../contexts/User";
import "./NewComment.css";

const NewComment = ({ comments, setComments, article_id }) => {
  const { currentUser } = useAuth();
  const username = currentUser?.username;
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return setErr("You must be logged in to post a comment.");
    setErr(null);
    postCommentOnArticleById(article_id, { username, newComment })
      .then((postedComment) => {
        setNewComment("");
        setComments((currComments) => {
          return [
            {
              author: username,
              body: newComment,
              comment_id: postedComment.comment_id,
            },
            ...currComments,
          ];
        });
      })
      .catch((err) => {
        setErr(
          "Something went wrong and we were unable to send your comment, please try again."
        );
        setComments((currComments) => {
          let realComments = [...currComments];
          realComments.pop();
          return realComments;
        });
      });
  };

  return (
    <section className="addNewComment">
      <h3>Add a new comment</h3>

      {err && <p className="err">{err}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="new-comment"></label>
        <textarea
          maxLength={500}
          id="new-comment"
          name="new-comment"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          required
        />
        <div className="submit-wrapper">
          <button>Add comment</button>
        </div>
      </form>
    </section>
  );
};
export default NewComment;
