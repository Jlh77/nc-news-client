import "./ArticleCard.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <article className="card">
      <Link to={`/articles/${article.article_id}`}>
        <div className="card-head">
          <h4>{article.title}</h4>
        </div>
        <div className="card-body">
          <p>{`${article.body.substring(0, 180)}...`}</p>
        </div>
      </Link>
      <div className="card__footer">
        <div className="user">
          <div className="user__info">
            <h5>By {article.author}</h5>
            <div className={`tag tag-generic tag tag-${article.topic}`}>
              {article.topic}
            </div>
            <small>
              Posted: {new Date(article.created_at).getDate()}/
              {new Date(article.created_at).getMonth() + 1}/
              {new Date(article.created_at).getFullYear()}
            </small>
          </div>
        </div>
        <p className="votes">Votes: {article.votes}</p>
      </div>
    </article>
  );
};
export default ArticleCard;
