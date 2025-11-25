import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

// 🔥 IMPORTANTE: importe o Provider e o store
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Envolvemos o App com o Provider para habilitar o Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
