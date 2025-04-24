import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Routes from "./routes/index.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthContextProvider>
  </>
);
