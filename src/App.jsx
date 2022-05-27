import { Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/User";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Article from "./pages/ViewArticle/ViewArticle";
import Articles from "./pages/AllArticles/AllArticles";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

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
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>

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
