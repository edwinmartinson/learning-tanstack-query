import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Empty from "./Empty";
import Todo from "@/modules/todo";
import TodoItem from "./TodoItem";

export default function TodoCompleted() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["todos", "completed"],
    queryFn: Todo.all,
    select: (data) => data.filter((todo) => todo.isCompleted),
  });

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return <p className="text-destructive text-center">Failed to load task.</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Completed</p>
        <div className="bg-muted/50 grid size-8 place-content-center rounded-full">
          <p className="text-sm">{data.length}</p>
        </div>
      </div>

      {data.length > 0 ? (
        data.map((task) => <TodoItem key={task.id} task={task} />)
      ) : (
        <Empty>
          <p className="text-muted-foreground">No task completed.</p>
        </Empty>
      )}
    </section>
  );
}
