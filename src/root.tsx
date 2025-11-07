import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "@/index.css";
import App from "@/App.tsx";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import type { MyQueryMeta } from "./types";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (!mutation.meta) return;

      const meta = mutation.meta as MyQueryMeta;

      if (meta.action === "CREATE") {
        toast.success("Task created successfully.");
      }

      if (meta.action === "UPDATE") {
        toast.success("Task updated successfully.");
      }

      if (meta.action === "DELETE") {
        toast.success("Task deleted successfully.");
      }
    },
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateKeys) {
        queryClient.invalidateQueries({
          queryKey: mutation.meta.invalidateKeys as string[],
        });
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
