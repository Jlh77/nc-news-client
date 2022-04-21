import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewArticle.css";
import { getArticleById } from "../../utils/api";

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

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>This article does not exist, please check the URL.</p>;
  return (
    <article className="article">
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <p>
        Written By: {article.author} in {article.topic}
      </p>
      <section className="comments">
        Comment Count: {article.comment_count} Votes: {article.votes}
      </section>
      <div>
        Posted on: {postedOn.getDate()}/{postedOn.getMonth()}/
        {postedOn.getFullYear()}
      </div>
    </article>
  );
};
export default Article;
