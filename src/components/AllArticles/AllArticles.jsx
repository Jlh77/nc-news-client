import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import "./AllArticles.css";

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
        setIsLoading(false);
        setErr(true);
      });
  }, [topic]);

  if (isLoading)
    return (
      <main>
        <h1>{topic ? topic : `All`} Articles</h1>
        <p>Loading...</p>
      </main>
    );
  if (err) return <p>Oops! Something went wrong, please try again.</p>;
  if (!articles.length)
    return (
      <p>
        Hmm, this topic doesn't seem to exist or there are no articles for it...
      </p>
    );
  return (
    <main>
      <h1>{topic ? topic : `All`} Articles</h1>
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
};
export default Articles;
