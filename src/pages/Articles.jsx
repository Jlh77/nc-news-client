import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import "./Articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        console.log(articles);
        setArticles(articles);
        setIsLoading(false);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>Oops! Something went wrong, please try again.</p>;
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
