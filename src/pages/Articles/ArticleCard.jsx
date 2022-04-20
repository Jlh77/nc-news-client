import "./ArticleCard.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <li className="article-card">
        <h2 className="title">{article.title}</h2>
        <p className="author">Author: {article.author}</p>
        <p className="comment_count">Comments: {article.comment_count}</p>
        <p className="topic">Topic: {article.topic}</p>
      </li>
    </Link>
  );
};
export default ArticleCard;
