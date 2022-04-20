import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news77.herokuapp.com/api",
});

export const getArticles = ({ topic }) => {
  return newsApi.get("/articles", { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};
