import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewArticle.css";
import { getArticleById, upvoteArticleById } from "../../utils/api";
import CommentSection from "./CommentSection";

const Article = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  const [postedOn, setPostedOn] = useState();

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
        setErr(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleUpvote = () => {
    // A bit of optimistic rendering
    setArticle({ ...article, votes: ++article.votes });
    upvoteArticleById(article_id).then((updatedArticle) => {
      setArticle({ ...article, votes: updatedArticle.votes });
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>This article does not exist, please check the URL.</p>;
  return (
    <>
      <article className="article">
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <p>
          Written By: {article.author} in {article.topic}
        </p>
        <section className="comments">
          Comment Count: {article.comment_count} Votes: {article.votes}{" "}
          <button onClick={handleUpvote}>Upvote</button>
        </section>
        <div>
          Posted on: {postedOn.getDate()}/{postedOn.getMonth()}/
          {postedOn.getFullYear()}
        </div>
      </article>

      <CommentSection article={article}></CommentSection>
    </>
  );
};
export default Article;
