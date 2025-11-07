import { Loader2, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import type { Task } from "@/types.ts";
import Todo from "@/modules/todo";
import { cn } from "@/lib/utils.ts";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type TodoItemProps = {
  task: Task;
};

export default function TodoItem({ task }: TodoItemProps) {
  const deleteTodo = useMutation({
    mutationFn: Todo.delete,
    meta: { action: "DELETE", invalidateKeys: ["todos"] },
  });

  const checkTodo = useMutation({
    mutationFn: Todo.check,
    meta: { action: "UPDATE", invalidateKeys: ["todos"] },
  });

  return (
    <div
      className={cn(
        "bg-muted/50 flex w-full items-center gap-3 rounded-md p-3",
        checkTodo.isPending && "animate-pulse",
      )}
    >
      <Checkbox
        defaultChecked={task.isCompleted}
        onCheckedChange={(value) =>
          checkTodo.mutate({ id: task.id, isCompleted: value as boolean })
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

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo.mutate(task.id)}
      >
        {deleteTodo.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash className="stroke-destructive" />
        )}
      </Button>
    </div>
  );
}
