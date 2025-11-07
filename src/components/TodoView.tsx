import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Todo from "@/modules/todo";
import TodoList from "@/components/TodoList.tsx";

export default function TodoView() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: Todo.all,
  });

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
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
