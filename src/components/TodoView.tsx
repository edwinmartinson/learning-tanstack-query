import useSWR from "swr";
import { Loader2 } from "lucide-react";

import Todo from "@/modules/todo";
import TodoList from "@/components/TodoList.tsx";

export default function TodoView() {
  const { isLoading, error, data } = useSWR("/todos", Todo.all);

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (error || !data) {
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
