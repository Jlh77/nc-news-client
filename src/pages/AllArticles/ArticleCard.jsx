import "./ArticleCard.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <article className="card">
      <div className="card-head">
        <h4>{article.title}</h4>
      </div>
      <div className="card-body">
        <p>{`${article.body.substring(0, 160)}...`}</p>
      </div>
      <Link to={`/articles/${article.article_id}`}>
        <button className="read-more">Read More</button>
      </Link>
      <div className="card__footer">
        <div className="user">
          <div className="user__info">
            <h5 className="user__author">By {article.author}</h5>
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
        <div className="votes">
          <p>Votes: {article.votes}</p>
        </div>
        <div className="comment-count">
          <p>Number of Comments: {article.comment_count}</p>
        </div>
      </div>
    </article>
  );
};
export default ArticleCard;
