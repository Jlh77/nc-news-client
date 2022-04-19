import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news77.herokuapp.com/api",
});

export const getArticles = () => {
  return newsApi.get("/aritcles").then(({ data }) => {
    return data.articles;
  });
};
