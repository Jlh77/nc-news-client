import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/User";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <UserProvider>
      <App></App>
    </UserProvider>
  </BrowserRouter>
);
