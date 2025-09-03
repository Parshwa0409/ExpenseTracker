import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalStatusContextProvider } from "./components/context/GlobalStatusContext.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStatusContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalStatusContextProvider>
  </StrictMode>
);
