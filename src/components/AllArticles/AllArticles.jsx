import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import "./AllArticles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("ASC");
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setErr(false);
    getArticles({ topic, sortBy, order })
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setErr(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(true);
      });
  }, [topic, sortBy, order]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const topJsx = (
    <div>
      <h1>{topic ? topic : `All`} Articles</h1>
      <select
        name="sort-by"
        id="sort-by"
        value={sortBy}
        onChange={handleSortByChange}
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Number of comments</option>
        <option value="votes">Votes</option>
      </select>
      <select
        name="order"
        id="order"
        value={order}
        onChange={handleOrderChange}
      >
        <option value="DESC">Ascending</option>
        <option value="ASC">Descending</option>
      </select>
    </div>
  );

  if (isLoading)
    return (
      <main>
        {topJsx}
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
      {topJsx}
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
};
export default Articles;
