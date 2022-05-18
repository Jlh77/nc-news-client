import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { postCommentOnArticleById } from "../../utils/api";
import "./NewComment.css";

const NewComment = ({ comments, setComments, article_id }) => {
  const username = useContext(UserContext).user.username;
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState(null);
  const [tempNewCommentId, settempNewCommentId] = useState(0);

  const handleSubmit = (e) => {
    settempNewCommentId((currId) => currId + 1);
    setErr(null);
    e.preventDefault();
    setComments((currComments) => {
      return [
        {
          author: username,
          body: newComment,
          comment_id: `new${tempNewCommentId}`,
        },
        ...currComments,
      ];
    });
    postCommentOnArticleById(article_id, { username, newComment })
      .then((postedComment) => {
        setNewComment("");
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
      <p>{err}</p>
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
        />
        <div className="submit-wrapper">
          <button>Add comment</button>
        </div>
      </form>
    </section>
  );
};
export default NewComment;
