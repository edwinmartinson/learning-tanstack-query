import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";

import "@/index.css";
import App from "@/App.tsx";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig>
      <App />
      <Toaster />
    </SWRConfig>
  </StrictMode>,
);
