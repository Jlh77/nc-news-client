import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<p>Hi</p>}></Route>
      </Routes>
    </div>
  );
}

export default App;
