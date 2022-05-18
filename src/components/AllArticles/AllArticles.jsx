import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import "./AllArticles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sort_by, setSort_by] = useState("created_at");
  const [order, setOrder] = useState("ASC");
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((curr) => curr + 1);
    console.log("hmm" + count);
    setSearchParams({ topic, sort_by, order });
    setIsLoading(true);
    setErr(false);
    getArticles({ topic, sort_by, order })
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setErr(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(true);
      });
  }, [topic, sort_by, order]);

  const handlesort_byChange = (e) => {
    setSort_by(e.target.value);
  };
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const topJsx = (
    <div className="all-articles-top">
      <h1>{topic ? topic : `All`} Articles</h1>
      <p>Sort By:</p>
      <select
        name="sort-by"
        id="sort-by"
        value={sort_by}
        onChange={handlesort_byChange}
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
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
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
