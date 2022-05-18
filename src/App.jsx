import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/User";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Article from "./components/ViewArticle/ViewArticle";
import Articles from "./components/AllArticles/AllArticles";
import Login from "./components/Login/Login";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
          <Route path="/topics/:topic" element={<Articles />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Articles />}></Route>
          <Route path="/account" element={<Articles />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
