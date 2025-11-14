import { Loader2 } from "lucide-react";

import TodoList from "@/components/TodoList.tsx";
import { useGetTodosQuery } from "@/redux/todosApiSlice";

export default function TodoView() {
  const { isLoading, isError, data } = useGetTodosQuery();

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError || !data) {
    return <p className="text-destructive text-center">Failed to load task.</p>;
  }

  return (
    <>
      <TodoList
        title="Pending"
        tasks={data}
        callback={(task) => !task.isCompleted}
      />

      <TodoList
        title="Completed"
        tasks={data}
        callback={(task) => task.isCompleted}
      />
    </>
  );
}
