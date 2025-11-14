import { Loader2, Trash } from "lucide-react";

import type { Task } from "@/types.ts";

import { cn } from "@/lib/utils.ts";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  useCheckTodoMutation,
  useDeleteTodoMutation,
} from "@/redux/todosApiSlice";

type TodoItemProps = {
  task: Task;
};

export default function TodoItem({ task }: TodoItemProps) {
  const [deleteTodo, deleteTodoObj] = useDeleteTodoMutation();
  const [checkTodo, checkTodoObj] = useCheckTodoMutation();

  return (
    <div
      className={cn(
        "bg-muted/50 flex w-full items-center gap-3 rounded-md p-3",
        checkTodoObj.isLoading && "animate-pulse",
      )}
    >
      <Checkbox
        defaultChecked={task.isCompleted}
        onCheckedChange={(value) =>
          checkTodo({ id: task.id, isCompleted: value as boolean })
        }
      />

      <p
        className={cn(
          "w-full truncate",
          task.isCompleted && "text-muted-foreground line-through",
        )}
      >
        {task.description}
      </p>

      <Button variant="ghost" size="icon" onClick={() => deleteTodo(task.id)}>
        {deleteTodoObj.isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash className="stroke-destructive" />
        )}
      </Button>
    </div>
  );
}
