import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewArticle.css";
import { getArticleById, upvoteArticleById } from "../../utils/api";
import CommentSection from "./CommentSection";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useAuth } from "../../contexts/User";

const Article = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  const [article, setArticle] = useState({});
  const [upvoted, setUpVoted] = useState(false);
  const { article_id } = useParams();

  const [postedOn, setPostedOn] = useState();

  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setErr(false);
        setPostedOn(new Date(article.created_at));
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [article_id]);

  const handleUpvote = () => {
    setErr(null);
    if (!currentUser) return setErr("You must be logged in to post a comment.");
    setUpVoted(true);
    // A bit of optimistic rendering
    setArticle({ ...article, votes: ++article.votes });

    upvoteArticleById(article_id).then((updatedArticle) => {
      setArticle({ ...article, votes: updatedArticle.votes });
    });
  };

  if (isLoading) return <LoadingScreen height={"85vh"} />;
  if (!article)
    return <p>This article does not exist, please check the URL.</p>;
  return (
    <div className="article">
      <article className="article-content">
        <h1>{article.title}</h1>
        <p>{article.body}</p>

        <button onClick={handleUpvote} disabled={upvoted}>
          Upvote
        </button>
        <p>Number of Upvotes: {article.votes}</p>

        {err && <p className="err">{err}</p>}

        <p className="author-creds">
          Written By: {article.author} in {article.topic}
        </p>
        <div>
          Posted on: {postedOn.getDate()}/{postedOn.getMonth()}/
          {postedOn.getFullYear()}
        </div>
        <section className="comment-count">
          Comment Count: {article.comment_count}
        </section>
      </article>

      <CommentSection article={article}></CommentSection>
    </div>
  );
};
export default Article;
