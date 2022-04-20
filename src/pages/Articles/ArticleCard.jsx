import "./ArticleCard.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  console.log(article);
  return (
    <Link to={`/articles/${article.article_id}`}>
      <article className="card">
        <div className="card-body">
          <span class="tag tag-blue">{article.topic}</span>
          <h4>{article.title}</h4>
          <p>{`${article.body.substring(0, 50)}...`}</p>
        </div>
        <div class="card__footer">
          <div class="user">
            <div class="user__info">
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
    </Link>
  );
};
export default ArticleCard;
