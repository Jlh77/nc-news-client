import "./ArticleCard.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <article className="card">
      <Link to={`/articles/${article.article_id}`}>
        <div className="card-body">
          <span className={`tag tag-generic tag tag-${article.topic}`}>
            {article.topic}
          </span>
          <h4>{article.title}</h4>
          <p>{`${article.body.substring(0, 50)}...`}</p>
        </div>
      </Link>
      <div className="card__footer">
        <div className="user">
          <div className="user__info">
            <h5>{article.author}</h5>
            <small>
              Posted: {new Date(article.created_at).getDate()}/
              {new Date(article.created_at).getMonth()}/
              {new Date(article.created_at).getFullYear()}
            </small>
          </div>
        </div>
      </div>
      <p className="comment_count">Comments: {article.comment_count}</p>
    </article>
  );
};
export default ArticleCard;
