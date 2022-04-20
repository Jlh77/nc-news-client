import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Article from "./pages/Article/Article";
import Articles from "./pages/Articles/Articles";

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
