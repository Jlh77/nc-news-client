import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<p>Hi</p>}></Route>
      </Routes>
    </div>
  );
}

export default App;
