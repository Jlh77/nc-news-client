import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news77.herokuapp.com/api",
});

export const getArticles = async ({ topic }) => {
  const { data } = await newsApi.get("/articles", { params: { topic } });
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
