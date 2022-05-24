import axios from "axios";
axios.defaults.withCredentials = true;

const newsApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://nc-news77.herokuapp.com/api/"
      : "http://localhost:9099/api/",
});

export const getArticles = async ({ topic, sort_by, order }) => {
  const { data } = await newsApi.get("articles", {
    params: { topic, sort_by, order, limit: "100" },
  });
  return data.articles;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`articles/${article_id}`);
  return data.article;
};

export const upvoteArticleById = async (article_id) => {
  const { data } = await newsApi.patch(`articles/${article_id}`, {
    inc_votes: 1,
  });
  return data.updatedArticle;
};

export const getCommentsByArticleId = async (article_id) => {
  const { data } = await newsApi.get(`articles/${article_id}/comments`);
  return data.comments;
};

export const postCommentOnArticleById = async (
  article_id,
  { username, newComment }
) => {
  const { data } = await newsApi.post(`articles/${article_id}/comments`, {
    username,
    body: newComment,
  });
  return data.postedComment;
};

export const deleteCommentById = async (comment_id) => {
  const { data } = await newsApi.delete(`comments/${comment_id}`);
  return data;
};
