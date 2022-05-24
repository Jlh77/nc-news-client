import { Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/User";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Article from "./Components/ViewArticle/ViewArticle";
import Articles from "./Components/AllArticles/AllArticles";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Account from "./Components/Account/Account";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
          <Route path="/topics/:topic" element={<Articles />}></Route>

          {/* When authed */}
          {currentUser && (
            <>
              <Route path="/account" element={<Account />}></Route>
            </>
          )}
          {/* When not authed */}
          {!currentUser && (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
