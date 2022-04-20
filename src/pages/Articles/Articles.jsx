import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import "./Articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setErr(false);
    getArticles({ topic })
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
      });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>Oops! Something went wrong, please try again.</p>;
  if (!articles.length)
    return (
      <p>
        Hmm, this topic doesn't seem to exist or there are no articles for it...
      </p>
    );
  return (
    <main>
      <h1>Articles</h1>
      <ul className="articles">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </main>
  );
};
export default Articles;
