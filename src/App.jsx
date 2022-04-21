import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Article from "./components/ViewArticle/ViewArticle";
import Articles from "./components/AllArticles/AllArticles";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />}></Route>{" "}
        <Route path="/articles/:article_id" element={<Article />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
      </Routes>
    </div>
  );
}

export default App;
