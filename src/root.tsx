import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import "@/index.css";
import App from "@/App.tsx";
import { store } from "./redux/store";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App />
      <Toaster />
    </ReduxProvider>
  </StrictMode>,
);
