import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news77.herokuapp.com/api",
});

export const getArticles = async ({ topic, sort_by, order }) => {
  const { data } = await newsApi.get("/articles", {
    params: { topic, sort_by, order, limit: "100" },
  });
  return data.articles;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);
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

// auth routes

export const getCurrentUser = async () => {
  const { data } = await newsApi.post(`auth/current-user`);
  return data;
};

export const login = async (email, password) => {
  const { data } = await newsApi.post(`auth/login`, { email, password });
  return data;
};
