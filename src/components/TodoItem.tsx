import useSWRMutation from "swr/mutation";
import { Loader2, Trash } from "lucide-react";

import type { Task } from "@/types.ts";
import Todo from "@/modules/todo";
import { cn } from "@/lib/utils.ts";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";

type TodoItemProps = {
  task: Task;
};

export default function TodoItem({ task }: TodoItemProps) {
  const deleteTodo = useSWRMutation("/todos", Todo.delete, {
    onSuccess: () => {
      toast.success("Todo deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete todo.");
    },
  });

  const checkTodo = useSWRMutation("/todos", Todo.check, {
    onSuccess: () => {
      toast.success("Todo updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update todo.");
    },
  });

  return (
    <div
      className={cn(
        "bg-muted/50 flex w-full items-center gap-3 rounded-md p-3",
        checkTodo.isMutating && "animate-pulse",
      )}
    >
      <Checkbox
        defaultChecked={task.isCompleted}
        onCheckedChange={(value) =>
          checkTodo.trigger({ id: task.id, isCompleted: value as boolean })
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
        onClick={() => deleteTodo.trigger({ id: task.id })}
      >
        {deleteTodo.isMutating ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash className="stroke-destructive" />
        )}
      </Button>
    </div>
  );
}
