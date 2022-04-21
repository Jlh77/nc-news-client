import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news77.herokuapp.com/api",
});

export const getArticles = ({ topic }) => {
  return newsApi.get("/articles", { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const upvoteArticleById = (article_id) => {
  return newsApi
    .patch(`articles/${article_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data.updatedArticle;
    });
};
